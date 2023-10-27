<template>
  <div class="flex flex-center full-width">
    <template v-if="!isFetching">
      <div
        v-if="cards.length"
        class="card-dashboard flex justify-center q-py-xs"
      >
        <ImageCard
          v-for="card in cards"
          :key="card.id"
          :card="card"
          class="q-ma-xs"
        />
      </div>
      <dashboard-text v-else-if="cardSearch" text="CAN'T FIND ANY CARD" />
      <input-search v-else input-class="text-left" class="input-search gt-xs" />
    </template>
    <dashboard-text v-else text="LOADING..." />
  </div>
</template>

<script setup lang="ts">
import useCardSearch from '@/components/card/useCardSearch'
import ImageCard from '@/components/card/ImageCard.vue'
import DashboardText from '@/components/DashboardText.vue'
import InputSearch from '@/components/InputSearch.vue'
import useSearchQuery from '@/queries/useSearchQuery'
import { computed } from 'vue'

const { cardSearch } = useCardSearch()
const { data, isFetching } = useSearchQuery()

const cards = computed(() => data.value ?? [])
</script>

<style scoped lang="scss">
$container-padding: 8px;

.card-dashboard {
  max-width: ($card-width + $container-padding) * 6;
}

.input-search {
  width: 400px;
}
</style>
