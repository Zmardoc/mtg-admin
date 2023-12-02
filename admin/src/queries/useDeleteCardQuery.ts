import { mtgDelete } from '@/api/mtgApi'
import { type CollectionCard } from '@/components/InputSearch'
import useNotify from '@/composables/useNotify'
import { useMutation } from '@tanstack/vue-query'

function useDeleteCardQuery(onDelete: (deletedCard: CollectionCard) => void) {
  const { notifySuccess } = useNotify()

  async function postRemoveCard(name: string) {
    const collectionCard = await mtgDelete<CollectionCard>(
      `/api/card?name=${name}`
    )
    onDelete(collectionCard)

    notifySuccess(`${name} was removed from your collection`)
    return collectionCard
  }

  return useMutation({
    mutationFn: postRemoveCard,
  })
}

export default useDeleteCardQuery
