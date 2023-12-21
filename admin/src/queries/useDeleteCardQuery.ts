import { mtgDelete } from '@/api/mtgApi'
import useNotify from '@/composables/useNotify'
import { useMutation } from '@tanstack/vue-query'
import { ApiCard } from './useSearchQuery'

function useDeleteCardQuery(onDelete: (deletedCard: ApiCard) => void) {
  const { notifySuccess } = useNotify()

  async function postRemoveCard(name: string) {
    const deletedCard = await mtgDelete<ApiCard>(`/api/card?name=${name}`)
    onDelete(deletedCard)

    notifySuccess(`${name} was removed from your collection`)
    return deletedCard
  }

  return useMutation({
    mutationFn: postRemoveCard,
  })
}

export default useDeleteCardQuery
