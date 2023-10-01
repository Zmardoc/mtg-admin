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
      <dashboard-text v-else text="TYPE FOR A CARD" />
    </template>
    <dashboard-text v-else text="LOADING..." />
  </div>
</template>

<script setup lang="ts">
import useSearchQuery from '@/queries/useSearchQuery'
import ImageCard from '@/components/card/ImageCard.vue'
import DashboardText from '@/components/DashboardText.vue'

const { cards, isFetching, cardSearch } = useSearchQuery()
</script>

<style scoped lang="scss">
$container-padding: 8px;

.card-dashboard {
  max-width: ($card-width + $container-padding) * 6;
}
</style>
