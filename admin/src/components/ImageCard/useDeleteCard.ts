import useDeleteCardQuery from '@/queries/useDeleteCardQuery'
import { CollectionCard, useCardSearch } from '../InputSearch'
import useScannerStore from '@/stores/scannerStore'

function useDeleteCard() {
  const { updateSearch } = useCardSearch()
  const { updateScannedCards } = useScannerStore()

  function updateCardLists(addedCard: CollectionCard) {
    updateSearch(addedCard) //vue-query
    updateScannedCards(addedCard) //store
  }

  const { mutate: deleteCardFromCollection } =
    useDeleteCardQuery(updateCardLists)

  return deleteCardFromCollection
}

export default useDeleteCard
