import * as sequencer from './sequencer.js'
import * as keystore from './keystore.js'
import * as tree from './tree.js'

export const CRDT = {
  SEQUENCER: 'sequencer',
  KEYSTORE: 'keystore',
  TREE: 'tree',
}

export const PRIMITIVE = {
  OBJECT: 'object',
  ARRAY: 'array',
  STRING: 'string',
  NUMBER: 'number',
  BOOLEAN: 'boolean',
  NULL: 'null',
}

export const createCrdt = (type, options) => {
  switch (type) {
    case CRDT.SEQUENCER:
      return sequencer.create()
    case CRDT.KEYSTORE:
      return keystore.create()
    case CRDT.TREE:
      return tree.create()
    default:
      throw new Error(`Unknown CRDT type: ${type}`)
  }
}
