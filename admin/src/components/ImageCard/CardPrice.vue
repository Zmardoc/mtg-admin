<template>
  <div class="card-price text-center mtg-font-bold text-subtitle">
    {{ eur }}
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import formatEur from '@/utils/priceFormat'
import type { CardPrices } from '@/queries/useSearchQuery'

type Props = {
  prices: CardPrices
}

const props = defineProps<Props>()
const eur = computed(() => {
  if (props.prices.eur) {
    return formatEur(parseFloat(props.prices.eur))
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
