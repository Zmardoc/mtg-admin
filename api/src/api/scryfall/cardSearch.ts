import sryfallBase from './sryfallBase'

import type { AxiosResponse } from 'axios'
import type { ScryfallCard, ScryfallCardSearchResponse } from './sryfallSearchTypes'
import type { ErrorResponse } from '../types'

type CardFace = {
  name: string
  imageUrl: string | null
  oracleText: string | null
}

type ApiCard = {
  id: string
  cardFaces: CardFace[]
  inCollection: number
}

type ScryfallResponse = ScryfallCardSearchResponse | ErrorResponse
type ScryfallAxiosResponse = AxiosResponse<ScryfallResponse, unknown>
type ScryfallSuccessAxiosResponse = AxiosResponse<ScryfallCardSearchResponse, unknown>

function convertToCardFaces(card: ScryfallCard): CardFace[] {
  if (card.card_faces && !card.image_uris) {
    return card.card_faces.map((cardFace) => ({
      name: cardFace.name,
      imageUrl: cardFace.image_uris?.normal ?? null,
      oracleText: cardFace.oracle_text ?? null,
    }))
  }

  const cardFace: CardFace = {
    name: card.name,
    imageUrl: card.image_uris?.normal ?? null,
    oracleText: card.oracle_text ?? null,
  }
  return [cardFace]
}

function convertToApi(cards: ScryfallCard[]): ApiCard[] {
  return cards.map((card) => ({
    id: card.id,
    cardFaces: convertToCardFaces(card),
    inCollection: 0,
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
