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

export function getPreviousAndNext(indexList, navList) {
  console.info(indexList, navList)
  const skipGuide = {
    pre: '',
    next: ''
  }

  if (indexList.length <= 1) {
    return skipGuide
  }

  // const lastIndex = indexList[indexList.length - 1]
  // const tmpArra = JSON.parse(JSON.stringify(indexList))
  // const str = tmpArra.pop().map((item) => `[${item}]`).join('')

  // console.info(lastIndex, str)

  // const indexList = []

  // if (!moduleName || moduleName === subModuleName) {
  //   return skipGuide
  // }
  // getSkipIndexList(moduleName, navList, indexList)

  return skipGuide
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

  console.info(indexList)
}
