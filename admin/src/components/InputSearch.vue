<template>
  <q-input
    dark
    dense
    standout
    placeholder="Type for a card"
    v-model="cardSearch"
    input-class="text-right"
    debounce="500"
    class="q-ml-md"
  >
    <template #append>
      <q-icon v-if="!cardSearch" name="search" dark />
      <q-icon
        v-else
        name="clear"
        class="cursor-pointer"
        dark
        @click="resetSearch"
      />
    </template>
  </q-input>
</template>

<script setup lang="ts">
import useSearchQuery from '@/queries/useSearchQuery'

const { cardSearch } = useSearchQuery()

function resetSearch() {
  cardSearch.value = ''
}
</script>

<style scoped lang="scss">
.input-search {
  width: 250px;
}
</style>
@/queries/useSearchQuery
