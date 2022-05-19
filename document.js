import * as keystore from './keystore.js'
import { setDocumentByKey } from './root-helper'

export const create = (ram, data, userId) => {
  return {
    data: keystore.create(ram, data, userId),
  }
}

export const set = (ram, collection, key, data, userId, version = 0) => {
  const document = create(ram, data, userId)
  return setDocumentByKey(ram, collection, key, document, userId, version)
}
