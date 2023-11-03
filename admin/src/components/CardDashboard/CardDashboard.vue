<template>
  <div class="flex flex-center full-width">
    <template v-if="!isFetching">
      <div
        v-if="cards.length"
        class="card-dashboard flex justify-center q-py-xs"
      >
        <image-card
          v-for="card in cards"
          :key="card.id"
          :card="card"
          class="q-ma-xs"
        />
      </div>
      <dashboard-text v-else-if="query" text="CAN'T FIND ANY CARD" />
    </template>
    <dashboard-text v-else text="LOADING..." />
  </div>
</template>

<script setup lang="ts">
import DashboardText from './DashboardText.vue'
import { useCardSearch } from '@/components/InputSearch'
import { computed } from 'vue'
import { ImageCard } from '../ImageCard'
import useSearchQuery from '@/queries/useSearchQuery'

const { query } = useCardSearch()
const { data, isFetching } = useSearchQuery()

const cards = computed(() => data.value ?? [])
</script>

<style scoped lang="scss">
$container-padding: 8px;

.card-dashboard {
  max-width: ($card-width + $container-padding) * 6;
}
</style>
