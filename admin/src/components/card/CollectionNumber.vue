<template>
  <div
    class="collection-number mtg-font-bold text-h1 position-absolute"
    :class="getColor"
  >
    {{ props.inCollection }}
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type Props = {
  inCollection: number
}

const props = defineProps<Props>()

const getColor = computed(() =>
  props.inCollection && false ? 'text-primary' : 'text-white'
)
</script>

<style scoped lang="scss">
.collection-number {
  top: 50px;
  left: 0;
  right: 0;
  text-align: center;
}
</style>
