const host = require('ip').address()

module.exports = {
  host: host,
  port: 8091,
  api: '/api',
  proxy: {
    url: 'http://127.0.0.1:9000'
  },
  get publicPath() {
    return 'http://' + host + ':' + this.port + '/dist/'
  },
  distPath: './dist/examples',
  sourcePath: './examples'
}
