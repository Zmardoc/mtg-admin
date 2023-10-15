<template>
  <q-page class="row" dark>
    <card-dashboard />
    <q-page-scroller position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="keyboard_arrow_up" color="black" />
    </q-page-scroller>
  </q-page>
</template>

<script setup lang="ts">
import { mtgGet } from '@/api/mtgApi'
import CardDashboard from '@/components/CardDashboard.vue'

mtgGet('/login-check') // TODO better
</script>
