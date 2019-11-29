const fs = require('fs')
const path = require('path')
const MAX_MINOR_NUMBER = 100
const MAX_MIDDLE_NUMBER = 100

function getVerionNo(versionNo) {
  if (versionNo) {
    return versionNo
  }
  const pkgFileObj = JSON.parse(fs.readFileSync(path.resolve('./package.json')))
  const { version } = pkgFileObj
  const numbs = version.split('.')
  numbs[2] = Number(numbs[2]) + 1
  if (numbs[2] > MAX_MINOR_NUMBER) {
    numbs[2] = 0
    numbs[1] = Number(numbs[1]) + 1
  }
  if (numbs[1] > MAX_MIDDLE_NUMBER) {
    numbs[1] = 0
    numbs[0] = Number(numbs[0]) + 1
  }
  return numbs.join('.')
}

module.exports = {
  getVerionNo
}
