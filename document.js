import { createRandomId } from './utils.js'

export const createDocument = () => {
  return {}
}

export const setValueByKey = (ram, document, key, value, version, userId) => {
  const saveAddress = document[key] ?? createRandomId()
  document[key] = saveAddress
  return ram.set (value, userId, version, saveAddress)
}

export const getAddressByKey = (ram, document, key) => {
  return ram.get(document[key]) ?? null
}
