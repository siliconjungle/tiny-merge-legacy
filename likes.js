import { createKeystore, setKeystoreByKey } from './keystore.js'

export const createLikes = () => {
  return {
    keystore: createKeystore(),
    count: 0,
  }
}

export const setLike = (ram, likes, userId, value, version) => {
  if (typeof(value) !== 'boolean') {
    throw new Error('Value must be a boolean')
  }
  const { hasUpdated, address } = setKeystoreByKey(ram, likes.keystore, userId, value, version, userId)
  if (hasUpdated) {
    likes.count += value ? 1 : -1
  }
  return { hasUpdated, address }
}

export const getLike = (ram, likes, userId) => {
  return ram.get(likes[userId]) ?? null
}