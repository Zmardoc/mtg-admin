import { mtgPost } from '@/api/mtgApi'
import useNotify from '@/composables/useNotify'
import useRedirect from '@/composables/useRedirect'
import { COOKIE_TOKEN_KEY } from '@/config/cookieTokenKey'
import { useMutation } from '@tanstack/vue-query'
import { Cookies } from 'quasar'

type User = {
  username: string
  password: string
}

type ResponseToken = {
  token: string
}

function useLoginQuery() {
  const { notifyWelcome, notifyError } = useNotify()
  const { redirectToDashboard } = useRedirect()

  async function postLogin(user: User) {
    try {
      const data = await mtgPost<ResponseToken>('/authorization/login', user)
      if (data?.token) {
        Cookies.set(COOKIE_TOKEN_KEY, data.token, { expires: 7 })

        notifyWelcome('Welcome to the dungeon, Master!')
        redirectToDashboard()
      } else {
        notifyError('Login failed')
      }
      return data
    } catch (error) {
      notifyError('Login failed')
    }
  }

  return useMutation({
    mutationFn: postLogin,
  })
}

export default useLoginQuery
