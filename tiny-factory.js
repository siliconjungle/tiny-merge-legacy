export const CRDT_TYPES = {
  SEQUENCER: 'sequencer',
  KEYSTORE: 'keystore',
}

export const createCrdt = (type) => {
  switch (type) {
    case CRDT_TYPES.SEQUENCER:
      return createSequencer()
    case CRDT_TYPES.KEYSTORE:
      return createKeystore()
    default:
      throw new Error(`Unknown CRDT type: ${type}`)
  }
}
