import { deepCompare, createRandomId } from './utils'

const ram = {}

export const get = (address) => {
  return ram[address] ?? null
}

export const shouldUpdate = (address, version, userId) => {
  const crdt = get(address)

  if (crdt.version > version) {
    return false
  }

  if (crdt.version === version) {
    if (crdt.lastUpdatedBy === userId) {
      return false
    }

    if (crdt.lastUpdatedBy > userId) {
      return false
    }
  }

  return true
}

export const set = (value, userId, version = 0, address = createRandomId()) => {
  const crdt = get(address)
  if (crdt === null) {
    ram[address] = {
      value,
      version,
      createdBy: userId,
      lastUpdatedBy: userId,
    }
  } else {
    if (shouldUpdate(address, version, userId)) {
      ram[address] = {
        value,
        version,
        createdBy: crdt.createdBy,
        lastUpdatedBy: userId,
      }
    }
  }
}

export const getLocalChanges = (address, value, user) => {
  const crdt = get(address)
  if (crdt) {
    if (deepCompare(crdt.value, value)) {
      return null
    }
    return {
      type: 'set',
      address,
      value,
      version: crdt.version + 1,
      createdBy: crdt.createdBy,
      lastUpdatedBy: user,
    }
  }
  return {
    type: 'set',
    address,
    value,
    version: 0,
    createdBy: user,
    lastUpdatedBy: user,
  }
}
