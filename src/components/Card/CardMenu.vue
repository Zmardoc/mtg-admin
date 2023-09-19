<template>
  <div class="card-menu">
    <q-btn-group spread>
      <q-btn color="primary" icon="save_alt" @click="addToCollection" />
      <q-btn color="secondary" icon="delete" @click="removeFromCollection" />
    </q-btn-group>
  </div>
</template>

<script setup lang="ts">
type Props = {
  cardName: string
}

const props = defineProps<Props>()

// TODO
function addToCollection() {
  console.log('Add to collection', props.cardName)
}

function removeFromCollection() {
  console.log('Remove from collection', props.cardName)
}
</script>

<style scoped lang="scss">
.card-menu {
  height: 0;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  transition: 0.2s;
  padding: 0;
}
</style>
