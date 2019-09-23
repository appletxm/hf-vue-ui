/* global window */
import './theme/index.scss'
import Button from 'components/button'

const cfg = require('cfg')

const components = [
  Button
]

const install = function (Vue, opts = {}) {
  components.forEach((component) => {
    Vue.component(component.name, component)
  })

  Vue['prototype'][cfg.prefix] = {
    size: opts.size || '',
    zIndex: opts.zIndex || 2000
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export {
  Button
}
