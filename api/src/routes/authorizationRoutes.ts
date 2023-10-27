// #swagger.autoBody=true
import { type Request, type Response, Router } from 'express'
// TODO swagger description
import authenticateToken from '../authenticateToken'
import { login, loginCheck, register } from '../services/authorizationService'

const router = Router()

router.post('/login', async (req: Request, res: Response) => {
  login(req, res)
})

router.get('/login-check', authenticateToken, (_: Request, res: Response) => {
  loginCheck(res)
})

router.post('/register', async (req, res) => {
  register(req, res)
})

export default router
