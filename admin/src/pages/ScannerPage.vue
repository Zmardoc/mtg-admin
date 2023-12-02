<template>
  <main-layout hide-search>
    <q-page class="q-pa-sm">
      <q-btn
        color="primary"
        class="full-width"
        @click="scannerWindowVisible = true"
        >Open Scanner</q-btn
      >
      <scanner-results />
      <template v-if="scannerWindowVisible">
        <q-btn
          class="close-btn"
          color="primary"
          round
          flat
          icon="arrow_back_ios"
          size="xl"
          @click="scannerWindowVisible = false"
        />
        <scanner-window />
      </template>
    </q-page>
  </main-layout>
</template>

<script setup lang="ts">
import ScannerResults from '@/components/ScannerResults'
import ScannerWindow from '@/components/ScannerWindow'
import MainLayout from '@/layouts/MainLayout.vue'
import { ref } from 'vue'

const scannerWindowVisible = ref(true)
</script>

<style lang="scss" scoped>
.close-btn {
  z-index: 2002;
  position: fixed;
  bottom: 32px;
  left: 60px;
}
</style>
