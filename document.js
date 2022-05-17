import * as keystore from './keystore.js'

export const createDocument = () => {
  return {
    data: keystore.create(),
  }
}

export const setDocumentByKey = (ram, collection, key, value, version, userId) => {
  return keystore.setChildByKey(ram, collection.documents, key, value, version, userId)
}

export const getDocumentByKey = (ram, collection, key) => {
  return keystore.getChildByKey(ram, collection.documents, key)
}

export const getDocumentAddressByKey = (collection, key) => {
  return keystore.getChildAddressByKey(collection.documents, key)
}
