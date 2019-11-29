const tar = require('tar')
const path = require('path')

function createTarPackage(folderPath, fileName) {
  console.info(folderPath, fileName)

  return tar.c({
      gzip: true,
      file: path.resolve('./tmp/' + fileName + '.tgz'),
      cwd: path.resolve('./tmp'),
    },
    [fileName]
  )
}

module.exports = {
  createTarPackage
}
