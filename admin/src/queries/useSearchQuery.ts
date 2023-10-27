import { computed } from 'vue'
import queryKeys from './queryKeys'
import { useQuery } from '@tanstack/vue-query'
import { mtgGet } from '@/api/mtgApi'
import queryClient from '@/config/query'
import { useRoute, useRouter } from 'vue-router'

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
// TODO rozdelit query a composable
function useSearchQuery() {
  const router = useRouter()
  const route = useRoute()

  async function searchCards(cardTitle: string) {
    if (!cardTitle) return []

    const response = await mtgGet<ApiCard[]>(`/cards/search?q=${cardTitle}`)
    return response ?? []
  }

  const cardSearch = computed({
    get: () => {
      return (route.params.cardSearch as string | undefined) ?? ''
    },
    set: (value) => {
      router.push({ name: 'index', params: { cardSearch: value } })
    },
  })

  const cardSearchQueryKey = queryKeys.search(cardSearch)

  const { data, isFetching } = useQuery(
    cardSearchQueryKey,
    () => searchCards(cardSearch.value),
    {
      retry: false,
    }
  )

  // Update on data change basically
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
