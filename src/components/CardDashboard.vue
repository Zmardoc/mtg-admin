<template>
  <div class="flex flex-center">
    <template v-if="!isFetching">
      <div class="card-dashboard flex q-py-xs">
        <ImageCard
          v-for="card in cardsWithImage"
          :key="card.id"
          :card="card"
          class="q-ma-xs"
        />
      </div>
      <template v-if="cardsWithImage.length === 0">
        <h1 v-if="cardSearch">CAN'T FIND ANY CARD</h1>
        <h1 v-else>TYPE FOR A CARD</h1>
      </template>
    </template>
    <h1 v-else>LOADING...</h1>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import useSearchQuery from '@/queries/useSearchQuery'
import ImageCard, { type Card } from '@/components/card/ImageCard.vue'

const { cards, isFetching, cardSearch } = useSearchQuery()

const cardsWithImage = computed(() => {
  return cards.value.map<Card>((card) => {
    const { id, name, image_uris, card_faces, oracle_text } = card
    return {
      id,
      name,
      image_uris,
      card_faces,
      oracle_text,
    }
  })
})
</script>

<style scoped lang="scss">
$container-padding: 8px;
.card-dashboard {
  max-width: ($card-width + $container-padding) * 6;
}
</style>
@/queries/useSearchQuery
