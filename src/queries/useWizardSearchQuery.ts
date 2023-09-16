import { computed, ref } from 'vue'
import { cardQueryKeys } from './cardQueryKeys'
import { useQuery } from '@tanstack/vue-query'

function useWizardSearchQuery() {
  const cardSearch = ref('')

  function searchCards(cardTitle: string) {
    if (cardTitle === '') return Promise.resolve({ cardTitle: 'prazdny' })
    console.log(cardTitle)
    return Promise.resolve({ cardTitle })
  }

  const { data, isFetching } = useQuery(
    cardQueryKeys.searchWizards(cardSearch),
    () => searchCards(cardSearch.value),
    {
      keepPreviousData: true,
    }
  )

  const wizardCards = computed(() => data.value ?? [])

  return {
    cardSearch,
    wizardCards,
    isFetching,
  }
}

export default useWizardSearchQuery
