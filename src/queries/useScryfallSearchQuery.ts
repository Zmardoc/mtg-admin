import { computed } from 'vue'
import cardScryfallQueryKeys from './cardScryfallQueryKeys'
import { useQuery } from '@tanstack/vue-query'
import { useSearchBarStore } from '@/stores/searchBarStore'
import type { ScryfallCardSearchResponse } from './sryfallSearchTypes'
import sryfallApi from '@/api/sryfallApi'

function useScryfallSearchQuery() {
  const searchBarStore = useSearchBarStore()

  async function searchCards(cardTitle: string) {
    if (cardTitle === '') return []

    //TODO osetrit 400,500
    const response = await sryfallApi.get<ScryfallCardSearchResponse>(
      `/cards/search?q=${cardTitle}`
    )
    return response.data.data ?? []
  }

  const cardSearch = computed({
    get: () => searchBarStore.searchText,
    set: (value) => searchBarStore.setSearchText(value),
  })

  const { data, isFetching } = useQuery(
    cardScryfallQueryKeys.search(cardSearch),
    () => searchCards(cardSearch.value),
    {
      retry: false,
    }
  )

  const scryfallCards = computed(() => data.value ?? [])

  return {
    cardSearch,
    scryfallCards,
    isFetching,
  }
}

export default useScryfallSearchQuery
