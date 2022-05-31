import * as keystore from './keystore.js'
import { isPrimitive } from './tiny-types.js'

// For now all documents are flat.
// In the future I will be adding other types.
const matchesDefinition = (ram, definition, data) => {
  if (typeof definition !== 'object') {
    return false
  }
  if (typeof data !== 'object') {
    return false
  }
  if (Object.keys(definition).length !== Object.keys(data).length) {
    return false
  }
  for (const key in definition) {
    if (!(key in data)) {
      return false
    }
    const field = keystore.getChildByKey(ram, data, key)
    if (!isPrimitive(definition[key].type, field.value)) {
      return false
    }
  }
  return true
}

export const setCollectionByKey = (
  ram,
  root,
  key,
  collection,
  userId,
  version = 0
) => {
  return keystore.setChildByKey(ram, root, key, collection, userId, version)
}

export const getCollectionByKey = (ram, root, key) => {
  return keystore.getChildByKey(ram, root, key)
}

export const getCollectionKeys = (root) => {
  return Object.keys(root)
}

export const setDocumentByKey = (
  ram,
  collection,
  key,
  document,
  userId,
  version = 0
) => {
  if (
    document === null ||
    matchesDefinition(ram, collection.definition, document.data)
  ) {
    return keystore.setChildByKey(
      ram,
      collection.documents,
      key,
      document,
      userId,
      version
    )
  }
  throw new Error('Document does not match collection definition')
}

export const getDocumentByKey = (ram, collection, key) => {
  return keystore.getChildByKey(ram, collection.documents, key)
}

export const getDocumentKeys = (collection) => {
  return Object.keys(collection.documents)
}
