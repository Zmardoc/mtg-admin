import { computed } from 'vue'
import queryKeys from './queryKeys'
import { useQuery } from '@tanstack/vue-query'
import { useSearchBarStore } from '@/stores/searchBarStore'
import type { SryfallCard } from './searchTypes'
import mtgApi from '@/api/mtgApi'

function useSearchQuery() {
  const searchBarStore = useSearchBarStore()

  async function searchCards(cardTitle: string) {
    if (cardTitle === '') return []

    //TODO osetrit 400,500
    const response = await mtgApi.get<SryfallCard[]>(
      `/cards/search?q=${cardTitle}`
    )
    console.log(response.status)
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
