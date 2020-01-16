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
import Switch from 'components/switch'
import Carousel from 'components/carousel'
import CarouselItem from 'components/carousel-item'
import Input from 'components/input'
import Pagination from 'components/pagination'
import Radio from 'components/radio/radio'
import RadioButton from 'components/radio/radio-button'
import RadioGroup from 'components/radio/radio-group'
import ColorPicker from 'components/color-picker'
import Checkbox from 'components/checkbox'
import CheckboxGroup from 'components/checkbox-group'
import CheckButton from 'components/checkbox-button'
import Tree from 'components/tree'
import Backtop from 'components/backtop'
import Form from 'components/form'
import FormItem from 'components/form-item'
import Table from 'components/table'
import TableColumn from 'components/table-column'
import Transfer from 'components/transfer'
import TransferCombine from 'components/transfer-combine'

import locale from 'locale'

import PopTipDirective from 'components/pop-tip/directive'
import LoadingDirective from 'components/loading/directive'

import LoadingService from 'components/loading'

const cfg = require('component-cfg')

const version = '{{pkgVersion}}'

if (window.Vue) {
  window.Vue.prototype.cfg = cfg
}

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
  BreadcrumbItem,
  Switch,
  Carousel,
  CarouselItem,
  Input,
  Pagination,
  Radio,
  RadioButton,
  RadioGroup,
  ColorPicker,
  Checkbox,
  CheckboxGroup,
  CheckButton,
  Tree,
  Backtop,
  Tree,
  Backtop,
  Form,
  FormItem,
  Table,
  TableColumn,
  Transfer,
  TransferCombine
]

const directives = [
  PopTipDirective,
  LoadingDirective
]

const services = [
  LoadingService
]

const install = function (Vue, opts = {}) {
  locale.use(opts.locale)
  locale.i18n(opts.i18n)

  components.forEach((component) => {
    // component.name = `${cfg.componentPrefix}${component.name}`
    Vue.component(`${cfg.componentPrefix}${component.name}`, component)
  })

  directives.forEach((directive) => {
    Vue.directive(directive.name, directive);
  })

  services.forEach((service) => {
    Vue['prototype'][`$${service.name}`] = service.method
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
  version: version,
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
  BreadcrumbItem,
  Switch,
  Carousel,
  CarouselItem,
  Input,
  Pagination,
  ColorPicker,
  Tree,
  Backtop,
  Checkbox,
  CheckboxGroup,
  CheckButton,
  Form,
  FormItem,
  Table,
  TableColumn,
  Transfer,
  TransferCombine
}
