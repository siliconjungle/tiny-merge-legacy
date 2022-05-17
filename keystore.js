import { createRandomId } from './utils.js'

export const createKeystore = () => {
  return {}
}

export const setKeystoreByKey = (ram, keystore, key, value, version, userId) => {
  const saveAddress = keystore[key] ?? createRandomId()
  keystore[key] = saveAddress
  return ram.set (value, userId, version, saveAddress)
}

export const getKeystoreByKey = (ram, keystore, key) => {
  return ram.get(keystore[key]) ?? null
}

export const getKeystoreAddressByKey = (keystore, key) => {
  return keystore[key] ?? null
}
