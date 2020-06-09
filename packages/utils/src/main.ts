import * as methods from './methods'
import * as factories from './factories'
export * from './methods'
export * from './factories'
export * from './interface'

export default {
  ...methods,
  ...factories,
}
