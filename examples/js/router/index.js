/* global Vue, VueRouter, hljs */

import { getRouteFromNav, resetContentScroll, getDocPageList } from './decorate'

const ErrorPage = () => import(/* webpackChunkName: "Error" */ 'pages/error')

const decorateRoutes = getRouteFromNav()
const { Principle } = getDocPageList()

let routes = [
  { path: '/', component: Principle },
  { path: '/#/', component: Principle },
  { path: '/home', component: Principle }
]
routes = routes.concat(decorateRoutes)
routes.push({ path: '*', component: ErrorPage })

const router = new VueRouter({ routes })

router.beforeEach((to, from, next) => {
  resetContentScroll()
  next()
})

router.afterEach(() => {
  Vue.nextTick(() => {
    const blocks = document.querySelectorAll('pre code')
    blocks.forEach((block) => {
      hljs.highlightBlock(block)
    })
  })
})

export default router
