<template>
  <card-list :cards="scannerStore.scannedCards" />
</template>

<script setup lang="ts">
import useScannerStore from '@/stores/scannerStore'
import CardList from '../CardList/CardList.vue'

const scannerStore = useScannerStore()
</script>
