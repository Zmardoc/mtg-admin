import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ApiCard } from '@/queries/useSearchQuery'
import { CollectionCard } from '@/components/InputSearch'

const useScannerStore = defineStore('scanner', () => {
  const scannedCards = ref<ApiCard[]>([])

  function addToScannedCards(scannedCard: ApiCard) {
    if (!scannedCards.value.find((card) => card.id === scannedCard.id)) {
      scannedCards.value = [...new Set([...scannedCards.value, scannedCard])]
    }
  }

  function updateScannedCards(scannedCard: CollectionCard) {
    scannedCards.value = scannedCards.value.map<ApiCard>((card) => {
      return {
        ...card,
        inCollection:
          card.frontFace.name === scannedCard.name
            ? scannedCard.inCollection
            : card.inCollection,
      }
    })
  }

  return { scannedCards, addToScannedCards, updateScannedCards }
})

export default useScannerStore
