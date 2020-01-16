const RegClient = require('npm-registry-client')
const ora = require('ora')
const chalk = require('chalk')
const params = {
  auth: {
    userName: 'releaser',
    password: '123456',
    email: '83926536@qq.com'
  }
}
const registry = 'http://172.30.0.176:4873/'
let spinner

spinner = ora(chalk.blue('****Publishing*****'))
spinner.start()

// function npmLogin() {
//   let { exec } = require('child_process')
//   exec(`npm login
//   `)
//   exec(`${params.userName}
//   `)
//   exec(`${params.password}
//   `)
//   exec(`${params.email}
//   `)
// }

// npmLogin()

// spinner.stop()

