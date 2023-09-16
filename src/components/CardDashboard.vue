<template>
  <div class="flex pa-2">
    <template v-if="!isFetching">
      <ImageCard
        v-for="card in cardsWithImage"
        :key="card.id"
        :src="card.imageUrl"
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
import { uniqWith } from 'lodash'
import useWizardSearchQuery from 'src/queries/useWizardSearchQuery'
import ImageCard from 'src/components/general/ImageCard.vue'

const { wizardCards, isFetching, cardSearch } = useWizardSearchQuery()

//The image url for a card. Only exists if the card has a multiverse id.
const cardsWithImage = computed(() => {
  const withImages = wizardCards.value.filter((card) => card.multiverseid)
  return uniqWith(withImages, (arrVal, othVal) => arrVal.name === othVal.name)
})
</script>
