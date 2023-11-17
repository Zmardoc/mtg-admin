import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    redirect: '/search',
    children: [
      {
        path: '/search',
        name: 'index',
        props: true,
        component: () => import('pages/IndexPage.vue'),
      },
    ],
  },
  {
    path: '/scanner',
    name: 'scanner',
    component: () => import('pages/ScannerPage.vue'),
  },
  {
    path: '/login',
    name: 'login',
    props: true,
    component: () => import('pages/LoginPage.vue'),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
