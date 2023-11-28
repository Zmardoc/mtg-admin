import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ApiCard } from '@/queries/useSearchQuery'

const useScannerStore = defineStore('scanner', () => {
  const scannedCards = ref<ApiCard[]>([])

  function addToScannedCards(scannedCard: ApiCard) {
    scannedCards.value = [...new Set([...scannedCards.value, scannedCard])]
  }

  return { scannedCards, addToScannedCards }
})

export default useScannerStore
