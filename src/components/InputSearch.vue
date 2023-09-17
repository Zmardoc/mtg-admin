<template>
  <q-input
    dark
    dense
    standout
    label="Type for a card"
    v-model="cardSearch"
    input-class="text-right"
    debounce="500"
    class="q-ml-md"
  >
    <template #append>
      <q-icon v-if="!cardSearch" name="search" />
      <q-icon v-else name="clear" class="cursor-pointer" @click="resetSearch" />
    </template>
  </q-input>
</template>

<script setup lang="ts">
import useScryfallSearchQuery from 'src/queries/useScryfallSearchQuery'

const { cardSearch } = useScryfallSearchQuery()

function resetSearch() {
  cardSearch.value = ''
}
</script>

<style scoped lang="scss">
.input-search {
  width: 250px;
}
</style>
