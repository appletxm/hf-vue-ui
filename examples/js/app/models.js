import navigatorList from './navigator-list'

function matchedSubItem (path, data, res) {
  data.forEach(item => {
    if (item.path === path) {
      res.push(item)
    } 
    
    if (item.children && item.children.length > 0) {
      matchedSubItem(path, item.children, res)
    }
  })
}

export function getNavigatorList () {
  return navigatorList
}

export function matchedNavItem (moduleName, nav) {
  let returnItem = []
  nav.forEach(item => {
    if (item.module === moduleName) {
      returnItem = item.children || []
    }
  })

  return returnItem
}

// export function getSubHighLightItem (subNavList) {
//   let resItem = []
//   if (subNavList.length === 0) {
//     return resItem
//   }
//   matchedSubItemHigh(subNavList, resItem)
//   return resItem
// }

export function matchModuleFromUrl (path, navigatorList) {
  let res = []
  matchedSubItem(path, navigatorList, res)

  return res
}
