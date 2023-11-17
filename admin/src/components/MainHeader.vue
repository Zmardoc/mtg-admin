<template>
  <q-header class="bg-black text-white">
    <q-toolbar>
      <q-btn v-if="!props.emptyHeader" round @click="emits('toggleLeftDrawer')">
        <img src="~assets/logo.png" height="38" width="38" alt="logo" />
      </q-btn>
      <img v-else src="~assets/logo.png" height="38" width="38" alt="logo" />
      <q-toolbar-title>
        <div class="mtg-font-bold gt-xs">MTG Collector</div>
      </q-toolbar-title>

      <input-search
        v-if="!props.emptyHeader && !props.hideSearch"
        input-class="text-left"
        class="input-search"
        :class="{ 'input-search__center': !query && screen.gt.sm }"
      />
    </q-toolbar>
  </q-header>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar'
import { useCardSearch, InputSearch } from './InputSearch'

type Props = {
  emptyHeader?: boolean
  hideSearch?: boolean
}
const props = defineProps<Props>()
const emits = defineEmits<(event: 'toggleLeftDrawer') => void>()

const { query } = useCardSearch()
const { screen } = useQuasar()
</script>

<style lang="scss" scoped>
.input-search {
  width: 100%;
  max-width: 375px;

  &__center {
    position: fixed;
    top: 50%;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 400px;
  }
}
</style>
