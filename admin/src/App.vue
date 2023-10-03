<template>
  <router-view />
  <Suspense>
    <test-recognition />
  </Suspense>
</template>

<script setup lang="ts">
import TestRecognition from './components/TestRecognition.vue'
</script>
