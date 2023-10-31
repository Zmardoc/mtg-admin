<template>
  <div class="card-price text-center mtg-font-bold text-subtitle">
    {{ priceLabel }}
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import formatCzk from '@/utils/priceFormat'
import type { CardPrices } from '@/queries/useSearchQuery'

type Props = {
  prices: CardPrices
}

const props = defineProps<Props>()

const EXCHANGE_RATE = 24.5

const priceLabel = computed(() => {
  if (props.prices.eur) {
    const czkNumber = parseFloat(props.prices.eur) * EXCHANGE_RATE
    return formatCzk(czkNumber)
  }
  return 'N/A'
})
</script>

<style scoped lang="scss">
.card-price {
  bottom: 0;
  left: 0;
  right: 0;
  padding: 8px;
}
</style>
