import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ApiCard } from '@/queries/useSearchQuery'

const useScannerStore = defineStore('scanner', () => {
  const scannedCards = ref<ApiCard[]>([])

  function addToScannedTexts(scannedText: ApiCard) {
    scannedCards.value = [...new Set([...scannedCards.value, scannedText])]
  }

  return { scannedCards, addToScannedTexts }
})

export default useScannerStore
