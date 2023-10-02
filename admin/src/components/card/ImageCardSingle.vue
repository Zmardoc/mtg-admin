<template>
  <div>
    <q-img
      :src="props.cardFace.imageUrl ?? ''"
      spinner-color="white"
      fit="fill"
      class="image-card-single"
    >
      <collection-number :in-collection="props.inCollection" />
      <template #error>
        <empty-card
          :card-name="props.cardFace.name"
          :oracle-text="props.cardFace.oracleText ?? ''"
        />
      </template>
    </q-img>
  </div>
</template>

<script setup lang="ts">
import { CardFace } from '@/queries/useSearchQuery'
import CollectionNumber from './CollectionNumber.vue'
import EmptyCard from './EmptyCard.vue'

type Props = {
  cardFace: CardFace
  inCollection: number
}

const props = defineProps<Props>()
</script>

<style scoped lang="scss">
.image-card-single {
  width: $card-width;
  height: 100%;
  border-radius: 12px;
}
</style>
