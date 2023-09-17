<template>
  <div class="q-pa-xs">
    <q-img :src="props.src" spinner-color="white" fit="fill" class="card-image">
      <template #error>
        <empty-card
          :card-name="props.cardName"
          :oracle-text="props.oracleText"
        />
      </template>
    </q-img>
  </div>
</template>

<script setup lang="ts">
import EmptyCard from './EmptyCard.vue'

type Props = {
  src?: string
  cardName: string
  oracleText: string
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
