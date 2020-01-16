const { version } = require('../../package.json')

module.exports = function(source) {
  source = source.replace('{{pkgVersion}}', version)
  return source
};
