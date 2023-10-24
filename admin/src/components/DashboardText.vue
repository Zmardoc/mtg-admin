<template>
  <span class="dashboard-text mtg-font-bold">
    {{ props.text }}
  </span>
</template>

<script setup lang="ts">
type Props = {
  text: string
}

const props = defineProps<Props>()
</script>

<style scoped lang="scss">
.dashboard-text {
  font-size: 2rem;
  font-weight: 700;
  text-align: center;

  @media (min-width: $breakpoint-md-min) {
    font-size: 4rem;
  }
}
</style>
