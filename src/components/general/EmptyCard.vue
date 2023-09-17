<template>
  <div
    class="empty-card flex items-start justify-center bg-primary"
    :title="props.cardName"
  >
    <div class="empty-card__header q-px-xs mtg-font-bold text-black">
      {{ props.cardName }}
    </div>
  </div>
</template>

<script setup lang="ts">
type Props = {
  cardName: string
}

const props = defineProps<Props>()
</script>

<style scoped lang="scss">
.empty-card {
  border: 10px solid black;
  border-radius: 12px;
  height: 100%;
  width: $card-width;
  padding: 4px;

  &__header {
    height: 20px;
    padding-top: 1px;
    font-size: 0.8rem;
    background-color: #dcdcf2;
    border-radius: 18px/40px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    border: 1px solid;
    -webkit-box-shadow: -1px 1px 4px 0px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: -1px 1px 4px 0px rgba(0, 0, 0, 0.75);
    box-shadow: -1px 1px 4px 0px rgba(0, 0, 0, 0.75);
  }
}
</style>
