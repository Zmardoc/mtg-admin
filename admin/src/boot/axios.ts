import { boot } from 'quasar/wrappers'
import axios from 'axios'
import { Cookies } from 'quasar'
import { COOKIE_TOKEN_KEY } from '@/config/cookieTokenKey'

const mtgApi = axios.create({
  baseURL: process.env.MTG_API,
})

export default boot(({ router }) => {
  mtgApi.interceptors.request.use((config) => {
    const token = Cookies.get(COOKIE_TOKEN_KEY)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  })

  mtgApi.interceptors.response.use(
    (response) => response,
    (error) => {
      if ([401, 403].includes(error.response.status)) {
        router.push({
          name: 'login',
          params: {
            logout: 'logout',
            cardSearch: router.currentRoute.value.params.cardSearch,
          },
        })
      }
      return Promise.reject(error)
    }
  )
})

export { mtgApi }
