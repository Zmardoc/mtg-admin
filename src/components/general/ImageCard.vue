<template>
  <image-card-single
    :name="frontCard.name"
    :src="frontCard.src"
    :oracle-text="frontCard.oracleText"
  >
    <q-tooltip
      v-if="hasDualFace"
      anchor="center right"
      self="center left"
      :offset="[0, 10]"
      transition-show="flip-right"
      transition-hide="flip-left"
      class="card-back-side q-pa-0"
    >
      <image-card-single
        :name="backCard.name"
        :src="backCard.src"
        :oracle-text="backCard.oracleText"
      />
    </q-tooltip>
  </image-card-single>
</template>

<script setup lang="ts">
import { computed } from 'vue'
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

const hasDualFace = computed(() => !props.card.image_uris)

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

const frontCard = computed(() => {
  if (hasDualFace.value) {
    return getFaceOfDualCard()
  }
  return {
    name: props.card.name,
    src: props.card.image_uris?.normal ?? '',
    oracleText: props.card.oracle_text,
  }
})

const backCard = computed(() => getFaceOfDualCard(false))
</script>

<style lang="scss">
.card-back-side {
  background: none;
}
</style>
