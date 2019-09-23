module.exports = {
  host: '127.0.0.1',
  port: 8091,
  api: '/api',
  proxy: {
    url: 'http://127.0.0.1:9000'
  },
  get publicPath() {
    return 'http://' + this.host + ':' + this.port + '/dist/'
  },
  distPath: './dist/examples',
  sourcePath: './examples'
}
