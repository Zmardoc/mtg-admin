import dotenv from 'dotenv'
import { NextFunction, Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { secretKey } from './config/sekretKey'

dotenv.config() // TODO mozna byt nemusi

export interface CustomRequest extends Request {
  token: string | JwtPayload
}

function authenticateToken(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '')
    if (!token) {
      return res.status(401).json({ message: 'Token missing' })
    }

    const decoded = jwt.verify(token, secretKey)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    req.token = decoded

    next()
  } catch (err) {
    res.status(401).json({ message: 'Koukej se přihlásit zmrde' })
  }
}

export default authenticateToken
