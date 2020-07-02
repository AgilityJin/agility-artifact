import * as arr from './array'
import * as str from './string'

export * from './array'
export * from './string'

export default {
  ...arr,
  ...str
}
