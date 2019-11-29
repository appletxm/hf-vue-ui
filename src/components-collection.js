/* global window */
import Button from 'components/button'
import ButtonGroup from 'components/button-group'
import Header from 'components/header'
import Content from 'components/content'
import Footer from 'components/footer'
import Aside from 'components/aside'
import Main from 'components/main'
import Layout from 'components/layout'
import Row from 'components/row'
import Col from 'components/col'
import CustomH from 'components/h'
import Icon from 'components/icon'
import PopTip from 'components/pop-tip'
import DropdownItem from 'components/dropdown-item'
import DropdownMenu from 'components/dropdown-menu'
import Dropdown from 'components/dropdown'
import MenuItem from 'components/menu-item'
import MenuItemGroup from 'components/menu-item-group'
import Submenu from 'components/submenu'
import Menu from 'components/menu'
import MenuBar from 'components/menubar'
import Tabs from 'components/tabs'
import TabPane from 'components/tab-pane'
import Breadcrumb from 'components/breadcrumb'
import BreadcrumbItem from 'components/breadcrumb-item'
import locale from 'locale'

import PopTipDirective from 'components/pop-tip/directive'

const cfg = require('component-cfg')

window.Vue.prototype.cfg = cfg

const components = [
  Button,
  ButtonGroup,
  Header,
  Content,
  Footer,
  Aside,
  Main,
  Layout,
  Row,
  Col,
  CustomH,
  Icon,
  PopTip,
  DropdownItem,
  DropdownMenu,
  Dropdown,
  MenuItem,
  MenuItemGroup,
  Submenu,
  Menu,
  MenuBar,
  Tabs,
  TabPane,
  Breadcrumb,
  BreadcrumbItem
]

const directives = [
  PopTipDirective
]

const install = function (Vue, opts = {}) {
  locale.use(opts.locale)
  locale.i18n(opts.i18n)

  components.forEach((component) => {
    component.name = `${cfg.componentPrefix}${component.name}`
    Vue.component(component.name, component)
  })
  directives.forEach((directive) => {
    Vue.directive(directive.name, directive);
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
  Button,
  ButtonGroup,
  Header,
  Footer,
  Aside,
  Main,
  Layout,
  Row,
  Col,
  CustomH,
  Icon,
  PopTip,
  DropdownItem,
  DropdownMenu,
  Dropdown,
  MenuItem,
  MenuItemGroup,
  Submenu,
  Menu,
  MenuBar,
  Tabs,
  TabPane,
  Breadcrumb,
  BreadcrumbItem
}
