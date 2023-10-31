import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { secretKey } from './config/configEnv'
import { setError, missingSecretEnv, notLoggedIn, tokenMissing } from './errors'

type LoggedUser = {
  id: string
  username: string
  iat: number
  exp: number
}

function authenticateToken(req: Request, res: Response, next: NextFunction) {
  try {
    if (!secretKey) {
      setError(res, missingSecretEnv)
      return
    }

    const token = req.headers.authorization?.replace('Bearer ', '')
    if (!token) {
      setError(res, tokenMissing)
      return
    }

    const decoded = jwt.verify(token, secretKey)

    req.user = decoded as LoggedUser

    next()
  } catch (err) {
    setError(res, notLoggedIn)
  }
}

export default authenticateToken
export type { LoggedUser }
