const fs = require('fs')
const path = require('path')
const { exec } = require('child_process')
const { copyFolder, checkDirIsOk } = require('./sync-copy-files')
const cfg = require('../config/component.config')

const tempSrc = path.resolve('./themes')
const globalFilePath = path.resolve(tempSrc + '/globals.scss')
const indexFilePath = path.resolve(tempSrc + '/index.scss')

function copyFolderForTheme() {
  checkDirIsOk(tempSrc)
  copyFolder(path.resolve('./src/theme'), tempSrc)
}

function doGenerateGlobalFile(globals) {
  let globaFile = fs.readFileSync(globalFilePath, 'utf8')
  globals.forEach(item => {
    let key = '$' + (item.key.replace(/_/g, '-'))
    let matchReg = new RegExp(`(\\${key}\\:\\s*)([^\\:;]+)`, 'g')
    globaFile = globaFile.replace(matchReg, ($1, $2, $3) => {
      if ($3 === item.color) {
        return  $2 + $3
      } else {
        return  $2 + item.color
      }
    })
  })

  fs.writeFileSync(globalFilePath, globaFile, {encoding: 'utf8'})
}

function doGenerateIndexFile() {
  let indexFile = fs.readFileSync(indexFilePath, 'utf8')
  indexFile = indexFile.replace(/\.\.\//g, '../src/')
  fs.writeFileSync(indexFilePath, indexFile, {encoding: 'utf8'})
}

function doOutputTheme() {
  let promise
  promise = new Promise((resolve) => {
    const ouputFile = `./dist/user-theme/${cfg.prefix}.min.css`
    const cmd = `npm run generatorTheme`
    exec(cmd, (error) => {
      if (error) {
        throw 'Compile scss to css failed'
      } else {
        resolve(ouputFile)
      }
    })
  })

  return promise
}

function addReqListener(req, cbFn) {
  let body = ''
  req.on('data', (reqStr) => {
    body+=reqStr
  })

  req.on('end', () => {
    if (cbFn && typeof cbFn === 'function') {
      cbFn(body)
    }
  })
}

function generateTheme(req, res) {
  try {
    addReqListener(req, (body) => {
      let params = body && JSON.parse(body)
      if (params && params.length > 0) {
        copyFolderForTheme()
        doGenerateGlobalFile(params)
        doGenerateIndexFile()
        doOutputTheme().then(filePath => {
          res.set('content-type', 'application/json')
          res.send(JSON.stringify({
            code: 200,
            cssFilePath: filePath
          }))
        }).catch(err => {
          throw err
        })
      }
    })
  } catch (err) {
    console.info('Your parameters got some problem, please check: ', err)
    res.send(err)
    res.end()
  }
 
}

module.exports = {
  addReqListener,
  generateTheme
}
