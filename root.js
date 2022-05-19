import Ram from './ram.js'
import * as keystore from './keystore.js'
import { isPrimitive } from './tiny-types.js'

const ram = new Ram()

// This + the ram needs to be saved in a database using a repository.
const root = {}

// For now all documents are flat.
// In the future I will be adding other types.
const matchesDefinition = (definition, data) => {
  if (typeof definition !== 'object') {
    return false
  }
  if (typeof data !== 'object') {
    return false
  }
  for (const key in definition) {
    if (!isPrimitive(definition[key].type, data[key])) {
      return false
    }
  }
  return true
}

export const setCollectionByKey = (key, collection, userId, version = 0) => {
  return keystore.setChildByKey(ram, root, key, collection, userId, version)
}

export const getCollectionByKey = (key) => {
  return keystore.getChildByKey(ram, root, key)
}

export const setDocumentByKey = (collection, key, document, userId, version = 0) => {
  if (document === null || matchesDefinition(collection.definition, document.data)) {
    return keystore.setChildByKey(ram, collection.documents, key, document, userId, version)
  }
  throw new Error('Document does not match collection definition')
}

export const getDocumentByKey = (collection, key) => {
  return keystore.getChildByKey(ram, collection.documents, key)
}
