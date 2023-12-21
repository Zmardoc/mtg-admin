// #swagger.autoBody=true
import { type Request, type Response, Router } from 'express'
import { query } from 'express-validator'

import authenticateToken from '../authenticateToken'
import { deleteCard, searchCards, upsertCard } from '../services/cardService'
import { ApiCard } from '../api/scryfall/cardSearch'

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
// TODO better send acording to service result
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
    const result = await searchCards(req.query.q, req.user?.id)
    res.send(result)
  },
)

router.post('/upsert', authenticateToken, (req: Request, res: Response<ApiCard>) => {
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
  (req: RequestQuery<DeleteQuery>, res: Response) => {
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
