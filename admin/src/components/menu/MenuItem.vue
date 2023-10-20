<template>
  <div>
    <q-item clickable :to="{ name: props.pathName }">
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
type Props = {
  label: string
  icon: string
  pathName: string
  separator?: boolean
}
const props = defineProps<Props>()
</script>
