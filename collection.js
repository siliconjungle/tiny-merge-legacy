import * as keystore from './keystore.js'
import { setCollectionByKey } from './root-helper'

export const create = (ram, definition, userId) => {
  return {
    definition,
    documents: keystore.create(ram, {}, userId),
  }
}

export const set = (ram, root, key, definition, userId, version = 0) => {
  const collection = create(ram, definition, userId)
  return setCollectionByKey(ram, root, key, collection, userId, version)
}
