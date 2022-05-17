import { createDocument } from './document.js'
import { createDocument, setDocumentByKey, getDocumentByKey, getDocumentAddressByKey } from './document.js'

export const createCollection = (name, description) => {
  return {
    name,
    description,
    documents: createDocument(),
  }
}

export const setCollectionByKey = (ram, root, key, collection, version, userId) => {
  return setDocumentByKey(ram, root, key, collection, version, userId)
}

export const getCollectionByKey = (ram, root, key) => {
  return getDocumentByKey(ram, root, key)
}

export const getCollectionAddressByKey = (root, key) => {
  return getDocumentAddressByKey(root, key)
}
