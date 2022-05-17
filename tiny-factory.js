export const CRDT_TYPES = {
  SEQUENCER: 'sequencer',
  DOCUMENT: 'document',
}

export const createCrdt = (type) => {
  switch (type) {
    case CRDT_TYPES.SEQUENCER:
      return createSequencer()
    case CRDT_TYPES.DOCUMENT:
      return createDocument()
    default:
      throw new Error(`Unknown CRDT type: ${type}`)
  }
}
