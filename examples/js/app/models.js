import navigatorList from './navigator-list'

export function getNavigatorList() {
  return navigatorList
}

export function matchedNavItem(moduleName, nav) {
  let returnItem = []
  
  nav.forEach(item => {
    if (item.module === moduleName) {
      returnItem = item.children || []
    }
  })

  return returnItem
}
