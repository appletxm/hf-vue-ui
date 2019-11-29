const PKG_DEFAULT = {
  "name": "hf-vue-ui",
  "version": "1.0.2",
  "description": "A ui libs for hf",
  "private": false,
  "dependencies": {
    "@babel/polyfill": "7.4.3",
    "axios": "0.19.0",
    "lodash": "4.17.15",
    "moment": "2.24.0",
    "vue": "2.6.10",
    "vue-router": "3.0.0",
    "vuex": "3.1.1",
    "ip": "^1.1.5",
    "multer": "^1.4.2",
    "ora": "^3.4.0",
    "rimraf": "^3.0.0",
    "express": "^4.17.1",
    "chalk": "^2.4.2",
    "fibers": "^4.0.1",
    "zip-a-folder": "^0.0.9",
    "cross-env": "^6.0.0",
    "autoprefixer": "^9.6.1",
    "copy-webpack-plugin": "^5.0.4",
    "css-loader": "^3.2.0",
    "file-loader": "^4.2.0",
    "formidable": "^1.2.1",
    "mini-css-extract-plugin": "^0.8.0",
    "node-sass": "^4.12.0",
    "optimize-css-assets-webpack-plugin": "^5.0.3",
    "postcss-loader": "^3.0.0",
    "sass": "^1.22.12",
    "sass-loader": "^8.0.0",
    "url-loader": "^2.1.0",
    "webpack": "^4.39.3",
    "webpack-cli": "^3.3.9",
    "webpack-fix-style-only-entries": "^0.4.0"
  },
  "scripts": {
    "start": "node scripts/server.js"
  },
  "repository": {
    "type": "git",
    "url": "http://175.102.179.36:9011/front-end-base/hf-vue-ui"
  },
  "keywords": [
    "webpack4",
    "vue",
    "vuex",
    "vue-router",
    "vant",
    "scss",
    "components ui"
  ],
  "author": "appletxm & hf front-end crew",
  "license": "ISC",
  "bugs": {
    "url": "http://175.102.179.36:9011/front-end-base/hf-vue-ui/issues"
  },
  "node": {
    "version": ">=8.3"
  }
}

function generatorPkg(pkg) {
  let newPkgTmp = JSON.parse(JSON.stringify(PKG_DEFAULT))
  newPkgTmp.version = pkg.version
  return JSON.stringify(newPkgTmp, '\n')
}

module.exports = {
  generatorPkg
}
