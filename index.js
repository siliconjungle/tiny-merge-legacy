import { deepCopy, generateRandomId } from './utils.js'

const ram = {}

export const get = (address) => {
  return ram[address] ?? null
}

export const shouldUpdate = (address, version, userId) => {
  const crdt = get(address)

  if (crdt.version < version) {
    return false
  }

  if (crdt.version === version) {
    if (crdt.lastUpdatedBy === userId) {
      return false
    }

    if (crdt.lastUpdatedBy < userId) {
      return false
    }
  }

  return true
}

export const set = (value, userId, version = 0, address = generateRandomId()) => {
  const crdt = get(address)
  if (crdt) {
    if (shouldUpdate) {
      ram[address] = {
        value,
        version,
        createdBy: crdt.createdBy,
        lastUpdatedBy: userId,
      }
    }
  } else {
    ram[address] = {
      value,
      version,
      createdBy: userId,
      lastUpdatedBy: userId,
    }
  }
}

export const getLocalChanges = (address, value, user) => {
  const crdt = get(address)
  if (crdt) {
    if (deepCopy(crdt.value) === deepCopy(value)) {
      return null
    }
    return {
      type: 'set',
      address,
      value,
      version: crdt.version + 1,
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
