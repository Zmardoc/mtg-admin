<template>
  <div>
    <q-img
      :src="src"
      spinner-color="white"
      fit="fill"
      class="image-card-single"
    >
      <template #error>
        <empty-card :card-name="props.name" :oracle-text="props.oracleText" />
      </template>
    </q-img>
  </div>
</template>

<script setup lang="ts">
import EmptyCard from './EmptyCard.vue'

type Props = {
  name: string
  src: string
  oracleText: string
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
