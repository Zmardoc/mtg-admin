import { mtgPost } from '@/api/mtgApi'
import { useMutation } from '@tanstack/vue-query'
import type { ApiCard } from '@/queries/useSearchQuery'

function postScannedCard(imageBase64: string) {
  return mtgPost<ApiCard | null>('/api/ocr/scan', { imageBase64 })
}

function useOcrQuery() {
  return useMutation({
    mutationFn: postScannedCard,
  })
}

export default useOcrQuery
