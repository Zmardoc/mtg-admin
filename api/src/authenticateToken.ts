import dotenv from 'dotenv'
import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { secretKey } from './config/sekretKey'

dotenv.config() // TODO mozna byt nemusi

/* export interface CustomRequest extends Request {
  token: string | JwtPayload
} */
type LoggedUser = {
  id: string
  username: string
  iat: number
  exp: number
}

function authenticateToken(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '')
    if (!token) {
      return res.status(401).json({ message: 'Token missing' })
    }

    const decoded = jwt.verify(token, secretKey)

    req.user = decoded as LoggedUser

    next()
  } catch (err) {
    res.status(401).json({ message: 'Koukej se přihlásit zmrde' })
  }
}

export default authenticateToken

export type { LoggedUser }
