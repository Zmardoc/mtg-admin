import { WritableComputedRef } from 'vue'

const cardQueryKeys = {
  all: ['wizard'] as const,
  searchWizards: (cardSearch: WritableComputedRef<string>) =>
    [...cardQueryKeys.all, 'search', cardSearch] as const,
}

export { cardQueryKeys }
