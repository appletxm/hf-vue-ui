const rm = require('rimraf')
const webpackConfig = require('../config/webpack.config')
const ora = require('ora')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const distOperations = require('./release-dist-operations')
const fs = require('fs')

function build () {
  var spinner = ora('building for production...')

  spinner.start()

  rm(path.resolve('./dist/'), function (err) {
    if (err) {
      spinner.stop()
      throw err
    }

    webpack(webpackConfig, function (err, stats) {
      if (err) {
        spinner.stop()
        throw err
      }

      spinner.stop()
      console.log(chalk.magenta('***build for current branch success***'))
    })
  })
}

build()
