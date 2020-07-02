const path = require('path')

const srcPath = path.join(__dirname, '../src')
module.exports = {
  entrysDir: [
    // all
    path.join(srcPath, 'main.ts'),
  ]
}
