import Fingerprint2, { Options } from 'fingerprintjs2'

// 创建指纹
function generateFingerprint (domain?: Record<string, string>, scopeKey?: string): Promise<string> {
  const options: Options = (domain && {
    extraComponents: Object.entries(domain).map(([key, val]) => {
      return {
        key: scopeKey ? `${scopeKey}-${key}` : key,
        getData: done => done(val)
      }
    })
  }) || {}
  return new Promise((resolve) => {
    const handler = (components: Array<{ key: string; value: any; }>) => {
      const values = components.map(el => el.value)
      const deviceId = Fingerprint2.x64hash128(values.join(''), 31)
      resolve(deviceId) // an array of components: {key: ..., value: ...}
    }
    // @ts-ignore
    if (window.requestIdleCallback) {
      // @ts-ignore
      window.requestIdleCallback(function () {
        Fingerprint2.get(options, handler)
      })
    } else {
      setTimeout(function () {
        Fingerprint2.get(options, handler)
      }, 500)
    }
  })
}

export default generateFingerprint
