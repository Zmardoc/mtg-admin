import { mtgPost } from '@/api/mtgApi'
import useNotify from '@/composables/useNotify'
import { useMutation } from '@tanstack/vue-query'
import useCardSearch, {
  type CollectionCard,
} from '@/components/card/useCardSearch'

function useAddCardQuery() {
  const { updateSearch } = useCardSearch()
  const { notifySuccess } = useNotify()

  async function postAddCard(name: string) {
    const collectionCard = await mtgPost<CollectionCard>('/card/upsert', {
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
