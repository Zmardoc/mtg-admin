<template>
  <q-layout view="hHh lpR lFr">
    <main-header @toggleLeftDrawer="toggleLeftDrawer" />

    <q-drawer v-model="leftDrawerOpen" side="left" overlay bordered dark>
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import MainHeader from '@/components/MainHeader.vue'

const leftDrawerOpen = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>

<style lang="scss" scoped>
.input-search {
  width: 100%;
  max-width: 375px;
}
</style>
