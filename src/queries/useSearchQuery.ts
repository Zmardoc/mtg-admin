import { computed } from 'vue'
import queryKeys from './queryKeys'
import { useQuery } from '@tanstack/vue-query'
import { useSearchBarStore } from '@/stores/searchBarStore'
import mtgApi from '@/api/mtgApi'

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

    //TODO osetrit 400,500
    const response = await mtgApi.get<ApiCard[]>(`/cards/search?q=${cardTitle}`)

    return response.data ?? []
  }

  const cardSearch = computed({
    get: () => searchBarStore.searchText,
    set: (value) => searchBarStore.setSearchText(value),
  })

  const { data, isFetching } = useQuery(
    queryKeys.search(cardSearch),
    () => searchCards(cardSearch.value),
    {
      retry: false,
    }
  )

  const cards = computed(() => data.value ?? [])

  return {
    cardSearch,
    cards,
    isFetching,
  }
}

export default useSearchQuery
export type { ApiCard }
