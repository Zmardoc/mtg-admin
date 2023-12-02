<template>
  <div class="flex flex-center full-width">
    <template v-if="!isFetching">
      <card-list v-if="cards.length" :cards="cards" class="card-dashboard" />
      <dashboard-text v-else-if="query" text="CAN'T FIND ANY CARD" />
    </template>
    <dashboard-text v-else text="LOADING..." />
  </div>
</template>

<script setup lang="ts">
import DashboardText from './DashboardText.vue'
import { useCardSearch } from '@/components/InputSearch'
import { computed } from 'vue'
import useSearchQuery from '@/queries/useSearchQuery'
import CardList from '../CardList/CardList.vue'

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
