import { mtgDelete, mtgPost } from '@/api/mtgApi'
import useNotify from '@/composables/useNotify'
import { useMutation } from '@tanstack/vue-query'
import useCardSearch from './useCardSearch'
import type { ApiCard } from '@/queries/useSearchQuery'

type CollectionCard = {
  name: string
  inCollection: number
}

function useCardActionsQuery() {
  const { updateSearch } = useCardSearch()
  const { notifySuccess } = useNotify()

  async function postAddCard(name: string) {
    const response = await mtgPost<CollectionCard>('/card/upsert', { name })
    if (response) {
      notifySuccess(`${name} was added to your collection`)
    }

    return response
  }

  async function postRemoveCard(name: string) {
    const response = await mtgDelete<CollectionCard>(`/card?name=${name}`)
    notifySuccess(`${name} was removed from your collection`)
    return response
  }

  function getUpdatedSearch(newCard: CollectionCard, oldData?: ApiCard[]) {
    return oldData?.map((card) => {
      if (card.cardFaces[0].name === newCard.name) {
        return {
          ...card,
          inCollection: newCard.inCollection,
        }
      }
      return card
    })
  }

  async function postAddOrRemoveCard(name: string, add: boolean) {
    const collectionCard = add
      ? await postAddCard(name)
      : await postRemoveCard(name)

    if (collectionCard) {
      updateSearch((oldData?: ApiCard[]) =>
        getUpdatedSearch(collectionCard, oldData)
      )
    }
  }

  const { mutate } = useMutation({
    mutationFn: ({ name, add }: { name: string; add: boolean }) =>
      postAddOrRemoveCard(name, add),
  })

  function addToCollection(name: string) {
    mutate({ name, add: true })
  }

  function removeFromCollection(name: string) {
    mutate({ name, add: false })
  }

  return {
    addToCollection,
    removeFromCollection,
  }
}

export default useCardActionsQuery
