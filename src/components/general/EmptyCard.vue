<template>
  <div class="empty-card flex justify-center bg-primary text-white">
    {{ props.cardName }}
  </div>
</template>

<script setup lang="ts">
type Props = {
  cardName: string
}

const props = defineProps<Props>()
</script>

<style scoped lang="scss">
.empty-card {
  border: 10px solid black;
  border-radius: 12px;
  height: 100%;
}
</style>
