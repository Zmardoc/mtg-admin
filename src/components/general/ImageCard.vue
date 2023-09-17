<template>
  <div class="q-pa-xs">
    <q-img :src="props.src" spinner-color="white" fit="fill" class="card-image">
      <template #error>
        <empty-card :card-name="props.cardName" />
      </template>
    </q-img>
  </div>
</template>

<script setup lang="ts">
import EmptyCard from './EmptyCard.vue'

type Props = {
  src?: string
  cardName: string
}

const props = defineProps<Props>()
</script>

<style scoped lang="scss">
.card-image {
  width: $card-width;
  height: 100%;
  border-radius: 12px;
}
</style>
