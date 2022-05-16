import { get, set, shouldUpdate, getLocalChanges } from './'

describe('get', () => {
  it('should return null if the address is not in ram', () => {
    expect(get('not in ram')).toBe(null)
  })

  it('should return the crdt if the address is in ram', () => {
    const address = '0'
    const value = {
      message: 'hello',
    }
    const version = 0
    const userId = '0'
    set(value, userId, version, address)
    expect(get(address)).toEqual({
      value,
      version,
      createdBy: userId,
      lastUpdatedBy: userId,
    })
  })
})

describe('set', () => {
  it('should set the value', () => {
    const address = '1'
    const value = {
      message: 'hello1',
    }
    const version = 0
    const userId = '0'
    set(value, userId, version, address)
    expect(get(address)).toEqual({
      value,
      version,
      createdBy: userId,
      lastUpdatedBy: userId,
    })
  })

  it('should update the value if the address is in ram', () => {
    const address = '2'
    const value = {
      message: 'hello',
    }
    const version = 0
    const userId = '0'
    set(value, userId, version, address)
    const newValue = {
      message: 'hello world',
    }
    const newVersion = 1
    const newUserId = '1'
    set(newValue, newUserId, newVersion, address)
    expect(get(address)).toEqual({
      value: newValue,
      version: newVersion,
      createdBy: userId,
      lastUpdatedBy: newUserId,
    })
  })

  it('should not update the value if the address is in ram and the version is not higher', () => {
    const address = '3'
    const value = {
      message: 'hello',
    }
    const version = 1
    const userId = '0'
    set(value, userId, version, address)
    const newValue = {
      message: 'hello world',
    }
    const newVersion = 0
    const newUserId = '0'
    set(newValue, newUserId, newVersion, address)
    expect(get(address)).toEqual({
      value,
      version,
      createdBy: userId,
      lastUpdatedBy: userId,
    })
  })

  it('should not update the value if the address is in ram and the userId is not higher', () => {
    const address = '4'
    const value = {
      message: 'hello',
    }
    const version = 0
    const userId = '1'
    set(value, userId, version, address)
    const newValue = {
      message: 'hello world',
    }
    const newVersion = 0
    const newUserId = '0'
    set(newValue, newUserId, newVersion, address)
    expect(get(address)).toEqual({
      value,
      version,
      createdBy: userId,
      lastUpdatedBy: userId,
    })
  })
})

describe('shouldUpdate', () => {
  it('should return false if the version is lower', () => {
    const address = '5'
    const value = {
      message: 'hello',
    }
    const version = 1
    const userId = '0'
    set(value, userId, version, address)
    const newValue = {
      message: 'hello world',
    }
    const newVersion = 0
    const newUserId = '1'
    expect(shouldUpdate(address, newVersion, newUserId)).toBe(false)
  })

  it('should return false if the version is equal', () => {
    const address = '6'
    const value = {
      message: 'hello',
    }
    const version = 0
    const userId = '0'
    set(value, userId, version, address)
    const newValue = {
      message: 'hello world',
    }
    const newVersion = 0
    const newUserId = '0'
    expect(shouldUpdate(address, newVersion, newUserId)).toBe(false)
  })

  it('should return true if the version is higher', () => {
    const address = '7'
    const value = {
      message: 'hello',
    }
    const version = 0
    const userId = '0'
    set(value, userId, version, address)
    const newValue = {
      message: 'hello world',
    }
    const newVersion = 1
    const newUserId = '1'
    expect(shouldUpdate(address, newVersion, newUserId)).toBe(true)
  })

  it('should return true if the version is equal and the userId is higher', () => {
    const address = '8'
    const value = {
      message: 'hello',
    }
    const version = 0
    const userId = '0'
    set(value, userId, version, address)
    const newValue = {
      message: 'hello world',
    }
    const newVersion = 0
    const newUserId = '1'
    expect(shouldUpdate(address, newVersion, newUserId)).toBe(true)
  })
})

describe('getLocalChanges', () => {
  it('should return null if there are no local changes', () => {
    const address = '9'
    const value = {
      message: 'hello',
    }
    const version = 0
    const userId = '0'
    set(value, userId, version, address)
    expect(getLocalChanges(address, value, userId)).toEqual(null)
  })

  it('should return the local changes if there are local changes', () => {
    const address = '10'
    const value = {
      message: 'hello',
    }
    const version = 0
    const userId = '0'
    set(value, userId, version, address)
    const newValue = {
      message: 'hello world',
    }
    const newUserId = '1'
    expect(getLocalChanges(address, newValue, newUserId)).toEqual({
      type: 'set',
      address,
      value: newValue,
      version: 1,
      createdBy: userId,
      lastUpdatedBy: newUserId,
    })
  })
})
