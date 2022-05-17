import { createRandomId } from './utils.js'

export const createDocument = () => {
  return {}
}

export const setDocumentByKey = (ram, document, key, value, version, userId) => {
  const saveAddress = document[key] ?? createRandomId()
  document[key] = saveAddress
  return ram.set (value, userId, version, saveAddress)
}

export const getDocumentByKey = (ram, document, key) => {
  return ram.get(document[key]) ?? null
}

export const getDocumentAddressByKey = (document, key) => {
  return document[key] ?? null
}
