const path = require('path')

const srcPath = path.join(__dirname, '../src')
module.exports = {
  entrysDir: [
    // all
    path.join(srcPath, 'main.ts'),
    // methods
    path.join(srcPath, 'methods/async-task.ts'),
    path.join(srcPath, 'methods/clear-local-storage.ts'),
    path.join(srcPath, 'methods/clear-session-storage.ts'),
    path.join(srcPath, 'methods/create-enum.ts'),
    path.join(srcPath, 'methods/decode-base64.ts'),
    path.join(srcPath, 'methods/generate-fingerprint.ts'),
    path.join(srcPath, 'methods/get-birthday-from-idcard.ts'),
    path.join(srcPath, 'methods/get-gender-from-idcard.ts'),
    path.join(srcPath, 'methods/get-local-storage.ts'),
    path.join(srcPath, 'methods/get-os.ts'),
    path.join(srcPath, 'methods/get-session-storage.ts'),
    path.join(srcPath, 'methods/get-url-param.ts'),
    path.join(srcPath, 'methods/nanoid.ts'),
    path.join(srcPath, 'methods/set-local-storage.ts'),
    path.join(srcPath, 'methods/set-object.ts'),
    path.join(srcPath, 'methods/set-session-storage.ts'),
    path.join(srcPath, 'methods/set-url-params.ts'),
    // factories
    path.join(srcPath, 'factories/responsibility-chain.ts'),
    path.join(srcPath, 'factories/request/request.ts'),
  ]
}
