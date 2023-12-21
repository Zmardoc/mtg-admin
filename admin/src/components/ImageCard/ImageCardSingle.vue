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
      <card-price :prices="props.prices" />
    </q-img>
  </div>
</template>

<script setup lang="ts">
import type { CardPrices } from '@/queries/useSearchQuery'
import CollectionNumber from './CollectionNumber.vue'
import EmptyCard from './EmptyCard.vue'
import CardPrice from './CardPrice.vue'
import { ScryfallCard } from '@/queries/sryfallSearchTypes'
//TODO posilat jen cardFace
type Props = {
  cardFace: ScryfallCard
  inCollection: number
  prices: CardPrices
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
