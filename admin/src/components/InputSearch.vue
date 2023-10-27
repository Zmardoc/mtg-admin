<template>
  <q-input
    dense
    standout
    placeholder="Search cards..."
    v-model="cardSearch"
    :input-class="props.inputClass"
    debounce="500"
    @focus="(input) => ((input.target as HTMLInputElement)?.select?.())"
  >
    <template #append>
      <q-icon v-if="!cardSearch" name="search" dark />
      <q-icon v-else name="clear" class="cursor-pointer" @click="resetSearch" />
    </template>
  </q-input>
</template>

<script setup lang="ts">
import useCardSearch from '@/components/card/useCardSearch'

type Props = {
  inputClass?: string
}

const props = defineProps<Props>()

const { cardSearch } = useCardSearch()

function resetSearch() {
  cardSearch.value = ''
}
</script>
