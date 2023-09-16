<template>
  <div class="q-pa-xs">
    <q-img :src="props.src" spinner-color="white" fit="fill" class="card-image">
      <template #error>
        <div class="absolute-full flex flex-center bg-negative text-white">
          {{ cardName }}
        </div>
      </template>
    </q-img>
  </div>
</template>

<script setup lang="ts">
type Props = {
  src: string
  cardName: string
}

const props = defineProps<Props>()
</script>

<style scoped lang="scss">
.card-image {
  width: 265px;
}
</style>
