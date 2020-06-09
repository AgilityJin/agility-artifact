const OSReg = /(iPhone|iPod|iPad|android);?/i

/**
 * @name 获取当前系统环境
 */
function getOS() {
  if (navigator && navigator.userAgent) {
    const os = navigator.userAgent.match(OSReg)
    if (os) {
      switch (os[1].toLowerCase()) {
        case 'iphone':
        case 'ipod':
          return { iPhone: true, iOS: true }
        case 'ipad':
          return { iPad: true, iOS: true }
        case 'android':
          return { android: true }
        default:
          return { pc: true }
      }
    }
  }
  return {}
}

export default getOS
