<template>
  <q-drawer :model-value="drawerOpen" side="left" overlay bordered dark>
    <q-scroll-area class="fit">
      <q-list>
        <q-space />
        <menu-item
          icon="logout"
          label="Logout"
          path-name="login"
          :to="{
            name: 'login',
            query: { query: route.query.query },
          }"
        />
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>

<script setup lang="ts">
import useApplicationStore from '@/stores/applicationStore'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import MenuItem from './MenuItem.vue'

const applicationStore = useApplicationStore()
const route = useRoute()

const drawerOpen = computed({
  get: () => applicationStore.drawer,
  set: (value) => applicationStore.setDrawer(value),
})
</script>
