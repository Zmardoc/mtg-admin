<template>
  <div @click="emit('click')">
    <q-img
      :src="src"
      spinner-color="white"
      fit="fill"
      class="image-card-single"
    >
      <template #error>
        <empty-card :card-name="props.name" :oracle-text="props.oracleText" />
      </template>
      <card-menu class="image-card-single__menu" :card-name="props.name" />
    </q-img>
  </div>
</template>

<script setup lang="ts">
import EmptyCard from './EmptyCard.vue'
import CardMenu from './CardMenu.vue'

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
.image-card-single {
  width: $card-width;
  height: 100%;
  border-radius: 12px;

  &:hover {
    .image-card-single__menu {
      height: 100%;
    }
  }
}
</style>
