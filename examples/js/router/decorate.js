import navigatorList from '../app/navigator-list'

const MenuRoutes = {
  Principle: () => import(/* webpackChunkName: "DocPrinciple" */ 'docs/Principle.md'),
  Layout: () => import(/* webpackChunkName: "DocLayout" */ 'docs/layout/index.md'),
  Grid: () => import(/* webpackChunkName: "DocGrid" */ 'docs/grid/index.md'),
  Button: () => import(/* webpackChunkName: "DocButton" */ 'docs/button/index.md'),
  Menu: () => import(/* webpackChunkName: "DocMenu" */ 'docs/menu/index.md'),
  Breadcrumb: () => import(/* webpackChunkName: "DocBreadcrumb" */ 'docs/breadcrumb/index.md'),
  GlobalSpacing: () => import(/* webpackChunkName: "GlobalSpacing" */ 'docs/global-spacing/index.md'),
  Color: () => import(/* webpackChunkName: "Color" */ 'docs/color/index.md'),
  Font: () => import(/* webpackChunkName: "Font" */ 'docs/font/index.md'),
  Theme: () => import(/* webpackChunkNmae: "Theme" */ 'docs/theme/index.md'),
  Icon: () => import(/* webpackChunkNmae: "Icon" */ 'docs/icon/index.md'),
  Tab: () => import(/* webpackChunkName: "DocTab" */ 'docs/tabs/index.md'),
  PopTip: () => import(/* webpackChunkName: "DocPopover" */ 'docs/pop-tip/index.md'),
  Dropdown: () => import(/* webpackChunkName: "DocDropdown" */ 'docs/dropdown/index.md')
}

function decorateRouteItem(item) {
  // TODO Why the belows code met the ensure is not a function error
  // item.component = r => require.ensure([], () => r(require(`../../docs/${item.component}.md`)), item.component)
  item.component = MenuRoutes[item.component]
  return item
}

function routeNavLoop(data, newRoutes) {
  data.forEach((item) => {
    if (item.component) {
      item = decorateRouteItem(item)
      newRoutes.push(item)
    }
    if (item.children && item.children.length > 0) {
      routeNavLoop(item.children, newRoutes)
    }
  })
}

export function getRouteFromNav() {
  const newList = JSON.parse(JSON.stringify(navigatorList))
  const newRoutes = []
  routeNavLoop(newList, newRoutes)
  return newRoutes
}

export function resetContentScroll() {
  const outer = document.querySelector('.router-content')
  if (outer) {
    outer.scrollTop = 0
  }
}

export function getDocPageList() {
  return MenuRoutes
}
