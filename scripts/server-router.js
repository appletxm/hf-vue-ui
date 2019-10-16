const {
  assignRouter,
  routerRootPath,
  routerUploadSingleFile,
  routerImgPath,
  routerHtmlPath,
  routerJsFile,
  routerUserTheme
} = require('./server-router-handle')

const serverRouter = {
  '*': function (req, res, next) {
    console.info(`HTTP [${req.method}]`, req.path, req.baseUrl, req.params)
    next()
  },

  '/api': assignRouter,

  '/': routerRootPath,

  'html': routerHtmlPath,

  'image': routerImgPath,

  'js': routerJsFile,

  'uploadSingleFile': routerUploadSingleFile,

  'user-theme': routerUserTheme
}

module.exports = serverRouter
