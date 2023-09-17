<template>
  <div class="flex q-pa-xs">
    <template v-if="!isFetching">
      <ImageCard
        v-for="card in cardsWithImage"
        :key="card.id"
        :src="card.src"
        :card-name="card.name"
      />
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
import useScryfallSearchQuery from 'src/queries/useScryfallSearchQuery'
import ImageCard from 'src/components/general/ImageCard.vue'

const { scryfallCards, isFetching, cardSearch } = useScryfallSearchQuery()

//The image url for a card. Only exists if the card has a multiverse id.
const cardsWithImage = computed(() => {
  return scryfallCards.value.map((card) => ({
    id: card.id,
    name: card.name,
    src: card.image_uris.normal,
  }))
})
</script>
