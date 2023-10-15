// #swagger.autoBody=true
import type { Request, Response, Application } from 'express'
import { query } from 'express-validator'

import { type Card, insertCard, findCard, updateCard } from '../database/cards'
import cardSearch from '../api/scryfall/cardSearch'
import jwt, { Secret } from 'jsonwebtoken'
import authenticateToken from '../authenticateToken'

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

type User = {
  id: number
  username: string
  password: string
}

// TODO send error when something occures
export default function (app: Application) {
  app.post('/login', (req: Request, res: Response) => {
    const { username, password } = req.body

    //TODO validate username and password
    const user: User = { id: 1, username: 'user', password: 'pass' }

    if (user.username === username && user.password === password) {
      // Vytvoření a odeslání JWT tokenu
      const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.API_KEY as Secret,
      )
      res.json({ token })
    } else {
      res.status(401).json({ message: 'Login failed' })
    }
  })

  app.get('/login-check', authenticateToken, (_: Request, res: Response) => {
    res.status(200)
  })

  // TODO swagger nedava example
  app.get(
    '/cards/search',
    authenticateToken,
    query('q').isString(),
    async (req: RequestQuery<SearchQuery>, res: Response) => {
      // #swagger.tags = ['Cards search']
      /*  #swagger.parameters['q'] = {
          description: 'search card'
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
    // #swagger.tags = ['Cards']
    /*  #swagger.parameters['card'] = {
          in: 'body',
          description: 'add card',
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
      // #swagger.tags = ['Cards remove from collection']
      /*  #swagger.parameters['name'] = {
        description: 'remove card'
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
