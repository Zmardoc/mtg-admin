// #swagger.autoBody=true
import { type Request, type Response, Router } from 'express'
import { query } from 'express-validator'

import authenticateToken from '../authenticateToken'
import type { Card } from '../database/cards'
import { deleteCard, searchCards, upsertCard } from '../services/cardService'

const router = Router()

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

router.get(
  '/search',
  authenticateToken,
  query('q').isString(),
  async (req: RequestQuery<SearchQuery>, res: Response) => {
    /*#swagger.tags = ['Cards search']
      #swagger.parameters['q'] = {
        schema: {
          $q: 'Counterspell'
        }
    } */
    searchCards(req, res)
  },
)

router.post('/upsert', authenticateToken, async (req: Request, res: Response<Card>) => {
  /*#swagger.tags = ['Cards']
    #swagger.parameters['card'] = {
      in: 'body',
      schema: {
        $name: 'Vizzedrix'
      }
  } */
  upsertCard(req, res)
})

router.delete(
  '/',
  [authenticateToken, query('name').isString()],
  async (req: RequestQuery<DeleteQuery>, res: Response) => {
    /*#swagger.tags = ['Cards remove from collection']
      #swagger.parameters['name'] = {
        schema: {
          $name: 'Counterspell'
        }
    } */
    deleteCard(req, res)
  },
)

export default router
