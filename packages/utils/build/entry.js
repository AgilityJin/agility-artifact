const path = require('path')

const entryList = [
  // all
  'main.ts',
  // methods
  'methods/async-task.ts',
  'methods/clear-local-storage.ts',
  'methods/clear-session-storage.ts',
  'methods/create-enum.ts',
  'methods/decode-base64.ts',
  'methods/generate-fingerprint.ts',
  'methods/get-birthday-from-idcard.ts',
  'methods/get-gender-from-idcard.ts',
  'methods/get-local-storage.ts',
  'methods/get-os.ts',
  'methods/get-session-storage.ts',
  'methods/get-url-param.ts',
  'methods/nanoid.ts',
  'methods/set-local-storage.ts',
  'methods/set-object.ts',
  'methods/set-session-storage.ts',
  'methods/set-url-params.ts',
  // factories
  'factories/responsibility-chain.ts',
  'factories/request/request.ts',
]

module.exports = {
  entrysDir: entryList.map(str => path.join(__dirname, '../src', str))
}
