<template>
  <div class="image-card-scene">
    <card-menu
      @add="addToCollection(frontCard.name)"
      @remove="removeFromCollection(frontCard.name)"
      @flip="flipCard"
      :showFlip="hasDualFace"
      :inCollection="props.card.inCollection"
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

    <div class="image-card-scene__hover gt-xs"></div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import ImageCardSingle from './ImageCardSingle.vue'
import CardMenu from './CardMenu.vue'
import type { ApiCard } from '@/queries/useSearchQuery'
import useCardActionsQuery from './useCardActionsQuery'

type Props = {
  card: ApiCard
}
const { addToCollection, removeFromCollection } = useCardActionsQuery()

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
  position: relative;

  &__menu {
    position: absolute;
    top: 13%;
    left: 75%;
    z-index: 1;
    opacity: 0;
  }

  &:hover {
    .image-card-scene__menu {
      opacity: 1;
    }

    .image-card-scene__hover {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      box-shadow: inset 0 0 20px $primary;
      border-radius: 12px;
    }
  }
}

.image-card {
  width: 100%;
  height: 100%;
  transition: transform 0.5s; //, opacity 0.7s
  transform-style: preserve-3d;
  position: relative;

  &--is-flipped {
    transform: rotateY(180deg);
  }

  &--not-in-collection {
    opacity: 0.4;
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
