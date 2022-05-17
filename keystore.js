import { createRandomId } from './utils.js'

export const create = () => {
  return {}
}

export const setChildByKey = (ram, keystore, key, value, version, userId) => {
  const saveAddress = keystore[key] ?? createRandomId()
  keystore[key] = saveAddress
  return ram.set (value, userId, version, saveAddress)
}

export const getChildByKey = (ram, keystore, key) => {
  return ram.get(keystore[key]) ?? null
}

export const getChildAddressByKey = (keystore, key) => {
  return keystore[key] ?? null
}
