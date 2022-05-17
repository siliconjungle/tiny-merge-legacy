import * as sequencer from './sequencer.js'
import * as keystore from './keystore.js'
import * as tree from './tree.js'

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

export const createCrdt = (type, options) => {
  switch (type) {
    case CRDT_TYPE.SEQUENCER:
      return sequencer.create()
    case CRDT_TYPE.KEYSTORE:
      return keystore.create()
    case CRDT_TYPE.TREE:
      return tree.create()
    default:
      throw new Error(`Unknown CRDT type: ${type}`)
  }
}
