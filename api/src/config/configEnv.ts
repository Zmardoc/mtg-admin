import dotenv from 'dotenv'

dotenv.config()

const secretKey = process.env.API_KEY
const port = process.env.PORT
const connectionString = process.env.MONGO_DB

export { secretKey, port, connectionString }
