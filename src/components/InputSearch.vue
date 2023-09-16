<template>
  <q-input
    dark
    dense
    standout
    label="Type for card"
    v-model="search"
    input-class="text-right"
    class="q-ml-md"
  >
    <template #append>
      <q-icon v-if="!search" name="search" />
      <q-icon v-else name="clear" class="cursor-pointer" @click="resetSearch" />
    </template>
  </q-input>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { debounce } from 'quasar'

//const emits = defineEmits

const search = ref('')

function resetSearch() {
  search.value = ''
}
</script>

<style scoped lang="scss">
.input-search {
  width: 250px;
}
</style>
```
