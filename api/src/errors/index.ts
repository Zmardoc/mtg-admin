import { Response } from 'express'
import { ErrorResponse } from '../api/types'

const tokenMissing: ErrorResponse = {
  status: 401,
  code: 'MISSING_TOKEN',
  details: 'JWT token missing',
}

const loginFailed: ErrorResponse = {
  status: 401,
  code: 'LOGIN_FAILED',
  details: 'Login failed',
}

const notLoggedIn: ErrorResponse = {
  status: 401,
  code: 'NOT_LOGGED_IN',
  details: 'User not logged in',
}

const userAlreadyExists: ErrorResponse = {
  status: 409,
  code: 'USER_ALERADY_EXISTS',
  details: 'User already exists',
}

const missingSecretEnv: ErrorResponse = {
  status: 500,
  code: 'MISSING_SECRET_KEY_ENV',
  details: 'Env secret key missing',
}

function setUnknownError(res: Response, error: unknown) {
  const unknownError: ErrorResponse = {
    status: 500,
    code: 'UNKNOWN_ERROR',
    details: 'Unknown error',
    stack: error,
  }
  setError(res, unknownError)
}

function setError(res: Response, error: ErrorResponse) {
  res.status(error.status).json(error)
}

export {
  setError,
  setUnknownError,
  missingSecretEnv,
  loginFailed,
  userAlreadyExists,
  tokenMissing,
  notLoggedIn,
}
