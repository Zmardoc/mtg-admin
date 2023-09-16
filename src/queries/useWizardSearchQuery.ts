import { computed } from 'vue'
import { cardQueryKeys } from './cardQueryKeys'
import { useQuery } from '@tanstack/vue-query'
import { wizardApi } from 'src/boot/axios'
import { useSearchBarStore } from 'src/stores/searchBarStore'
import { lowerCase } from 'lodash'

type Ruling = {
  date: string
  text: string
}

type ForeignName = {
  name: string
  text: string
  type: string
  flavor: string
  imageUrl: string
  language: string
  multiverseid: number
}

type Legality = {
  format: string
  legality: string
}

type WizardCard = {
  name: string
  manaCost: string
  cmc: number
  colors: string[]
  colorIdentity: string[]
  type: string
  types: string[]
  rarity: string
  set: string
  setName: string
  text: string
  artist: string
  number: string
  layout: string
  multiverseid: string
  imageUrl: string
  variations: string[]
  rulings: Ruling[]
  foreignNames: ForeignName[]
  printings: string[]
  originalText: string
  originalType: string
  legalities: Legality[]
  id: string
}

type WizardCardsResponse = {
  cards: WizardCard[]
}

function useWizardSearchQuery() {
  const searchBarStore = useSearchBarStore()

  async function searchCards(cardTitle: string) {
    if (cardTitle === '') return []

    //TODO osetrit 400,500
    const response = await wizardApi.get<WizardCardsResponse>(
      `/cards?name=${lowerCase(cardTitle)}&pageSize=20`
    )
    return response.data.cards ?? []
  }

  const cardSearch = computed({
    get: () => searchBarStore.searchText,
    set: (value) => searchBarStore.setSearchText(value),
  })

  const { data, isFetching } = useQuery(
    cardQueryKeys.searchWizards(cardSearch),
    () => searchCards(cardSearch.value)
  )

  const wizardCards = computed(() => data.value ?? [])

  return {
    cardSearch,
    wizardCards,
    isFetching,
  }
}

export default useWizardSearchQuery
