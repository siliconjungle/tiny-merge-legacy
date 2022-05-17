import { createRandomId } from './utils.js'

export const createKeystore = () => {
  return {}
}

export const setAddressByKey = (ram, keystore, key, address, version, userId) => {
  const saveAddress = keystore[key] ?? createRandomId()
  keystore[key] = saveAddress
  return ram.set (address, userId, version, saveAddress)
}

export const getAddressByKey = (ram, keystore, key) => {
  return ram.get(keystore[key]) ?? null
}
