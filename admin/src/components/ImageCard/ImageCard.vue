<template>
  <div class="image-card-scene">
    <card-menu
      @add="addCard(props.card.frontFace.name)"
      @remove="deleteCard(props.card.frontFace.name)"
      @flip="flipCard"
      :showFlip="hasDualFace"
      :inCollection="props.card.inCollection"
      class="image-card-scene__menu absolute"
    />
    <card-button
      v-if="hasDualFace"
      icon="auto_stories"
      class="image-card-scene__flip absolute"
      @click="flipCard"
    />
    <div
      class="full-width full-height"
      :class="{
        'image-card-container--not-in-collection':
          props.card.inCollection === 0,
      }"
    >
      <div
        class="image-card"
        :class="{
          'image-card--is-flipped': flipped,
        }"
      >
        <image-card-single
          :card-face="props.card.frontFace"
          :in-collection="props.card.inCollection"
          :prices="props.card.prices"
          class="image-card__face image-card__face--front"
        />
        <image-card-single
          v-if="props.card.backFace"
          :card-face="props.card.backFace"
          :in-collection="props.card.inCollection"
          :prices="props.card.prices"
          class="image-card__face image-card__face--back"
        />
      </div>
    </div>

    <div class="image-card-scene__hover" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import ImageCardSingle from './ImageCardSingle.vue'
import CardMenu from './CardMenu.vue'
import CardButton from './CardButton.vue'
import type { ApiCard } from '@/queries/useSearchQuery'
import useAddCardQuery from '@/queries/useAddCardQuery'
import useDeleteCardQuery from '@/queries/useDeleteCardQuery'

type Props = {
  card: ApiCard
}
const { mutate: addCard } = useAddCardQuery()
const { mutate: deleteCard } = useDeleteCardQuery()

const props = defineProps<Props>()
const flipped = ref(false)
const hasDualFace = computed(() => !!props.card.backFace)

function flipCard() {
  if (props.card.backFace) {
    flipped.value = !flipped.value
  }
}
</script>

<style lang="scss" scoped>
.image-card-scene {
  perspective: 2000px;
  /*TODO better sizing */
  width: 245px;
  height: 341.391px;
  position: relative;

  &__menu {
    top: 20%;
    left: 75%;
    z-index: 1;
    opacity: 0;
  }

  &__flip {
    top: 45%;
    left: 65.5%;
    z-index: 1;
    opacity: 0;
  }

  &:hover {
    .image-card-scene__menu,
    .image-card-scene__flip {
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

.image-card-container--not-in-collection {
  opacity: 0.4;
}
</style>
