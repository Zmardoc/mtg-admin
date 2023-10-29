<template>
  <q-btn round :icon="props.icon" class="card-button" />
</template>

<script setup lang="ts">
type Props = {
  icon: string
}

const props = defineProps<Props>()
// TODO lepsi barvy
</script>

<style scoped lang="scss">
.card-button {
  color: black;
  background-color: #ffffff60;
}
</style>
