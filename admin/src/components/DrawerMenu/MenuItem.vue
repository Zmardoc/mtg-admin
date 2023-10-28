<template>
  <div>
    <q-item clickable :to="to">
      <q-item-section avatar>
        <q-icon :name="props.icon" />
      </q-item-section>
      <q-item-section>
        {{ props.label }}
      </q-item-section>
    </q-item>

    <q-separator v-if="props.separator" />
  </div>
</template>

<script setup lang="ts">
import { RouteLocationRaw } from 'vue-router'

type Props = {
  label: string
  icon: string
  to: RouteLocationRaw
  separator?: boolean
}
const props = defineProps<Props>()
</script>
