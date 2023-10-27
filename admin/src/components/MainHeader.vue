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
        v-show="!props.emptyHeader && (cardSearch || screen.lt.sm)"
        input-class="text-left"
        class="input-search"
      />
    </q-toolbar>
  </q-header>
</template>

<script setup lang="ts">
import InputSearch from '@/components/InputSearch.vue'
import useSearchQuery from '@/queries/useSearchQuery'
import { useQuasar } from 'quasar'

type Props = {
  emptyHeader?: boolean
}
const props = defineProps<Props>()
const emits = defineEmits<(event: 'toggleLeftDrawer') => void>()

const { cardSearch } = useSearchQuery()
const { screen } = useQuasar()
</script>

<style lang="scss" scoped>
.input-search {
  width: 100%;
  max-width: 375px;
}
</style>
