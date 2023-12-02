<template>
  <div class="flex justify-center q-py-xs">
    <image-card
      v-for="card in props.cards"
      :key="card.id"
      :card="card"
      class="q-ma-xs"
    />
  </div>
</template>

<script setup lang="ts">
import type { ApiCard } from '@/queries/useSearchQuery'
import { ImageCard } from '../ImageCard'

type Props = {
  cards: ApiCard[]
}
const props = defineProps<Props>()
</script>
