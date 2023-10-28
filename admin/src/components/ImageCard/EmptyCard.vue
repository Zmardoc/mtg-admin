<template>
  <div
    class="empty-card flex column justify-between bg-primary"
    :title="props.cardName"
  >
    <div class="empty-card__header q-px-xs mtg-font-bold text-black">
      {{ props.cardName }}
    </div>

    <div class="empty-card__body text-black">
      {{ props.oracleText }}
    </div>
  </div>
</template>

<script setup lang="ts">
type Props = {
  cardName: string
  oracleText: string
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

  &__header,
  &__body {
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-shadow: -1px 1px 4px 0px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: -1px 1px 4px 0px rgba(0, 0, 0, 0.75);
    box-shadow: -1px 1px 4px 0px rgba(0, 0, 0, 0.75);
    border: 1px solid;
  }
  &__header {
    width: 100%;
    height: 20px;
    padding-top: 1px;
    font-size: 0.8rem;
    background-color: #dcdcf2;
    border-radius: 18px/40px;
    white-space: nowrap;
  }

  &__body {
    width: 100%;
    padding: 4px;
    font-size: smaller;
    line-height: 0.8rem;
    background-color: #dcdcf2;
    border-radius: 2px;
  }
}
</style>
