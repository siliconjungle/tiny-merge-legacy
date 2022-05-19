import * as keystore from './keystore.js'

export const create = (ram, definition, userId) => {
  return {
    definition,
    documents: keystore.create(ram, {}, userId),
  }
}
