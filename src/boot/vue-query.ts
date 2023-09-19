import { boot } from 'quasar/wrappers'
import { VueQueryPlugin } from '@tanstack/vue-query'
import queryClient from '@/config/query'

export default boot(({ app }) => {
  app.use(VueQueryPlugin, { queryClient })
})
