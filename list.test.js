import { create, insert, getValues } from './list'
import Ram from './ram'

describe('list', () => {
  it('create', () => {
    const list = create()
    expect(list).toEqual({
      insertedAt: {},
      sequences: {},
      createdBy: {},
      references: [],
    })
  })
  it('insert', () => {
    const ram = new Ram()
    const list = create()
    const userId = '01x574b'
    let sequence = 0
    const address = insert(ram, list, 'H', userId, sequence, null)
    expect(ram.get(address).value).toEqual('H')
    expect(list).toEqual({
      insertedAt: {
        null: [address],
      },
      sequences: {
        [address]: sequence,
      },
      createdBy: {
        [address]: userId,
      },
      references: [address],
    })
  })
  it('insert multiple elements', () => {
    const ram = new Ram()
    const list = create()
    const userId = '01x574b'
    let sequence = 0
    const address = insert(ram, list, 'H', userId, sequence, null)
    ++sequence
    const address2 = insert(ram, list, 'e', userId, sequence, address)
    ++sequence
    const address3 = insert(ram, list, 'l', userId, sequence, address2)
    expect(list).toEqual({
      insertedAt: {
        null: [address],
        [address]: [address2],
        [address2]: [address3],
      },
      sequences: {
        [address]: 0,
        [address2]: 1,
        [address3]: 2,
      },
      createdBy: {
        [address]: userId,
        [address2]: userId,
        [address3]: userId,
      },
      references: [address, address2, address3],
    })
  })
  it('insert multiple elements out of order', () => {
    const ram = new Ram()
    const list = create()
    const userId = '01x574b'
    const userId2 = '02x564c'
    let sequence = 0
    let sequence2 = 0
    const address = insert(ram, list, 'H', userId, sequence, null)
    ++sequence
    const address2 = insert(ram, list, 'e', userId, sequence, address)
    ++sequence
    const address3 = insert(ram, list, 'l', userId2, sequence2, null)
    expect(list).toEqual({
      insertedAt: {
        null: [address3, address],
        [address]: [address2],
      },
      sequences: {
        [address]: 0,
        [address2]: 1,
        [address3]: 0,
      },
      createdBy: {
        [address]: userId,
        [address2]: userId,
        [address3]: userId2,
      },
      references: [address3, address, address2],
    })
  })
  it('get values', () => {
    const ram = new Ram()
    const list = create()
    const userId = '01x574b'
    let sequence = 0
    const address = insert(ram, list, 'H', userId, sequence, null)
    ++sequence
    insert(ram, list, 'e', userId, sequence, address)
    expect(getValues(ram, list)).toEqual([
      {
        value: 'H',
        createdBy: userId,
        lastUpdatedBy: userId,
        version: 0,
      },
      {
        value: 'e',
        createdBy: userId,
        lastUpdatedBy: userId,
        version: 0,
      },
    ])
  })
})
