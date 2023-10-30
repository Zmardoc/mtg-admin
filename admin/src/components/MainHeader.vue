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
        v-if="!props.emptyHeader"
        input-class="text-left"
        class="input-search"
        :class="{ 'input-search__center': !cardSearch && screen.gt.sm }"
      />
    </q-toolbar>
  </q-header>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar'
import { useCardSearch, InputSearch } from './InputSearch'

type Props = {
  emptyHeader?: boolean
}
const props = defineProps<Props>()
const emits = defineEmits<(event: 'toggleLeftDrawer') => void>()

const { cardSearch } = useCardSearch()
const { screen } = useQuasar()
</script>

<style lang="scss" scoped>
.input-search {
  width: 100%;
  max-width: 375px;

  &__center {
    position: absolute;
    width: 400px;
  }
}
</style>
