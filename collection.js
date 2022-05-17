import keystore from './keystore.js'

export const createCollection = (description, definition) => {
  return {
    description,
    definition,
    documents: keystore.create(),
  }
}

export const setCollectionByKey = (ram, root, key, collection, version, userId) => {
  return keystore.setChildByKey(ram, root, key, collection, version, userId)
}

export const getCollectionByKey = (ram, root, key) => {
  return keystore.getChildByKey(ram, root, key)
}

export const getCollectionAddressByKey = (root, key) => {
  return keystore.getChildAddressByKey(root, key)
}
