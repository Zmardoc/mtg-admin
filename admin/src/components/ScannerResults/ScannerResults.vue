<template>
  <div class="text-white">Karty: {{ scanned }}</div>
</template>

<script setup lang="ts">
import useScannerStore from '@/stores/scannerStore'
import { computed } from 'vue'

const scannerStore = useScannerStore()

const scanned = computed(() => {
  return scannerStore.scannedCards.map((card) => card.frontFace.name).join(', ')
})
</script>
