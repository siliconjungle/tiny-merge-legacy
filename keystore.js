import { createRandomId } from './utils.js'

export const create = (ram, initialValue, userId) => {
  const keystore = {}
  for (const key in initialValue) {
    setChildByKey(ram, keystore, key, initialValue[key], userId)
  }
  return keystore
}

export const setChildByKey = (ram, keystore, key, value, userId, version = 0) => {
  const saveAddress = keystore[key] ?? createRandomId()
  keystore[key] = saveAddress
  return ram.set (value, userId, version, saveAddress)
}

export const getChildByKey = (ram, keystore, key) => {
  return ram.get(keystore[key]) ?? null
}

export const getValues = (ram, keystore) => {
  const values = {}
  for (const key in keystore) {
    values[key] = getChildByKey(ram, keystore, key)
  }
  return values
}

export const getChildAddressByKey = (keystore, key) => {
  return keystore[key] ?? null
}
