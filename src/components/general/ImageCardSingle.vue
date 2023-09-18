<template>
  <div @click="emit('click')">
    <q-img :src="src" spinner-color="white" fit="fill" class="card-image">
      <template #error>
        <empty-card :card-name="props.name" :oracle-text="props.oracleText" />
      </template>
      <slot />
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

const emit = defineEmits<{
  (e: 'click'): void
}>()
</script>

<style scoped lang="scss">
.card-image {
  width: $card-width;
  height: 100%;
  border-radius: 12px;
}
</style>
