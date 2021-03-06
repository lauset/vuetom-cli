const fs = require('fs')
const path = require('path')
const exec = require('child_process').execSync

function mkdirsSync (dirname: string) {
  if (fs.existsSync(dirname)) {
    return true
  } else {
    if (mkdirsSync(path.dirname(dirname))) {
      fs.mkdirSync(dirname)
      return true
    }
  }
}

function _copy (src: string, dist: string) {
  const paths = fs.readdirSync(src)
  paths.forEach((p: string) => {
    const _src = src + '/' + p
    const _dist = dist + '/' + p
    const stat = fs.statSync(_src)
    if (stat.isFile()) {
      fs.writeFileSync(_dist, fs.readFileSync(_src))
    } else if (stat.isDirectory()) {
      copyDir(_src, _dist)
    }
  })
}

function copyDir (src: string, dist: string) {
  const b = fs.existsSync(dist)
  if (!b) mkdirsSync(dist)
  _copy(src, dist)
}

module.exports = {
  isLocalPath (templatePath: string) {
    return /^[./]|(^[a-zA-Z]:)/.test(templatePath)
  },
  getTemplatePath (templatePath: string) {
    return path.isAbsolute(templatePath)
      ? templatePath
      : path.normalize(path.join(process.cwd(), templatePath))
  },
  formatJSON (str: string) {
    str = str.replace(/(?:\s*['"]*)?([a-zA-Z0-9]+)(?:['"]*\s*)?:/g, '$1:')
    return str
  },
  gitUser () {
    let name
    let email
    try {
      name = exec('git config --get user.name')
      email = exec('git config --get user.email')
    } catch (e) {
      console.log(e)
    }
    name = name && JSON.stringify(name.toString().trim()).slice(1, -1)
    email = email && (' <' + email.toString().trim() + '>')
    return (name || '') + (email || '')
  },
  createDocs (src: string, dist: string, callback: any) {
    copyDir(src, dist)
    if (callback) callback()
  }
}
