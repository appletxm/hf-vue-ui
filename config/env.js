const envDev = require('./env-development')
const envProd = require('./env-production')

module.exports = {
  development: envDev,
  production: envProd
}
