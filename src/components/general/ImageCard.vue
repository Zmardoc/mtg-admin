<template>
  <div class="image-card-scene">
    <div
      class="image-card"
      :class="{
        'image-card--is-flipped': flipped,
        'image-card--dual': hasDualFace,
      }"
    >
      <image-card-single
        :name="frontCard.name"
        :src="frontCard.src"
        :oracle-text="frontCard.oracleText"
        class="image-card__face image-card__face--front"
        @click="flipCard"
      />
      <image-card-single
        v-if="hasDualFace"
        :name="backCard.name"
        :src="backCard.src"
        :oracle-text="backCard.oracleText"
        class="image-card__face image-card__face--back"
        @click="flipCard"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { ImageUris, CardFace } from 'src/queries/sryfallSearchTypes'
import ImageCardSingle from './ImageCardSingle.vue'

export type Card = {
  id: string
  name: string
  image_uris?: ImageUris
  card_faces?: CardFace[]
  oracle_text: string
}

type Props = {
  card: Card
}

const props = defineProps<Props>()
const flipped = ref(false)
const hasDualFace = computed(() => {
  return props.card.card_faces?.length === 2 && !props.card.image_uris
})

function flipCard() {
  if (hasDualFace.value) {
    flipped.value = !flipped.value
  }
}

function getFaceOfDualCard(front = true) {
  const imageUriIndex = front ? 0 : 1

  return {
    name: props.card.card_faces?.[imageUriIndex].name ?? props.card.name,
    src: props.card.card_faces?.[imageUriIndex].image_uris?.normal ?? '',
    oracleText:
      props.card.card_faces?.[imageUriIndex].oracle_text ??
      props.card.oracle_text,
  }
}

const oracleText = computed(() => {
  return props.card.oracle_text ?? props.card.card_faces?.[0].oracle_text ?? ''
})

const frontCard = computed(() => {
  if (hasDualFace.value) {
    return getFaceOfDualCard()
  }
  return {
    name: props.card.name,
    src: props.card.image_uris?.normal ?? '',
    oracleText: oracleText.value,
  }
})

const backCard = computed(() => getFaceOfDualCard(false))
</script>

<style lang="scss" scoped>
.image-card-scene {
  perspective: 2000px;
  /*TODO better sizing */
  width: 245px;
  height: 341.391px;
}

.image-card {
  width: 100%;
  height: 100%;
  transition: transform 0.5s;
  transform-style: preserve-3d;
  position: relative;

  &--is-flipped {
    transform: rotateY(180deg);
  }

  &--dual {
    cursor: pointer;
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
