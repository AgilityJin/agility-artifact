const setLocalStorage = (key: string, data: any, isNeedStringify = true) => {
  if (!localStorage) { throw new Error('localStorage is not found') }
  const d = isNeedStringify ? JSON.stringify(data) : data
  localStorage.setItem(key, d)
}

export default setLocalStorage
