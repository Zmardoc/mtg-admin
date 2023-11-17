<template>
  <q-layout view="hHh lpR lFr">
    <main-header @toggleLeftDrawer="toggleDrawer" />
    <drawer-menu />
    <q-page-container>
      <page-wrapper>
        <router-view />
      </page-wrapper>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { DrawerMenu } from '@/components/DrawerMenu'
import MainHeader from '@/components/MainHeader.vue'
import useApplicationStore from '@/stores/applicationStore'
import PageWrapper from './PageWrapper.vue'

const { toggleDrawer } = useApplicationStore()
</script>
