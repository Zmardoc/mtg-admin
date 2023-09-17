import axios from 'axios'

const sryfallApi = axios.create({
  baseURL: 'https://api.scryfall.com',
})

export default sryfallApi
