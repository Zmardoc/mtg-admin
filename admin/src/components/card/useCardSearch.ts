import queryClient from '@/config/query'
import queryKeys from '@/queries/queryKeys'
import { ApiCard } from '@/queries/useSearchQuery'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

type UpdateFunction = (oldData: ApiCard[] | undefined) => ApiCard[] | undefined

function useCardSearch() {
  const router = useRouter()
  const route = useRoute()

  const cardSearch = computed({
    get: () => (route.params.cardSearch as string | undefined) ?? '',
    set: (value) => {
      router.push({ name: 'index', params: { cardSearch: value } })
    },
  })

  // Update on data change basically
  function updateSearch(updateFunction: UpdateFunction) {
    queryClient.setQueryData(queryKeys.search(cardSearch), updateFunction)
  }

  return {
    cardSearch,
    updateSearch,
  }
}

export default useCardSearch
