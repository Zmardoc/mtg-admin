<template>
  <main-layout hide-search>
    <q-page class="q-pa-sm">
      <q-btn color="primary" class="full-width" @click="scannerWindow = true"
        >Open Scanner</q-btn
      >
      <template v-if="scannerWindow">
        <q-btn
          class="close-btn"
          color="black"
          round
          icon="close"
          @click="scannerWindow = false"
        />
        <ScannerWindow />
      </template>
    </q-page>
  </main-layout>
</template>

<script setup lang="ts">
import ScannerWindow from '@/components/ScannerWindow/ScannerWindow.vue'
import MainLayout from '@/layouts/MainLayout.vue'
import { ref } from 'vue'

const scannerWindow = ref(true)
</script>

<style lang="scss" scoped>
.close-btn {
  z-index: 2002;
  position: fixed;
  top: 16px;
  right: 16px;
}
</style>
