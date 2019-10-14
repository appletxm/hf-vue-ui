function getSkipIndexList(matchName, navList, indexList) {
  navList.forEach((nav, index) => {
    if (matchName === nav.module.toLowerCase()) {
      indexList.push(index)
    } else {
      if (nav.children && nav.children.length > 0) {
        getSkipIndexList(matchName, nav.children, indexList)
      }
    }
  })
}

export function matchIndexListFromPath(path, navList) {
  const indexList = []
  const fullModuleName = path.replace(/\//g, '_').substr(1, path.length - 1)
  const splitName = fullModuleName.split('_')
  let matchName = ''

  splitName.forEach((name, index) => {
    if (index === 0) {
      matchName = name
    } else {
      matchName = matchName + '_' + name
    }
    getSkipIndexList(matchName, navList, indexList)
  })
  return indexList
}

export function matchedPosItems(pos, navList) {
  if (!pos) {
    return {}
  }

  const posIndexs = pos.split('_')
  let loopItems = navList
  let matchedItem

  posIndexs.forEach((item) => {
    const tmpItem = loopItems[item]
    if (tmpItem && tmpItem.children && tmpItem.children.length > 0) {
      loopItems = tmpItem.children
    } else {
      matchedItem = tmpItem
    }
  })

  return matchedItem
}
