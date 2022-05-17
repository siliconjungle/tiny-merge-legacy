import { createSequencer } from './sequencer.js'
import { createCollection } from './collection.js'
import { createDocument } from './document.js'
import { createKeystore } from './keystore.js'
import { createTree } from './tree.js'
import { createLikes } from './likes.js'

export const CRDT_TYPES = {
  SEQUENCER: 'sequencer',
  COLLECTION: 'collection',
  DOCUMENT: 'document',
  KEYSTORE: 'keystore',
  TREE: 'tree',
  STRINGS: 'string',
  LIKES: 'likes',
}

export const createCrdt = (type) => {
  switch (type) {
    case CRDT_TYPES.SEQUENCER:
      return createSequencer()
    case CRDT_TYPES.COLLECTION:
      return createCollection()
    case CRDT_TYPES.DOCUMENT:
      return createDocument()
    case CRDT_TYPES.KEYSTORE:
      return createKeystore()
    case CRDT_TYPES.TREE:
      return createTree()
    case CRDT_TYPES.LIKES:
      return createLikes()
    default:
      throw new Error(`Unknown CRDT type: ${type}`)
  }
}
