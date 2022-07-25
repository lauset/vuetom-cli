#!/usr/bin/env node

const logger = require('./logger')
const request = require('request')
const chalk = require('chalk')

process.on('exit', () => {
  console.log()
  console.log(chalk.hex('#b6d7a8')("  Command 'list' execution completed"))
  console.log()
})

function print (branchName: string) {
  request(
    {
      url: `https://api.github.com/repos/lauset/vuetom-cli/branches/${branchName}`,
      headers: {
        'User-Agent': ''
      }
    },
    (err: any, res: any, body: any) => {
      if (err) logger.fatal(err)
      const requestBody = JSON.parse(body)
      if (requestBody) {
        const r = requestBody
        try {
          console.log()
          console.log(`  Branch => ${chalk.yellow(branchName)} update information:`)
          console.log()
          console.log(
            '  ' +
              chalk.hex('#FFC0CB')('>>> name :') +
              '  ' +
              chalk.hex('#00FFFF')(r.name)
          )
          console.log(
            '  ' +
              chalk.hex('#FFC0CB')('>>>  msg :') +
              '  ' +
              chalk.hex('#00FFFF')(r.commit.commit.message)
          )
          console.log(
            '  ' +
              chalk.hex('#FFC0CB')('>>> date :') +
              '  ' +
              chalk.hex('#00FFFF')(r.commit.commit.committer.date)
          )
          console.log(
            '  ' +
              chalk.hex('#FFC0CB')('>>>  url :') +
              '  ' +
              chalk.hex('#00FFFF')(r._links.html)
          )
        } catch {
          console.log()
          console.error(chalk.hex('#FF6347')('  Something Wrong!'))
          console.log()
        }
      } else {
        console.error(requestBody.message)
      }
    }
  )
}

function list () {
  let branchName: string = 'TEMP-ALL'
  if (process.argv.length > 2) {
    branchName = process.argv[2].toUpperCase()
  }
  if (branchName === 'TEMP-DOCS' || branchName === 'DOCS') {
    print('temp-docs')
  }
  if (branchName === 'TEMP-BLOG' || branchName === 'BLOG') {
    print('temp-blog')
  }
  if (branchName === 'TEMP-ALL') {
    print('temp-docs')
    print('temp-blog')
  }
}

list()

export { list }
