import sryfallBase from './sryfallBase'
import type { ScryfallCard, ScryfallCardSearchResponse } from './sryfallSearchTypes'

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

async function cardSearch(query: string) {
  if (query === '') return []
  //TODO osetrit 400,500
  try {
    const response = await sryfallBase.get<ScryfallCardSearchResponse>(`/cards/search?q=${query}`)
    return response.data ? convertToApi(response.data.data) : []
  } catch (error) {
    console.error(error)
    return []
  }
}

export default cardSearch
