import { mtgPost } from '@/api/mtgApi'
import useNotify from '@/composables/useNotify'
import { useMutation } from '@tanstack/vue-query'
import { type CollectionCard, useCardSearch } from '@/components/InputSearch'

function useAddCardQuery() {
  const { updateSearch } = useCardSearch()
  const { notifySuccess } = useNotify()

  async function postAddCard(name: string) {
    const collectionCard = await mtgPost<CollectionCard>('/api/card/upsert', {
      name,
    })
    if (collectionCard) {
      notifySuccess(`${name} was added to your collection`)
      updateSearch(collectionCard)
    }

    return collectionCard
  }

  return useMutation({
    mutationFn: postAddCard,
  })
}

export default useAddCardQuery
