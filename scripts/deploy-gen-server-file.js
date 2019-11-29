const SERVER_FILE_DEFAULT = `
process.env.NODE_ENV = 'production'
const express = require('express')
const chalk = require('chalk')
const fs = require('fs')
const envConfig = require('../config/env-production.js')
const serverRouter = require('./server-router')
const app = express()
const host = require('ip').address()
const port = envConfig['port']
const compiler = {
  outputPath: './dist/examples/',
  outputFileSystem: fs
}

app.use(express.static(__dirname + '/../dist/examples'))
app.use('*', serverRouter['*'])

app.use('/api',function (req, res) {
  serverRouter['/api'](req, res)
})

app.use(['/*assets/images/*'], function (req, res) {
  serverRouter['image'](req, res, compiler)
})

app.use(['/tmp/themes*/*'], function(req, res) {
  serverRouter['user-theme'](req, res, compiler)
})

app.use('/*.html', function (req, res) {
  serverRouter['html'](req, res, compiler)
})

app.use('/*.js', function (req, res) {
  serverRouter['js'](req, res, compiler)
})

app.use('/*.css', function (req, res) {
  serverRouter['css'](req, res, compiler)
})

app.use('/', function (req, res) {
  serverRouter['/'](req, res, compiler)
})

app.listen(port, function () {
  var url = 'http://' + host + ':' + port
  const magenta = chalk.magenta('dev server started at: ')
  const blue = chalk.blue(url)
  console.info(magenta + blue)
})
`
module.exports = {
  serverJsFile: SERVER_FILE_DEFAULT
}
