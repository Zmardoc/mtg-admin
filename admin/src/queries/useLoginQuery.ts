import { mtgPost } from '@/api/mtgApi'
import useNotify from '@/composables/useNotify'
import { useMutation } from '@tanstack/vue-query'
import { Cookies } from 'quasar'

type User = {
  username: string
  password: string
}

type ResponseToken = {
  token: string
}

const cookieTokenKey = 'jwt'

function useLoginQuery(onSuccess: () => void) {
  const { notifyWelcome, notifyError } = useNotify()

  function postLogin(user: User) {
    return mtgPost<ResponseToken>('/login', user)
  }

  const { mutate } = useMutation({
    mutationFn: (user: User) => postLogin(user),
    onSuccess: (data) => {
      if (data?.token) {
        Cookies.set(cookieTokenKey, data.token, { expires: 7 })

        notifyWelcome('Welcome to the dungeon, Master!')
        onSuccess()
      }
    },
    onError: () => {
      notifyError('Login failed')
    },
  })

  function login(user: User) {
    mutate(user)
  }

  return { login }
}

export { cookieTokenKey, useLoginQuery }
