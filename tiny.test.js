import { create, update, getLocalChanges } from './tiny.js'

describe('tiny create', () => {
  it('should create', () => {
    const userId = '0x123'
    const tiny = create('Hello World', userId)
    expect(tiny).toEqual({
      value: 'Hello World',
      version: 0,
      createdBy: userId,
      lastUpdatedBy: userId,
    })
  })
})

describe('tiny update', () => {
  it('should update when the version number is higher', () => {
    const userId = '0x123'
    const tiny = create('Hello world', userId)
    const updated = update(tiny, 'The world says hello back', 1, userId)
    expect(updated).toEqual({
      value: 'The world says hello back',
      version: 1,
      createdBy: tiny.createdBy,
      lastUpdatedBy: userId,
    })
  })
  it('should update when the version number is equal and the userId is higher', () => {
    const userId = '0x123'
    const tiny = create('Hello world', userId)
    const userId2 = '0x456'
    const updated = update(tiny, 'The world says hello back', 0, userId2)
    expect(updated).toEqual({
      value: 'The world says hello back',
      version: 0,
      createdBy: tiny.createdBy,
      lastUpdatedBy: userId2,
    })
  })
  it('should not update when the version number is equal and the userId is lower', () => {
    const userId = '0x123'
    const tiny = create('Hello world', userId)
    const updated = update(tiny, 'The world says hello back', 0, userId)
    expect(updated).toEqual(null)
  })
  it('should not update when the version number is lower', () => {
    const userId = '0x123'
    const tiny = create('Hello world', userId, 1)
    const updated = update(tiny, 'The world says hello back', 0, userId)
    expect(updated).toEqual(null)
  })
  it('should not update when the version number is equal and the userId is equal', () => {
    const userId = '0x123'
    const tiny = create('Hello world', userId)
    const updated = update(tiny, 'The world says hello back', 0, userId)
    expect(updated).toEqual(null)
  })
})

describe('tiny getLocalChanges', () => {
  it('should get no local changes', () => {
    const userId = '0x123'
    const tiny = create('Hello world', userId)
    const localChanges = getLocalChanges(tiny, 'Hello world', userId)
    expect(localChanges).toEqual(null)
  })
  it('should detect changes', () => {
    const userId = '0x123'
    const tiny = create('Hello world', userId)
    const localChanges = getLocalChanges(
      tiny,
      'The world says hello back',
      userId
    )
    expect(localChanges).toEqual({
      value: 'The world says hello back',
      version: 1,
      userId,
    })
  })
})
