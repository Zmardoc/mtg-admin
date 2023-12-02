// #swagger.autoBody=true
import type { Application } from 'express'
import express from 'express'
import authorizationRoutes from './authorizationRoutes'
import cardRoutes from './cardRoutes'
import ocrRoutes from './ocrRoutes'

// TODO send error when something occures
export default function (app: Application) {
  // TODO swagger nedava example
  app.use('/api/authorization', authorizationRoutes)
  app.use('/api/card', cardRoutes)
  app.use('/api/ocr', ocrRoutes)
  app.use(express.static('public'));
}
