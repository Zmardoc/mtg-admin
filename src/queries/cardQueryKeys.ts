import { Ref } from 'vue'

const cardQueryKeys = {
  all: ['wizard'] as const,
  searchWizards: (cardSearch: Ref<string>) =>
    [...cardQueryKeys.all, cardSearch] as const,
}

export { cardQueryKeys }
