import { boot } from 'quasar/wrappers'
import axios from 'axios'
import { Cookies } from 'quasar'
import { cookieTokenKey } from '@/queries/useLoginQuery'

const mtgApi = axios.create({
  baseURL: process.env.MTG_API,
})

export default boot(({ router }) => {
  mtgApi.interceptors.request.use((config) => {
    console.log('interceptors.request.use')
    const token = Cookies.get(cookieTokenKey)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  })

  mtgApi.interceptors.response.use(
    (response) => response,
    (error) => {
      if ([401, 403].includes(error.response.status)) {
        router.push({ name: 'login' })
      }
      return Promise.reject(error)
    }
  )
})

export { mtgApi }
