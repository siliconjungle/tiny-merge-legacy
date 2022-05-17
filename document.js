import { createKeystore, setKeystoreByKey, getKeystoreByKey, getKeystoreAddressByKey } from './keystore.js'

export const createDocument = () => {
  return {
    data: createKeystore(),
  }
}

export const setDocumentByKey = (ram, collection, key, value, version, userId) => {
  return setKeystoreByKey(ram, collection.documents, key, value, version, userId)
}

export const getDocumentByKey = (ram, collection, key) => {
  return getKeystoreByKey(ram, collection.documents, key)
}

export const getDocumentAddressByKey = (collection, key) => {
  return getKeystoreAddressByKey(collection.documents, key)
}
