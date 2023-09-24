import { WritableComputedRef } from 'vue'

const queryKeys = {
  all: ['mtg'] as const,
  search: (cardSearch: WritableComputedRef<string>) =>
    [...queryKeys.all, 'search', cardSearch] as const,
}

export default queryKeys
