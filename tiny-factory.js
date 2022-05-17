import { createSequencer } from './sequencer.js'
import { createCollection } from './collection.js'
import { createDocument } from './document.js'
import { createKeystore } from './keystore.js'
import { createTree } from './tree.js'
import { createLikes } from './likes.js'

export const CRDT_TYPE = {
  SEQUENCER: 'sequencer',
  COLLECTION: 'collection',
  DOCUMENT: 'document',
  KEYSTORE: 'keystore',
  TREE: 'tree',
  LIST: 'list',
  LIKES: 'likes',
}

export const DATA_TYPE = {
  OBJECT: 'object',
  ARRAY: 'array',
  STRING: 'string',
  NUMBER: 'number',
  BOOLEAN: 'boolean',
  NULL: 'null',
}

export const createCrdt = (type) => {
  switch (type) {
    case CRDT_TYPE.SEQUENCER:
      return createSequencer()
    case CRDT_TYPE.COLLECTION:
      return createCollection()
    case CRDT_TYPE.DOCUMENT:
      return createDocument()
    case CRDT_TYPE.KEYSTORE:
      return createKeystore()
    case CRDT_TYPE.TREE:
      return createTree()
    case CRDT_TYPE.LIKES:
      return createLikes()
    default:
      throw new Error(`Unknown CRDT type: ${type}`)
  }
}
