const host = require('ip').address()

module.exports = {
  host: host,
  port: 8091,
  api: '/api',
  publicPath: '',
  distPath: './dist/examples',
  sourcePath: './examples'
}
