import { WritableComputedRef } from 'vue'

const queryKeys = {
  all: ['mtg'] as const,
  search: (query: WritableComputedRef<string>) =>
    [...queryKeys.all, 'search', query] as const,
}

export default queryKeys
