import mtgApi from '@/api/mtgApi'
import useNotify from '@/composables/useNotify'
import useSearchQuery, { ApiCard } from '@/queries/useSearchQuery'
import { useMutation } from '@tanstack/vue-query'

type CollectionCard = {
  name: string
  inCollection: number
}

function useCardActionsQuery() {
  const { updateSearch } = useSearchQuery()
  const { notifySuccess } = useNotify()

  async function postAddCard(name: string) {
    const response = await mtgApi.post<CollectionCard>('/card', { name })
    notifySuccess(`${name} was added to your collection`)
    return response.data
  }

  async function postRemoveCard(name: string) {
    const response = await mtgApi.delete<CollectionCard>(`/card?name=${name}`)
    notifySuccess(`${name} was removed from your collection`)
    return response.data
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
