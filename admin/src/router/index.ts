import { route } from 'quasar/wrappers'
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router'

import routes from './routes'
import { mtgGet } from '@/api/mtgApi'

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
    ? createWebHistory
    : createWebHashHistory

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  })

  Router.beforeResolve(async (to, from, next) => {
    //TODO tohle je nahovno pac kdyz to dostane 40x tak se to redirectuje pred nextem
    if (to.name !== 'login') {
      try {
        await mtgGet('/login-check')
        next()
      } catch (e) {
        next({
          name: 'login',
          params: { logout: 'logout', cardSearch: to.params.cardSearch },
        })
      }
    } else {
      next()
    }
  })

  return Router
})
