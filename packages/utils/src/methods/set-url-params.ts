/**
 * @name 设置url上需要拼接的参数
 * @param params 需拼接的参数对象
 * @returns 返回url ?及之后的参数段落字符
 */
function setUrlParams(params: Record<
  string, 
  string | number | undefined | null | boolean
>) {
  let url = '?'
  Object.keys(params).forEach((item: string) => (url += `${item}=${params[item]}&`))
  url = url.substring(0, url.length - 1)
  return url
}

export default setUrlParams
