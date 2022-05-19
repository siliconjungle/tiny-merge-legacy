import * as keystore from './keystore.js'

export const create = (ram, data, userId) => {
  return {
    data: keystore.create(ram, data, userId),
  }
}
