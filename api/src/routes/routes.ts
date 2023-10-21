// #swagger.autoBody=true
import type { Request, Response, Application } from 'express'
import { query } from 'express-validator'

import { type Card, insertCard, findCard, updateCard } from '../database/cards'
import cardSearch from '../api/scryfall/cardSearch'
import authenticateToken from '../authenticateToken'
import authenticateRoutes from './authenticateRoutes'

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

// TODO send error when something occures
export default function (app: Application) {
  authenticateRoutes(app)

  // TODO swagger nedava example
  app.get(
    '/cards/search',
    authenticateToken,
    query('q').isString(),
    async (req: RequestQuery<SearchQuery>, res: Response) => {
      /*#swagger.tags = ['Cards search']
        #swagger.parameters['q'] = {
          schema: {
            $q: 'Counterspell'
          }
      } */
      // load all cards from scryfall
      const response = await cardSearch(req.query.q)
      // find cards in database and join them to scryfall response
      const apiResponse = await Promise.all(
        response.map(async (card) => {
          return {
            ...card,
            inCollection: (await findCard(card.cardFaces[0].name))?.inCollection ?? 0,
          }
        }),
      )

      res.send(apiResponse ?? [])
    },
  )

  app.post('/card', authenticateToken, async (req: Request, res: Response<Card>) => {
    /*#swagger.tags = ['Cards']
      #swagger.parameters['card'] = {
        in: 'body',
        schema: {
          $name: 'Vizzedrix'
        }
    } */
    const dbCard = await findCard(req.body.name)

    const card: Card = {
      name: req.body.name,
      inCollection: (dbCard?.inCollection ?? 0) + 1,
    }

    dbCard ? updateCard(card) : insertCard(card)

    res.send(card)
  })

  function getCard(name: string, inCollection: number): Card {
    return {
      name,
      inCollection,
    }
  }
  app.delete(
    '/card',
    query('name').isString(),
    async (req: RequestQuery<DeleteQuery>, res: Response) => {
      /*#swagger.tags = ['Cards remove from collection']
        #swagger.parameters['name'] = {
          schema: {
            $name: 'Counterspell'
          }
      } */
      const dbCard = await findCard(req.query.name)
      if (!dbCard) return

      const card = getCard(req.query.name, dbCard.inCollection ? dbCard.inCollection - 1 : 0)
      updateCard(card)
      res.send(card)
    },
  )
}
