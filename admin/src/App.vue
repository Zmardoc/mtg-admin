<template>
  <Suspense>
    <test-recognition />
  </Suspense>
  <router-view />
</template>

<script setup lang="ts">
import TestRecognition from './components/TestRecognition.vue'
</script>
