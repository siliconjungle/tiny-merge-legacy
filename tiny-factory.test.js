import { CRDT_TYPE, createCrdt } from './tiny-factory.js'

describe('create', () => {
  it('should create sequencer', () => {
    const sequencer = createCrdt(CRDT_TYPE.SEQUENCER)
    expect(sequencer).toEqual({
      references: [],
      sequences: [],
    })
  })
  it('should create keystore', () => {
    const keystore = createCrdt(CRDT_TYPE.KEYSTORE)
    expect(keystore).toEqual({})
  })
  it('should create tree', () => {
    const tree = createCrdt(CRDT_TYPE.TREE)
    expect(tree).toEqual({})
  })
})
