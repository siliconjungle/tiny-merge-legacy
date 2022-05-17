import { createSequencer } from './sequencer.js'
import { createKeystore } from './keystore.js'
import { createTree } from './tree.js'

export const CRDT_TYPE = {
  SEQUENCER: 'sequencer',
  KEYSTORE: 'keystore',
  TREE: 'tree',
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
    case CRDT_TYPE.KEYSTORE:
      return createKeystore()
    case CRDT_TYPE.TREE:
      return createTree()
    default:
      throw new Error(`Unknown CRDT type: ${type}`)
  }
}
