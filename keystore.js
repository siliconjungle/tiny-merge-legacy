import { createRandomId } from './utils.js'

export const createKeystore = () => {
  return {}
}

export const setValueByKey = (ram, keystore, key, value, version, userId) => {
  const saveAddress = keystore[key] ?? createRandomId()
  keystore[key] = saveAddress
  return ram.set (value, userId, version, saveAddress)
}

export const getAddressByKey = (ram, keystore, key) => {
  return ram.get(keystore[key]) ?? null
}
