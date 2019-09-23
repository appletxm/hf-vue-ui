/* global window */
import './theme/index.scss'
import Button from 'components/button'
import locale from 'locale'

const cfg = require('component-cfg')

const components = [
  Button
]

const install = function (Vue, opts = {}) {
  locale.use(opts.locale)
  locale.i18n(opts.i18n)

  components.forEach((component) => {
    component.name = `${cfg.componentPrefix}${component.name}`
    Vue.component(component.name, component)
  })

  Vue['prototype'][cfg.componentPrefix] = {
    size: opts.size || '',
    zIndex: opts.zIndex || 2000
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  version: '1.0.0',
  locale: locale.use,
  i18n: locale.i18n,
  Button
}