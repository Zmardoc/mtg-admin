<template>
  <main-layout hide-search>
    <q-page class="q-pa-sm">
      <q-btn color="primary" class="full-width" @click="scannerWindow = true"
        >Open Scanner</q-btn
      >
      <ScannerResults />
      <template v-if="scannerWindow">
        <q-btn
          class="close-btn"
          color="primary"
          round
          flat
          icon="arrow_back_ios"
          size="xl"
          @click="scannerWindow = false"
        />
        <ScannerWindow />
      </template>
    </q-page>
  </main-layout>
</template>

<script setup lang="ts">
import ScannerResults from '@/components/ScannerResults'
import ScannerWindow from '@/components/ScannerWindow/ScannerWindow.vue'
import MainLayout from '@/layouts/MainLayout.vue'
import { ref } from 'vue'

const scannerWindow = ref(true)
</script>

<style lang="scss" scoped>
.close-btn {
  z-index: 2002;
  position: fixed;
  bottom: 32px;
  left: 60px;
}
</style>
