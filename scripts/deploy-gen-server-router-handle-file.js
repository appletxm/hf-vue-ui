const SERVER_ROUTER_HANDLE_DEFAULT = `
const path = require('path')
const fs = require('fs')
const { generateTheme, saveTheme } = require('./server-define-theme')
const { getIcons } = require('./server-icons')
const cfg = require('../config/component.config')

function assignRouter(req, res, next) {
  var reqPath = req.originalUrl
  var proxyConfig

  if (process.env.NODE_ENV === 'mock') {
    isMock = true
    console.log('mock reqPath', reqPath)
    getMockFile(reqPath + '.json', res)
  } else {
    if (req.originalUrl === '/api/defineTheme/change') {
      generateTheme(req, res)
    } else if (req.originalUrl === '/api/defineTheme/save') {
      saveTheme(req, res)
    } else if (req.originalUrl === '/api/iconsList/get') {
      getIcons(req, res)
    }
  }
  if (next) {
    next()
  }
}

function getHtmlFile(compiler, filename, res, next) {
  compiler.outputFileSystem.readFile(filename, function (err, result) {
    if (err) {
      res.send(err)
    } else {
      res.set('content-type', 'text/html')
      res.send(result)
      res.end()
    }
    if (next) {
      next()
    }
  })
}

function getImageFile(compiler, filename, res, next) {
  var newFs = compiler ? compiler.outputFileSystem : fs

  console.info('[get image path]', filename)

  newFs.readFile(filename, function (err, result) {
    if (err) {
      res.send(err)
    } else {
      res.set('content-type', 'image/' + filename.match(/\.(\d)$/))
      res.send(result)
    }
    res.end()

    if (next) {
      next()
    }
  })
}

function getJsFile(compiler, filename, res, next) {
  var newFs = compiler ? compiler.outputFileSystem : fs

  console.info('[get js path]', filename)

  newFs.readFile(filename, function (err, result) {
    if (err) {
      res.send(err)
    } else {
      res.set('content-type', 'application/x-javascript')
      res.send(result)
    }
    res.end()

    if (next) {
      next()
    }
  })
}

function getCssFile(compiler, filename, res, next) {
  var newFs = compiler ? compiler.outputFileSystem : fs

  console.info('[get css path]', filename)

  newFs.readFile(filename, function (err, result) {
    if (err) {
      res.send(err)
    } else {
      res.set('content-type', '	text/css')
      res.send(result)
    }
    res.end()

    if (next) {
      next()
    }
  })
}

function routerRootPath(req, res, compiler) {
  // TODO compiler.outputPath is equal to the webpack publickPath
  var filename = path.join(compiler.outputPath, 'app.html')
  // console.info('####', compiler.outputPath, path.join(compiler.outputPath, 'app.html'))
  getHtmlFile(compiler, filename, res)
}

function routerUploadSingleFile(req, res, next) {
  var reqPath = req.originalUrl

  if (process.env.NODE_ENV === 'mock') {
    isMock = true
    console.log('mock reqPath', reqPath.replace(/\?.*$/, ''))
    recieveImageFile(req, res, next)
  }
  if (next) {
    next()
  }
}

function routerImgPath(req, res, compiler) {
  // var reqImgPath = req.baseUrl.match(/.+(assets.+)$/)[1]
  var filename = compiler ? path.join(compiler.outputPath, req.baseUrl.match(/.+(assets.+)$/)[1]) : path.join(__dirname, '../' + req.baseUrl + req.path)
  getImageFile(compiler, filename, res)
}

function routerHtmlPath(req, res, compiler) {
  var filename = path.join(compiler.outputPath, req.baseUrl.replace('/', ''))
  getHtmlFile(compiler, filename, res)
}

function routerJsFile(req, res, compiler) {
  const filename = path.join(compiler.outputPath, req.baseUrl.replace('/', ''))
  getJsFile(compiler, filename, res)
}

function routerCssFile(req, res, compiler) {
  const filename = path.join(compiler.outputPath, req.baseUrl.replace('/', ''))
  getCssFile(compiler, filename, res)
}

function routerUserTheme(req, res) {
  const filePath = path.resolve('.' + req.originalUrl)
  let result

  if (filePath.indexOf('.css') >= 0) {
    result = fs.readFileSync(filePath, 'utf8')
    res.set('content-type', 'text/css')
    res.send(result)
    res.end()
  } else if (filePath.indexOf('.zip') >= 0) {
    result = fs.readFileSync(filePath)
    res.set({
      'content-type': 'application/octet-stream',
      'content-disposition': 'attachment;filename=' + encodeURIComponent(cfg.prefix + '.zip')
    })
    result = fs.createReadStream(filePath)
    result.on('data', (chunk) => {
      res.write(chunk, 'binary')
    })
    result.on("end", () => {
      res.end()
    })
  }
}

module.exports = {
  assignRouter,
  routerRootPath,
  routerUploadSingleFile,
  routerImgPath,
  routerHtmlPath,
  routerJsFile,
  routerCssFile,
  routerUserTheme
}
`
module.exports = {
  serverRouterHandleJsFile: SERVER_ROUTER_HANDLE_DEFAULT
}
