<template>
  <div class="card-menu flex column">
    <card-button color="green" icon="add" @click="emit('add')" />
    <card-button color="red" icon="remove" @click="emit('remove')" />
    <card-button
      v-if="props.showFlip"
      color="black"
      icon="auto_stories"
      @click="emit('flip')"
    />
  </div>
</template>

<script setup lang="ts">
import CardButton from '@/components/general/CardButton.vue'

type Props = {
  showFlip?: boolean
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
