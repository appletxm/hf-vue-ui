/* global Vue */
// import uiAdapt from 'utils/mobile-adapt'
import styles from '../css/index.scss'
import router from './router'
import { setInitialStates } from './store/state'
import { getStore } from './store'
import App from './app'
import Components from 'hf-ui'

console.info(Components)

const { appPrefix } = styles
const state = setInitialStates({ appPrefix })
const store = getStore(state)

// uiAdapt(window, document, 750)

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
