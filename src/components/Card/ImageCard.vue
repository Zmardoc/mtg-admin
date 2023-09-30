<template>
  <div class="image-card-scene">
    <card-menu
      @add="addToCollection(frontCard.name)"
      @remove="removeFromCollection(frontCard.name)"
      @flip="flipCard"
      :showFlip="hasDualFace"
      class="image-card-scene__menu absolute"
    />
    <div
      class="image-card"
      :class="{
        'image-card--is-flipped': flipped,
        'image-card--not-in-collection': props.card.inCollection === 0,
      }"
    >
      <image-card-single
        :name="frontCard.name"
        :src="frontCard.imageUrl ?? ''"
        :oracle-text="frontCard.oracleText ?? ''"
        class="image-card__face image-card__face--front"
      />
      <image-card-single
        v-if="hasDualFace"
        :name="backCard.name"
        :src="backCard.imageUrl ?? ''"
        :oracle-text="backCard.oracleText ?? ''"
        class="image-card__face image-card__face--back"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import ImageCardSingle from './ImageCardSingle.vue'
import useCardActions from '@/composables/useCardActions'
import CardMenu from './CardMenu.vue'
import type { ApiCard } from '@/queries/useSearchQuery'

type Props = {
  card: ApiCard
}
const { addToCollection, removeFromCollection } = useCardActions()

const props = defineProps<Props>()
const flipped = ref(false)
const hasDualFace = computed(() => props.card.cardFaces.length === 2)

function flipCard() {
  if (hasDualFace.value) {
    flipped.value = !flipped.value
  }
}

const frontCard = computed(() => props.card.cardFaces[0])
const backCard = computed(() => props.card.cardFaces[1])
</script>

<style lang="scss" scoped>
.image-card-scene {
  perspective: 2000px;
  /*TODO better sizing */
  width: 245px;
  height: 341.391px;

  &__menu {
    position: absolute;
    top: 13%;
    left: 75%;
    z-index: 1;
    opacity: 0;
    transition: opacity 0.2s;
  }

  &:hover {
    .image-card-scene__menu {
      opacity: 1;
    }
  }
}

.image-card {
  width: 100%;
  height: 100%;
  transition: transform 0.5s;
  transform-style: preserve-3d;
  position: relative;

  &--not-in-collection {
    opacity: 0.4;
    transition: opacity 0.2s;
  }

  &:hover {
    opacity: 1;
  }

  &--is-flipped {
    transform: rotateY(180deg);
  }

  &__face {
    width: 100%;
    height: 100%;
    position: absolute;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;

    &--back {
      transform: rotateY(180deg);
    }
  }
}
</style>
