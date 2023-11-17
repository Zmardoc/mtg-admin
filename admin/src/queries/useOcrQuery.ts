import { mtgGet } from '@/api/mtgApi'
import ocrPost from '@/api/ocrApi'
import { useMutation } from '@tanstack/vue-query'
import type { ApiCard } from '@/queries/useSearchQuery'

async function postScannedCard(imageBase64: string) {
  const scannedText = await ocrPost('parse/image', imageBase64)
  //TODO better endpoint, posilat rovnou na mtg api obrazek a vracet bud kartu nebo null
  const apiCards = await mtgGet<ApiCard[]>(`/card/search?q=${scannedText}`)
  if (apiCards?.length) {
    return apiCards[0]
  }
  return null
}

function useOcrQuery() {
  return useMutation({
    mutationFn: postScannedCard,
  })
}

export default useOcrQuery
