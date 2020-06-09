const clearLocalStorage = (key: string) => {
  if (!localStorage) { throw new Error('localStorage is not found') }
  return localStorage.removeItem(key)
}

export default clearLocalStorage
