// #swagger.autoBody=true
import { type Request, type Response } from 'express'

import cardSearch, { type ApiCard } from '../api/scryfall/cardSearch'
import { findCard, insertCard, updateCard } from '../database/cards'
import { ErrorResponse } from '../api/types'
import { getUnknownError } from '../errors'

type RequestQuery<T> = Request<
  Record<string, never>,
  Record<string, never>,
  Record<string, never>,
  T
>

type DeleteQuery = {
  name: string
}

type SearchQuery = {
  q: string
}

function isSuccessfullResponse(response: ErrorResponse | ApiCard[]): response is ApiCard[] {
  return response instanceof Array
}

async function searchCards(searchQuery: string, userId: string | undefined) {
  // load all cards from scryfall
  const response = await cardSearch(searchQuery)

  if (isSuccessfullResponse(response)) {
    try {
      // find cards in database and join them to scryfall response
      const apiResponse = await Promise.all(
        response.map(async (card) => {
          if (!userId) return card

          const foundCard = await findCard(card.frontFace.name, userId)
          return {
            ...card,
            inCollection: foundCard?.inCollection ?? 0,
          }
        }),
      )
      return apiResponse
    } catch (error) {
      return getUnknownError(error)
    }
  } else {
    return response
  }
}
// TODO dont send res and req to service
//TODO better name for this function
async function upsertCard(req: Request, res: Response<ApiCard>) {
  if (!req.user?.id) return // TODO nahovno, uz se to pridava v authenticateToken

  const dbCard = await findCard(req.body.card.frontFace.name, req.user.id)

  const card = {
    ...req.body.card,
    inCollection: dbCard ? dbCard.inCollection + 1 : 1,
    userId: req.user.id,
  }

  dbCard ? updateCard(card) : insertCard(card)

  res.send(card)
}

async function deleteCard(req: RequestQuery<DeleteQuery>, res: Response) {
  if (!req.user?.id) return // TODO nahovno, uz se to pridava v authenticateToken

  const dbCard = await findCard(req.query.name, req.user.id)
  if (!dbCard) return

  const card = {
    ...dbCard,
    inCollection: dbCard.inCollection - 1,
    userId: req.user.id,
  }
  updateCard(card)
  res.send(card)
}

export { searchCards, upsertCard, deleteCard }
export type { RequestQuery, DeleteQuery, SearchQuery }
