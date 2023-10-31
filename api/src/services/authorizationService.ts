// #swagger.autoBody=true
import { type Request, type Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { User, findUser, insertUser } from '../database/users'
import { secretKey } from '../config/configEnv'
import { setError, loginFailed, missingSecretEnv, userAlreadyExists } from '../errors'

async function login(req: Request, res: Response) {
  if (!secretKey) {
    setError(res, missingSecretEnv)
    return
  }

  const { username, password } = req.body
  const user = await findUser(username)

  if (!user) {
    setError(res, loginFailed)
    return
  }

  const passwordMatch = await bcrypt.compare(password, user.password)

  if (!passwordMatch) {
    setError(res, loginFailed)
    return
  }

  const token = jwt.sign({ id: user._id, username: user.username }, secretKey, {
    expiresIn: '1h',
  })

  res.json({ token, user })
}

function loginCheck(res: Response) {
  res.status(200).json({ message: 'Login successful' })
}

async function register(req: Request, res: Response) {
  if (!secretKey) {
    setError(res, missingSecretEnv)
    return
  }

  const { username, password } = req.body
  const existingUser = await findUser(username)

  if (existingUser) {
    setError(res, userAlreadyExists)
    return
  }

  const hashedPassword = await bcrypt.hash(password, 10)
  const newUser: User = { username, password: hashedPassword }
  const id = await insertUser(newUser)

  // Vytvoření JWT tokenu pro nově registrovaného uživatele
  const token = jwt.sign({ id, username: newUser.username }, secretKey, {
    expiresIn: '1h',
  })

  res.status(201).json({ token })
}

export { login, loginCheck, register }
