/* global Vue, VueRouter, hljs */

import { getRouteFromNav, resetContentScroll } from './decorate'

const Home = () => import(/* webpackChunkName: "Home" */ 'pages/home')
const About = () => import(/* webpackChunkName: "Home" */ 'pages/about')
const ErrorPage = () => import(/* webpackChunkName: "Error" */ 'pages/error')
const DocTest = () => import(/* webpackChunkName: "DocTest" */ 'docs/test.md')

const decorateRoutes = getRouteFromNav()

let routes = [
  { path: '/', component: DocTest },
  { path: '/#/', component: Home },
  { path: '/home', component: Home },
  { path: '/about', component: About }
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
