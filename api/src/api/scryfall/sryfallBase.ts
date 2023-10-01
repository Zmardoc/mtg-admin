import axios from 'axios'

const sryfallBase = axios.create({
  baseURL: 'https://api.scryfall.com',
})

export default sryfallBase
