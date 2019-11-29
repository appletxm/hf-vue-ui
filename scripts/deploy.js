const env = process.argv[2]
const path = require('path')
const fs = require('fs')
const pkg = require('../package.json')
const { generatorPkg } = require('./deploy-gen-pkg-file')
const { cpoyFile, copyFolder, checkDirIsOk } = require('./sync-copy-files')
const { serverJsFile } = require('./deploy-gen-server-file')
const { serverRouterHandleJsFile } = require('./deploy-gen-server-router-handle-file')
const { createTarPackage } = require('./deploy-tar')

let timeStamp = ''
let temPkgName = ''
let tempPkgPath = ''

function checkDeployFolder() {
  timeStamp = new Date().getTime()
  temPkgName = `${pkg.name}-${pkg.version}-nv-${timeStamp}`
  tempPkgPath = `./tmp/${temPkgName}`

  checkDirIsOk(path.resolve('./tmp'))
  checkDirIsOk(path.resolve(tempPkgPath))
}

function copyExamplesFile() {
  const examplesPath = path.resolve('./dist/examples')
  const deployPath = path.resolve(`${tempPkgPath}/dist/examples`)
  checkDirIsOk(path.resolve(`${tempPkgPath}/dist`))
  copyFolder(examplesPath, deployPath)
}

function genPackagejsonFile() {
  const deployPath = path.resolve(`${tempPkgPath}/package.json`)
  const pkgInfo = generatorPkg(pkg)
  fs.writeFileSync(deployPath, pkgInfo, 'utf8')
}

function copyThemeFile() {
  const srcPath = path.resolve('./src/theme')
  const deployPath = path.resolve(`./${tempPkgPath}/src/theme`)
  checkDirIsOk(path.resolve(`${tempPkgPath}/src`))
  copyFolder(srcPath, deployPath)
}

function copyThemeComponentsStyleFile() {
  let srcPath = './src/components'
  let deployPath = `${tempPkgPath}/src/components`
  const folders = fs.readdirSync(srcPath)

  checkDirIsOk(path.resolve(deployPath))

  folders.forEach(function(folder) {
    let srcTmp = srcPath + '/' + folder
    let deployTmp = deployPath + '/' + folder
    let filesInComponent = fs.readdirSync(path.resolve(srcPath + '/' + folder))

    filesInComponent.forEach(function(fileName) {
      if ((/^.+\.scss$/).test(fileName)) {
        checkDirIsOk(path.resolve(deployPath + '/' + folder))
        cpoyFile(path.resolve(srcTmp + '/' + fileName), path.resolve(deployTmp + '/' + fileName))
      }
    })
  })

}

function copyConfigFile() {
  const copyFileName = [
    'component.config.js',
    'webpack.config.component.theme.prod.js',
    'env-production.js'
  ]
  checkDirIsOk(path.resolve(`${tempPkgPath}/config`))
  copyFileName.forEach(function(file) {
    cpoyFile(path.resolve(`./config/${file}`), path.resolve(`./${tempPkgPath}/config/${file}`))
  })
  
}

function genServerScriptFile() {
  const copyFileName = [
    'server-define-theme.js',
    'server-router.js',
    'sync-copy-files.js',
    'server-icons.js'
  ]
  checkDirIsOk(path.resolve(`${tempPkgPath}/scripts`))
  fs.writeFileSync(path.resolve(`${tempPkgPath}/scripts/server.js`), serverJsFile, 'utf8')
  fs.writeFileSync(path.resolve(`${tempPkgPath}/scripts/server-router-handle.js`), serverRouterHandleJsFile, 'utf8')
  copyFileName.forEach(function(file) {
    cpoyFile(path.resolve(`./scripts/${file}`), path.resolve(`${tempPkgPath}/scripts/${file}`))
  })
}

function copyRegistryFile() {
  const copyFileName = [
    '.npmrc',
    '.yarnrc'
  ]
  copyFileName.forEach(function(file) {
    cpoyFile(path.resolve(`./${file}`), path.resolve(`${tempPkgPath}/${file}`))
  })
}

async function boot() {
  try {
    checkDeployFolder()
    copyExamplesFile()
    genPackagejsonFile()
    copyThemeFile()
    copyThemeComponentsStyleFile()
    copyConfigFile()
    genServerScriptFile()
    copyRegistryFile()
    await createTarPackage(tempPkgPath, temPkgName)
  } catch (err) {
    console.error('tar error:', err)
  }
}

boot()
