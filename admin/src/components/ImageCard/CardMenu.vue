<template>
  <div class="card-menu flex column">
    <card-button icon="add" color="black" @click="emit('add')" />
    <card-button
      v-if="props.inCollection > 0"
      icon="remove"
      color="black"
      @click="emit('remove')"
    />
  </div>
</template>

<script setup lang="ts">
import CardButton from './CardButton.vue'

type Props = {
  inCollection: number
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'add'): void
  (e: 'remove'): void
}>()
</script>

<style scoped lang="scss">
.card-menu {
  gap: 4px;
}
</style>
