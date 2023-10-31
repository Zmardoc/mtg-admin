import queryKeys from './queryKeys'
import { useQuery } from '@tanstack/vue-query'
import { mtgGet } from '@/api/mtgApi'
import { useCardSearch } from '@/components/InputSearch'

type CardFace = {
  name: string
  imageUrl: string | null
  oracleText: string | null
}

type CardPrices = {
  usd: string
  usd_foil: string | null
  usd_etched: string | null
  eur: string
  eur_foil: string | null
  tix: string | null
}

type ApiCard = {
  id: string
  frontFace: CardFace
  backFace: CardFace | null
  inCollection: number
  prices: CardPrices
}

async function searchCards(cardTitle: string) {
  if (!cardTitle) return []

  return (await mtgGet<ApiCard[]>(`/card/search?q=${cardTitle}`)) ?? []
}

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
export type { ApiCard, CardFace, CardPrices }
