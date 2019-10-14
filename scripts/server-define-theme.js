const fs = require('fs')
const path = require('path')
const { zip } = require('zip-a-folder')
const { exec, spawn } = require('child_process')
const { copyFolder, checkDirIsOk } = require('./sync-copy-files')
const cfg = require('../config/component.config')

const webpack = require('webpack')
const { getConfig } = require('../config/webpack.config.component.theme.prod.js')

const tempSrc = `${cfg.userDefineTheme.src}/{ipAddress}`
const globalFilePath = tempSrc + '/globals.scss'
const indexFilePath = tempSrc + '/index.scss'

function replaceIpAdress(str, ipAddress) {
  const fileName = str.replace('{ipAddress}', ipAddress)
  return fileName
}

function copyFolderForTheme(ipAddress) {
  const fullPath = replaceIpAdress(tempSrc, ipAddress)
  checkDirIsOk(fullPath)
  copyFolder(path.resolve('./src/theme'), fullPath)
}

function doGenerateGlobalFile(globals, ipAddress) {
  const globalFullPath = replaceIpAdress(globalFilePath, ipAddress)
  let globaFile = fs.readFileSync(globalFullPath, 'utf8')
  
  globals.forEach(item => {
    let key = '$' + (item.key.replace(/_/g, '-')) + '-color'
    let matchReg = new RegExp(`(\\${key}\\:\\s*)([^\\:;]+)`, 'g')
    globaFile = globaFile.replace(matchReg, ($1, $2, $3) => {
      if ($3 === item.color) {
        return  $2 + $3
      } else {
        return  $2 + item.color
      }
    })
  })
  fs.writeFileSync(globalFullPath, globaFile, {encoding: 'utf8'})
}

function doGenerateIndexFile(ipAddress) {
  const indexFileFullPath = replaceIpAdress(indexFilePath, ipAddress)
  let indexFile = fs.readFileSync(indexFileFullPath, 'utf8')
  indexFile = indexFile.replace(/\.\.\//g, '../../../src/')
  fs.writeFileSync(indexFileFullPath, indexFile, {encoding: 'utf8'})
}

function doOutputTheme(ipAddress) {
  // let promise
  // promise = new Promise((resolve) => {
  //   const ouputFile = `./tmp/out-theme/${ipAddress}/${cfg.prefix}.min.css`
  //   const cmd = `npm run generatorTheme`
  //   exec(cmd, (error) => {
  //     if (error) {
  //       console.info(error)
  //       throw 'Compile scss to css failed'
  //     } else {
  //       resolve(ouputFile)
  //     }
  //   })
  // })
  // return promise

  // let resolveCb
  // const promise = new Promise(resolve => {
  //   resolveCb = resolve
  // })
  // const cmd = process.platform === 'win32' ? 'npm.cmd' : 'npm'
  // const ouputFile = `./tmp/out-theme/${ipAddress}/${cfg.prefix}.min.css`
  // const runWebpack = spawn(cmd, ['run', 'generatorTheme', 'ipAddress=' + ipAddress])

  // runWebpack.stdout.on('data', (data) => {
  //   console.log('runWebpack stdout:', data)
  // })
  // runWebpack.stderr.on('data', (data) => {
  //   console.log('runWebpack stderr:', data)
  //   throw 'Compile scss to css failed'
  // })
  // runWebpack.on('exit', (code, signal) => {
  //   console.log('runWebpack exit:', code, signal)
  //   resolveCb(ouputFile)
  // })

  // runWebpack.on('error', (err) => {
  //   console.error('runWebpack error:', err);
  // })

  // runWebpack.on('close', (code) => {
  //   console.error('runWebpack close:', code);
  // })
  // return promise

  let resolveCb
  const promise = new Promise(resolve => {
    resolveCb = resolve
  })
  const ouputFile = `${cfg.userDefineTheme.out}/${ipAddress}/${cfg.prefix}.min.css`
  const config = getConfig(ipAddress)
  webpack(config, function (err) {
    if (err) {
      throw err
    }
    resolveCb(ouputFile)
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
  const ipAddress = req.hostname || req.host || req.ip || '127.0.0.1'
  try {
    addReqListener(req, (body) => {
      let params = body && JSON.parse(body)
      if (params && params.length > 0) {
        copyFolderForTheme(ipAddress)
        doGenerateGlobalFile(params, ipAddress)
        doGenerateIndexFile(ipAddress)
        doOutputTheme(ipAddress).then(filePath => {
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

async function zipTheme(filePath) {
  const srcPath = filePath.replace(/\/[^\/]+\.css/g, '')
  const destPath = srcPath + '.zip'
  try {
    await zip(path.resolve(srcPath), path.resolve(destPath))
  } catch (err) {
    throw err
  }
  return destPath
}

function saveTheme(req, res) {
  const ipAddress = req.hostname || req.host || req.ip || '127.0.0.1'
  try {
    addReqListener(req, (body) => {
      let params = body && JSON.parse(body)
      if (params && params.length > 0) {
        copyFolderForTheme(ipAddress)
        doGenerateGlobalFile(params, ipAddress)
        doGenerateIndexFile(ipAddress)
        doOutputTheme(ipAddress).then(filePath => {
          return zipTheme(filePath)
        }).then(zipFilePath => {
          res.set('content-type', 'application/json')
          res.send(JSON.stringify({
            code: 200,
            zipFilePath: zipFilePath
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
  generateTheme,
  saveTheme
}
