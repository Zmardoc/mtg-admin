<template>
  <q-input
    dark
    dense
    standout
    placeholder="Type for a card"
    v-model="cardSearch"
    :input-class="props.inputClass"
    debounce="500"
    @focus="(input) => ((input.target as HTMLInputElement)?.select?.())"
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

type Props = {
  inputClass?: string
}

const props = defineProps<Props>()

const { cardSearch } = useSearchQuery()

function resetSearch() {
  cardSearch.value = ''
}
</script>
