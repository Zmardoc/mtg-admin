import { computed } from 'vue'
import queryKeys from './queryKeys'
import { useQuery } from '@tanstack/vue-query'
import { useSearchBarStore } from '@/stores/searchBarStore'
import { mtgGet } from '@/api/mtgApi'
import queryClient from '@/config/query'

type CardFace = {
  name: string
  imageUrl: string | null
  oracleText: string | null
}

type ApiCard = {
  id: string
  cardFaces: CardFace[]
  inCollection: number
}

function useSearchQuery() {
  const searchBarStore = useSearchBarStore()

  async function searchCards(cardTitle: string) {
    if (cardTitle === '') return []

    const response = await mtgGet<ApiCard[]>(`/cards/search?q=${cardTitle}`)
    return response ?? []
  }

  const cardSearch = computed({
    get: () => searchBarStore.searchText,
    set: (value) => searchBarStore.setSearchText(value),
  })

  const cardSearchQueryKey = queryKeys.search(cardSearch)

  const { data, isFetching } = useQuery(
    cardSearchQueryKey,
    () => searchCards(cardSearch.value),
    {
      retry: false,
    }
  )

  function updateSearch(
    updateFunction: (oldData: ApiCard[] | undefined) => ApiCard[] | undefined
  ) {
    queryClient.setQueryData(cardSearchQueryKey, updateFunction)
  }

  const cards = computed(() => data.value ?? [])

  return {
    cardSearch,
    cards,
    isFetching,
    updateSearch,
  }
}

export default useSearchQuery
export type { ApiCard, CardFace }
