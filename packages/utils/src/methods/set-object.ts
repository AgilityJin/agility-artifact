import set from 'lodash/set'
import cloneDeep from 'lodash/cloneDeep'

/**
 * @name 设置指定路径对象属性
 * @param obj 待修改的源对象
 * @param path 需修改的对象路径
 * @param val 需要设置的值
 */
function setObject(obj: Record<string, any>, path: string[] | string, val: any) {
  if (!obj || typeof obj !== 'object') return obj;
  let data = cloneDeep(obj)
  set(data, path, val)
  return data
}

export default setObject
