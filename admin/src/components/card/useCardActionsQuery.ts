import mtgApi from '@/api/mtgApi'
import useNotify from '@/composables/useNotify'
import useSearchQuery from '@/queries/useSearchQuery'
import { useMutation } from '@tanstack/vue-query'

type CollectionCard = {
  name: string
  inCollection: number
}

function useCardActionsQuery() {
  const { offlineUpdateSearch, searchData } = useSearchQuery()
  const { notifySuccess } = useNotify()

  async function postAddCard(name: string) {
    const response = await mtgApi.post<CollectionCard>('/card', { name })
    return response.data
  }

  async function postRemoveCard(name: string) {
    const response = await mtgApi.delete<CollectionCard>(`/card?name=${name}`)
    return response.data
  }

  async function postAddOrRemoveCard(name: string, add: boolean) {
    const collectionCard = add
      ? await postAddCard(name)
      : await postRemoveCard(name)

    if (collectionCard) {
      const updatedSearchData = searchData.value?.map((card) => {
        if (card.cardFaces[0].name === name) {
          return {
            ...card,
            inCollection: collectionCard.inCollection,
          }
        }
        return card
      })

      notifySuccess(
        `${name} was ${add ? 'added to' : 'removed from'} your collection`
      )
      updatedSearchData && offlineUpdateSearch(updatedSearchData)
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
