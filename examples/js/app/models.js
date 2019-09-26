import navigatorList from './navigator-list'

function matchedSubItem(path, data, res) {
  data.forEach((item) => {
    if (item.path === path) {
      res.push(item)
    }
    if (item.children && item.children.length > 0) {
      matchedSubItem(path, item.children, res)
    }
  })
}

export function getNavigatorList() {
  return navigatorList
}

export function matchedNavItem(moduleName, nav) {
  let returnItem = []
  nav.forEach((item) => {
    if (item.module === moduleName) {
      returnItem = item.children || []
    }
  })

  return returnItem
}

export function matchModuleFromUrl(path, navigatorList) {
  /* eslint-disable prefer-destructuring */
  const res = []
  const resObj = {
    currentModuleName: '',
    currentSubModuleName: ''
  }
  matchedSubItem(path, navigatorList, res)
  if (res.length > 0) {
    const moduleName = res[res.length - 1]['module']
    const splitOjb = moduleName.split('_')
    resObj.currentModuleName = splitOjb[0]
    resObj.currentSubModuleName = moduleName
  }
  return resObj
  /* eslint-enable prefer-destructuring */
}
