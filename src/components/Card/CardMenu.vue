<template>
  <div class="card-menu flex column">
    <card-button icon="add" color="black" @click="emit('add')" />
    <card-button
      v-if="inCollection > 0"
      icon="remove"
      color="black"
      @click="emit('remove')"
    />
    <card-button
      v-if="props.showFlip"
      icon="auto_stories"
      @click="emit('flip')"
    />
  </div>
</template>

<script setup lang="ts">
import CardButton from '@/components/general/CardButton.vue'

type Props = {
  inCollection: number
  showFlip: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'add'): void
  (e: 'remove'): void
  (e: 'flip'): void
}>()
</script>

<style scoped lang="scss">
.card-menu {
  gap: 4px;
}
</style>
