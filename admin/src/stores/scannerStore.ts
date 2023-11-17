import { defineStore } from 'pinia'
import { ref } from 'vue'

const useScannerStore = defineStore('scanner', () => {
  const scannedTexts = ref<string[]>([])

  function addToScannedTexts(scannedText: string) {
    scannedTexts.value = [...new Set([...scannedTexts.value, scannedText])]
  }

  return { scannedTexts, addToScannedTexts }
})

export default useScannerStore
