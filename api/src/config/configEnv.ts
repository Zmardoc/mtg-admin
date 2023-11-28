import dotenv from 'dotenv'

dotenv.config()

const secretKey = process.env.API_KEY
const port = process.env.PORT
const connectionString = process.env.MONGO_DB
const ocrApi = process.env.OCR_API
const ocrApiKey = process.env.OCR_API_KEY

export { secretKey, port, connectionString, ocrApi, ocrApiKey }
