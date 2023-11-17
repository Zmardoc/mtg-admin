import ocrPost from '@/api/ocrApi'
import { useMutation } from '@tanstack/vue-query'

function postScannedCard(imageBase64: string) {
  return ocrPost('parse/image', imageBase64)
}

function useOcrQuery() {
  return useMutation({
    mutationFn: postScannedCard,
  })
}

export default useOcrQuery
