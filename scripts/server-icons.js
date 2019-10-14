const path = require('path')
const fs = require('fs')

const srcPath = './src/theme/iconfont.css'

function getIcons(req, res) {
  const iconCssFile = fs.readFileSync(path.resolve(srcPath), 'utf8')
  const reg = /\ui-icon-[^\:\;\}\]\]\"]+/g
  const matchObj = iconCssFile.match(reg)
  let resIconList = []

  matchObj.forEach(item => {
    resIconList.push({
      label: item,
      class: item
    })
  })

  res.set('content-type', 'application/json')
  res.send(JSON.stringify({
    code: 200,
    icons: resIconList
  }))
}

module.exports = {
  getIcons
}
