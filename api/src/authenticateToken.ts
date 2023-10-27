import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { secretKey } from './config/configEnv'
import { getError, missingSecretEnv, notLoggedIn, tokenMissing } from './errors'

type LoggedUser = {
  id: string
  username: string
  iat: number
  exp: number
}

function authenticateToken(req: Request, res: Response, next: NextFunction) {
  try {
    if (!secretKey) return getError(res, missingSecretEnv)

    const token = req.headers.authorization?.replace('Bearer ', '')
    if (!token) return getError(res, tokenMissing)

    const decoded = jwt.verify(token, secretKey)

    req.user = decoded as LoggedUser

    next()
  } catch (err) {
    return getError(res, notLoggedIn)
  }
}

export default authenticateToken
export type { LoggedUser }
