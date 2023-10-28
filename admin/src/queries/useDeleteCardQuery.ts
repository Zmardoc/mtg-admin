import { mtgDelete } from '@/api/mtgApi'
import useNotify from '@/composables/useNotify'
import { useMutation } from '@tanstack/vue-query'
import useCardSearch, { CollectionCard } from '@/components/card/useCardSearch'

function useDeleteCardQuery() {
  const { updateSearch } = useCardSearch()
  const { notifySuccess } = useNotify()

  async function postRemoveCard(name: string) {
    const collectionCard = await mtgDelete<CollectionCard>(`/card?name=${name}`)
    updateSearch(collectionCard)
    notifySuccess(`${name} was removed from your collection`)
    return collectionCard
  }

  return useMutation({
    mutationFn: postRemoveCard,
  })
}

export default useDeleteCardQuery
