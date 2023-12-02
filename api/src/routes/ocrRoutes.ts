// #swagger.autoBody=true
import { type Request, type Response, Router } from 'express'

import { ApiCard } from '../api/scryfall/cardSearch'
import scanCard from '../services/ocrService'
import { ErrorResponse } from '../api/types'
import authenticateToken from '../authenticateToken'

const router = Router()

router.post(
  '/scan',
  authenticateToken,
  async (req: Request, res: Response<ApiCard | null | ErrorResponse>) => {
    //TODO swagger, better res.send

    const result = await scanCard(req.body.imageBase64, req.user?.id)
    console.log(result)
    res.send(result)
  },
)

export default router
