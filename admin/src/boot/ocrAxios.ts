import { boot } from 'quasar/wrappers'
import axios from 'axios'

const ocrApi = axios.create({
  baseURL: process.env.OCR_API,
  headers: {
    'Content-Type': 'application/json',
    apiKey: process.env.OCR_API_KEY,
  },
})

// eslint-disable-next-line @typescript-eslint/no-empty-function
export default boot(({}) => {})

export { ocrApi }
