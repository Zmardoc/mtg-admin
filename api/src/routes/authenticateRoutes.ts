// #swagger.autoBody=true
import type { Request, Response, Application } from 'express'
import bcrypt from 'bcrypt'

import jwt from 'jsonwebtoken'
import authenticateToken from '../authenticateToken'
import { User, findUser, insertUser } from '../database/users'
import { secretKey } from '../config/sekretKey'

// TODO send error when something occures
export default function (app: Application) {
  app.post('/login', async (req: Request, res: Response) => {
    const { username, password } = req.body

    const user = await findUser(username)
    if (!user) {
      return res.status(401).json({ message: 'Login failed' })
    }
    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Login failed' })
    }

    const token = jwt.sign({ id: user._id, username: user.username }, secretKey, {
      expiresIn: '1h',
    })

    res.json({ token, user })
  })

  app.get('/login-check', authenticateToken, (_: Request, res: Response) => {
    res.status(200)
  })

  app.post('/register', async (req, res) => {
    const { username, password } = req.body
    const existingUser = await findUser(username)

    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser: User = { username, password: hashedPassword }
    const id = await insertUser(newUser)

    // Vytvoření JWT tokenu pro nově registrovaného uživatele
    const token = jwt.sign({ id, username: newUser.username }, secretKey, {
      expiresIn: '1h',
    })

    res.status(201).json({ token })
  })
}
