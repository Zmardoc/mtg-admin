import queryKeys from './queryKeys'
import { useQuery } from '@tanstack/vue-query'
import { mtgGet } from '@/api/mtgApi'
import { useCardSearch } from '@/components/InputSearch'

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

async function searchCards(cardTitle: string) {
  if (!cardTitle) return []

  return (await mtgGet<ApiCard[]>(`/card/search?q=${cardTitle}`)) ?? []
}
// TODO rozdelit query a composable
function useSearchQuery() {
  const { cardSearch } = useCardSearch()

  return useQuery(
    queryKeys.search(cardSearch),
    () => searchCards(cardSearch.value),
    {
      retry: false,
    }
  )
}

export default useSearchQuery
export type { ApiCard, CardFace }
