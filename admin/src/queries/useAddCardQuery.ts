import { mtgPost } from '@/api/mtgApi'
import useNotify from '@/composables/useNotify'
import { useMutation } from '@tanstack/vue-query'
import type { ApiCard } from './useSearchQuery'

function useAddCardQuery(onAdd: (addedCard: ApiCard) => void) {
  const { notifySuccess } = useNotify()

  async function postAddCard(card: ApiCard) {
    const collectionCard = await mtgPost<ApiCard>('/api/card/upsert', {
      card,
    })
    if (collectionCard) {
      notifySuccess(`${card.frontFace.name} was added to your collection`)
      onAdd(collectionCard)
    }

    return collectionCard
  }

  return useMutation({
    mutationFn: postAddCard,
  })
}

export default useAddCardQuery
