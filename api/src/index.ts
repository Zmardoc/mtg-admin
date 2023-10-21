import express, { type Express } from 'express'
import dotenv from 'dotenv'
import defineRoutes from './routes/routes'
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from './swagger_output.json'
import cors from 'cors'
import { openConnection } from './database/mongoClient'

dotenv.config()

const port = process.env.PORT ? parseInt(process.env.PORT) : 8000
const app: Express = express()

app.use((req, res, next) => {
  // For example, a GET request to `/test` will print "GET /test"
  console.log(`${req.method} ${req.url}`)

  next()
})

app.use(
  cors({
    origin: '*', // TODO change to env
  }),
)

app.use(express.json())

app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

defineRoutes(app)

openConnection()

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}/api`) //TODO brat z env
})
