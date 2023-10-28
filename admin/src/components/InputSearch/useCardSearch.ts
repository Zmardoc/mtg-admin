import queryClient from '@/config/query'
import queryKeys from '@/queries/queryKeys'
import { ApiCard } from '@/queries/useSearchQuery'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { CollectionCard } from '.'

function getUpdatedSearch(newCard: CollectionCard, oldData?: ApiCard[]) {
  return oldData?.map((card) => {
    if (card.cardFaces[0].name === newCard.name) {
      return {
        ...card,
        inCollection: newCard.inCollection,
      }
    }
    return card
  })
}

function useCardSearch() {
  const router = useRouter()
  const route = useRoute()

  const cardSearch = computed({
    get: () => (route.params.cardSearch as string | undefined) ?? '',
    set: (value) => {
      router.push({ name: 'index', params: { cardSearch: value } })
    },
  })

  // Update on data change basically
  function updateSearch(collectionCard: CollectionCard) {
    const searchKey = queryKeys.search(cardSearch)

    queryClient.setQueryData(searchKey, (oldData?: ApiCard[]) =>
      getUpdatedSearch(collectionCard, oldData)
    )
  }

  return {
    cardSearch,
    updateSearch,
  }
}

export default useCardSearch
