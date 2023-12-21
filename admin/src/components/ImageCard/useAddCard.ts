import useAddCardQuery from '@/queries/useAddCardQuery'
import { useCardSearch } from '../InputSearch'
import useScannerStore from '@/stores/scannerStore'
import type { ApiCard } from '@/queries/useSearchQuery'

function useAddCard() {
  const { updateSearch } = useCardSearch()
  const { updateScannedCards } = useScannerStore()

  function updateCardLists(addedCard: ApiCard) {
    updateSearch(addedCard) //vue-query
    updateScannedCards(addedCard) //store
  }

  const { mutate: addCardToCollection } = useAddCardQuery(updateCardLists)

  return addCardToCollection
}

export default useAddCard
