import Ram from './ram.js'
import * as sequencer from './sequencer.js'

describe('sequencer create', () => {
  it('should create sequencer', () => {
    const seq = sequencer.create()
    expect(seq).toEqual({
      references: [],
      sequences: [],
    })
  })
})

describe('sequencer push', () => {
  it('should push single element', () => {
    const ram = new Ram()
    const seq = sequencer.create()
    const value = 'Hello world'
    const sequence = 0
    const userId = '0x123'

    const address = sequencer.push(ram, seq, value, sequence, userId)
    expect(ram.get(address)).toEqual({
      value: 'Hello world',
      createdBy: userId,
      lastUpdatedBy: userId,
      version: 0,
    })
  })
  it('should push three elements in order by the same user', () => {
    const ram = new Ram()
    const seq = sequencer.create()
    const userId = '0x123'

    const value = 'Hello world'
    const sequence = 0
    const address = sequencer.push(ram, seq, value, sequence, userId)

    const value2 = 'The world says hello back'
    const sequence2 = 1
    const address2 = sequencer.push(ram, seq, value2, sequence2, userId)

    const value3 = 'The word is silent'
    const sequence3 = 2
    const address3 = sequencer.push(ram, seq, value3, sequence3, userId)

    expect(seq.references).toEqual([address, address2, address3])
  })
  it('should push three elements in order by different users', () => {
    const ram = new Ram()
    const seq = sequencer.create()
    const userId = '0x456'
    const userId2 = '0x123'

    const value = 'Hello world'
    const sequence = 0
    const address = sequencer.push(ram, seq, value, sequence, userId)

    const value2 = 'The world says hello back'
    const sequence2 = 0
    const address2 = sequencer.push(ram, seq, value2, sequence2, userId2)

    const value3 = 'The word is silent'
    const sequence3 = 1
    const address3 = sequencer.push(ram, seq, value3, sequence3, userId)

    expect(seq.references).toEqual([address, address2, address3])
  })
})
