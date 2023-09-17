import { WritableComputedRef } from 'vue'

const cardScryfallQueryKeys = {
  all: ['scryfall'] as const,
  search: (cardSearch: WritableComputedRef<string>) =>
    [...cardScryfallQueryKeys.all, 'search', cardSearch] as const,
}

export default cardScryfallQueryKeys
