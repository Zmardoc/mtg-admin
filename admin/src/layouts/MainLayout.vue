<template>
  <q-layout view="hHh lpR lFr">
    <main-header @toggleLeftDrawer="toggleDrawer" />
    <drawer-menu />
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { DrawerMenu } from '@/components/DrawerMenu'
import MainHeader from '@/components/MainHeader.vue'
import useApplicationStore from '@/stores/applicationStore'

const { toggleDrawer } = useApplicationStore()
</script>
