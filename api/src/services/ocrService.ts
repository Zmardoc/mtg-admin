import osrScan from '../api/ocr/osrScan'
import { isError } from '../errors'
import { searchCards } from './cardService'

async function scanCard(imageBase64: string, userId: string | undefined) {
  const scanResult = await osrScan(imageBase64)
  if (isError(scanResult)) return scanResult

  const searchResult = await searchCards(scanResult, userId)
  if (isError(searchResult)) return searchResult
  if (!searchResult.length) {
    return null
  }

  return searchResult[0]
}
export default scanCard
