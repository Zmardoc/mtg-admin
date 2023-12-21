import queryClient from '@/config/query'
import queryKeys from '@/queries/queryKeys'
import { ApiCard } from '@/queries/useSearchQuery'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

function getUpdatedSearch(newCard: ApiCard, oldData?: ApiCard[]) {
  return oldData?.map((card) => {
    if (card.frontFace.name === newCard.frontFace.name) {
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

  const query = computed({
    get: () =>
      decodeURIComponent((route.query.query as string | undefined) ?? ''),
    set: (value) => {
      router.push({
        name: 'index',
        query: { query: encodeURIComponent(value) },
      })
    },
  })

  // Update on data change basically
  function updateSearch(card: ApiCard) {
    const searchKey = queryKeys.search(query)

    queryClient.setQueryData(searchKey, (oldData?: ApiCard[]) =>
      getUpdatedSearch(card, oldData)
    )
  }

  return {
    query,
    updateSearch,
  }
}

export default useCardSearch
