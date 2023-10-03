<template>
  <q-layout view="hHh lpR lFr">
    <q-header elevated class="bg-black text-white">
      <q-toolbar>
        <q-btn round @click="toggleLeftDrawer">
          <img src="~assets/logo.png" height="38" width="22" />
        </q-btn>
        <q-toolbar-title>
          <div class="mtg-font-bold gt-xs">MTG Collector</div>
        </q-toolbar-title>

        <input-search input-class="text-left" class="input-search" />
      </q-toolbar>
    </q-header>

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
import InputSearch from '@/components/InputSearch.vue'

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
