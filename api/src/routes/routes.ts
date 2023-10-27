// #swagger.autoBody=true
import type { Application } from 'express'
import authorizationRoutes from './authorizationRoutes'
import cardRoutes from './cardRoutes'

// TODO send error when something occures
export default function (app: Application) {
  // TODO swagger nedava example

  app.use('/authorization', authorizationRoutes)
  app.use('/card', cardRoutes)
}
