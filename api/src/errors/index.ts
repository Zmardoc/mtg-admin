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

const missingOcrImage: ErrorResponse = {
  status: 400,
  code: 'MISSING_OCR_IMAGE',
  details: 'Missing OCR image',
}

function getOcrError(error: unknown): ErrorResponse {
  return {
    status: 500,
    code: 'ocr_server_error',
    details: 'Something went wrong on my poor, poor server when calling ocr api.',
    stack: error,
  }
}

function getUnknownError(error: unknown): ErrorResponse {
  return {
    status: 500,
    code: 'UNKNOWN_ERROR',
    details: 'Unknown error',
    stack: error,
  }
}

function setError(res: Response, error: ErrorResponse) {
  res.status(error.status).json(error)
}

function isError(error: ErrorResponse | unknown): error is ErrorResponse {
  return !!(typeof error === 'object' && error && 'status' in error)
}

export {
  isError,
  setError,
  getUnknownError,
  getOcrError,
  missingSecretEnv,
  loginFailed,
  userAlreadyExists,
  tokenMissing,
  notLoggedIn,
  missingOcrImage,
}
