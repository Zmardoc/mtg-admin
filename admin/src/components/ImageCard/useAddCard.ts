import useAddCardQuery from '@/queries/useAddCardQuery'
import { CollectionCard, useCardSearch } from '../InputSearch'
import useScannerStore from '@/stores/scannerStore'

function useAddCard() {
  const { updateSearch } = useCardSearch()
  const { updateScannedCards } = useScannerStore()

  function updateCardLists(addedCard: CollectionCard) {
    updateSearch(addedCard) //vue-query
    updateScannedCards(addedCard) //store
  }

  const { mutate: addCardToCollection } = useAddCardQuery(updateCardLists)

  return addCardToCollection
}

export default useAddCard
