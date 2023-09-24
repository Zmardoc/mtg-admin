import axios from 'axios'

const mtgApi = axios.create({
  baseURL: 'http://localhost:8000', // TODO add to env
})

export default mtgApi
