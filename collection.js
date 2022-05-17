import { createKeystore, setKeystoreByKey, getKeystoreByKey, getKeystoreAddressByKey } from './keystore.js'

export const createCollection = (description, definition) => {
  return {
    description,
    definition,
    documents: createKeystore(),
  }
}

export const setCollectionByKey = (ram, root, key, collection, version, userId) => {
  return setKeystoreByKey(ram, root, key, collection, version, userId)
}

export const getCollectionByKey = (ram, root, key) => {
  return getKeystoreByKey(ram, root, key)
}

export const getCollectionAddressByKey = (root, key) => {
  return getKeystoreAddressByKey(root, key)
}
