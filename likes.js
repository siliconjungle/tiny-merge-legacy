import { createDocument, setValueByKey } from './document.js'

const createLikes = () => {
  return {
    document: createDocument(),
    count: 0,
  }
}

const setLike = (ram, likes, userId, value, version) => {
  if (typeof(value) !== 'boolean') {
    throw new Error('Value must be a boolean')
  }
  const { hasUpdated, address } = setValueByKey(ram, likes.keystore, userId, value, version, userId)
  if (hasUpdated) {
    likes.count += value ? 1 : -1
  }
  return { hasUpdated, address }
}

const getLike = (ram, likes, userId) => {
  return ram.get(likes[userId]) ?? null
}

// This can break if someone updates the value directly.
const getLikeCount = (likes) => {
  return likes.count
}

const getDocument = (likes) => {
  return likes.document
}
