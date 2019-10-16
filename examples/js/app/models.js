import navigatorList from './navigator-list'

function matchedSubItem(path, data, res) {
  data.forEach((item, index) => {
    if (item.path === path) {
      res.moduleList.push(item)
      res.indexList.push(index)
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
  const res = {
    indexList: [],
    moduleList: []
  }
  const resObj = {
    currentModuleName: '',
    currentSubModuleName: ''
  }
  matchedSubItem(path, navigatorList, res)
  if (res.moduleList.length > 0) {
    const moduleName = res['moduleList'][res.moduleList.length - 1]['module']
    const splitOjb = moduleName.split('_')
    resObj.currentModuleName = splitOjb[0]
    resObj.currentSubModuleName = moduleName
  }
  return { ...resObj, ...res }
  /* eslint-enable prefer-destructuring */
}
