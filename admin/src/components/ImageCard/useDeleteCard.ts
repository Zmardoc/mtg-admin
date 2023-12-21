import useDeleteCardQuery from '@/queries/useDeleteCardQuery'
import { useCardSearch } from '../InputSearch'
import useScannerStore from '@/stores/scannerStore'
import type { ApiCard } from '@/queries/useSearchQuery'

function useDeleteCard() {
  const { updateSearch } = useCardSearch()
  const { updateScannedCards } = useScannerStore()

  function updateCardLists(addedCard: ApiCard) {
    updateSearch(addedCard) //vue-query
    updateScannedCards(addedCard) //store
  }

  const { mutate: deleteCardFromCollection } =
    useDeleteCardQuery(updateCardLists)

  return deleteCardFromCollection
}

export default useDeleteCard
