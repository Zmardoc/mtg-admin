<template>
  <q-layout view="hHh lpR lFr">
    <main-header
      @toggleLeftDrawer="toggleDrawer"
      :hide-search="props.hideSearch ?? false"
    />
    <drawer-menu />
    <q-page-container>
      <slot>
        <router-view />
      </slot>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { DrawerMenu } from '@/components/DrawerMenu'
import MainHeader from '@/components/MainHeader.vue'
import useApplicationStore from '@/stores/applicationStore'

const { toggleDrawer } = useApplicationStore()

type Props = {
  hideSearch?: boolean
}
const props = defineProps<Props>()
</script>
