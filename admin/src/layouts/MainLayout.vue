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
import MainHeader from '@/components/MainHeader.vue'
import useApplicationStore from '@/stores/applicationStore'
import DrawerMenu from '@/components/menu/DrawerMenu.vue'

const { toggleDrawer } = useApplicationStore()
</script>
