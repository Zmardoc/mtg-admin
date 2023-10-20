<template>
  <q-drawer :model-value="drawerOpen" side="left" overlay bordered dark>
    <q-scroll-area class="fit">
      <q-list>
        <q-space />
        <menu-item icon="logout" label="Logout" path-name="login" />
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>

<script setup lang="ts">
import MenuItem from '@/components/menu/MenuItem.vue'
import useApplicationStore from '@/stores/applicationStore'
import { computed } from 'vue'

const applicationStore = useApplicationStore()

const drawerOpen = computed({
  get: () => applicationStore.drawer,
  set: (value) => applicationStore.setDrawer(value),
})
</script>
