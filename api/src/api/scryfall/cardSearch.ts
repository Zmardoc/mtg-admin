import sryfallBase from './sryfallBase'

import type { AxiosResponse } from 'axios'
import type { ScryfallCard, ScryfallCardSearchResponse, CardPrices } from './sryfallSearchTypes'
import type { ErrorResponse } from '../types'

type ApiCard = {
  id: string
  frontFace: ScryfallCard
  backFace: ScryfallCard | null
  inCollection: number
  prices: CardPrices
  userId?: string // TODO nevimnevim
}

type ScryfallResponse = ScryfallCardSearchResponse | ErrorResponse
type ScryfallAxiosResponse = AxiosResponse<ScryfallResponse, unknown>
type ScryfallSuccessAxiosResponse = AxiosResponse<ScryfallCardSearchResponse, unknown>

function getFrontFace(card: ScryfallCard): ScryfallCard {
  if (card.card_faces && !card.image_uris) {
    return {
      ...card,
      name: card.card_faces[0].name,
      imageUrl: card.card_faces[0].image_uris?.normal ?? null,
      oracleText: card.card_faces[0].oracle_text ?? null,
    }
  }

  return {
    ...card,
    name: card.name,
    imageUrl: card.image_uris?.normal ?? null,
    oracleText: card.oracle_text ?? null,
  }
}

function getBackFace(card: ScryfallCard): ScryfallCard | null {
  if (!(card.card_faces && !card.image_uris)) return null

  return {
    ...card,
    name: card.card_faces[1].name,
    imageUrl: card.card_faces[1].image_uris?.normal ?? null,
    oracleText: card.card_faces[1].oracle_text ?? null,
  }
}

function convertToApi(cards: ScryfallCard[]): ApiCard[] {
  return cards.map((card) => ({
    id: card.id,
    frontFace: getFrontFace(card),
    backFace: getBackFace(card),
    inCollection: 0,
    prices: card.prices,
  }))
}

function successfullResponse(
  response: ScryfallAxiosResponse,
): response is ScryfallSuccessAxiosResponse {
  return response.status === 200
}

async function cardSearch(query: string) {
  if (query === '') return []
  try {
    const response = await sryfallBase.get<ScryfallResponse>(`/cards/search?q=${query}`)

    if (successfullResponse(response)) {
      return response.data ? convertToApi(response.data.data) : []
    } else {
      return response.data as ErrorResponse
    }
  } catch (error) {
    return {
      status: 500,
      code: 'scryfall_server_error',
      details: 'Something went wrong on my poor, poor server when calling scryfall api.',
      stack: error,
    } as ErrorResponse
  }
}

export default cardSearch
export type { ApiCard }
