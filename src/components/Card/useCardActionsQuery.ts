import mtgApi from '@/api/mtgApi'
import useSearchQuery from '@/queries/useSearchQuery'
import { useMutation } from '@tanstack/vue-query'

function useCardActionsQuery() {
  const { offlineUpdateSearch, searchData } = useSearchQuery()

  async function postAddCard(name: string) {
    const response = await mtgApi.post<boolean>('/card/insert', { name })
    return response.data
  }

  async function postRemoveCard(name: string) {
    const response = await mtgApi.delete<boolean>(`/card?name=${name}`)
    return response.data
  }

  async function postAddOrRemoveCard(name: string, add: boolean) {
    let response: boolean // TODO zmenit na number

    if (add) {
      response = await postAddCard(name)
    } else {
      response = await postRemoveCard(name)
    }

    if (response) {
      const updatedSearchData = searchData.value?.map((card) => {
        if (card.cardFaces[0].name === name) {
          return {
            ...card,
            inCollection: add ? card.inCollection + 1 : card.inCollection - 1, // TODO brat z response
          }
        }
        return card
      })
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
