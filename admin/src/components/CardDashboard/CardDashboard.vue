<template>
  <div class="full-width">
    <template v-if="!isFetching">
      <div v-if="cards.length" class="card-dashboard q-py-xs row">
        <div v-for="card in cards" :key="card.id" class="col-3">
          <image-card :card="card" class="q-ma-xs" />
        </div>
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
  // max-width: ($card-width + $container-padding) * 6;
}
</style>
