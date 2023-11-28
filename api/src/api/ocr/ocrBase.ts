import axios from 'axios'
import { ocrApi, ocrApiKey } from '../../config/configEnv'

const ocrBase = axios.create({
  baseURL: ocrApi,
  headers: {
    'Content-Type': 'multipart/form-data',
    apiKey: ocrApiKey,
  },
})

export default ocrBase
