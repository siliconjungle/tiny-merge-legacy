import { deepCompare, createRandomId } from './utils'

const ram = {}

export const get = (address) => {
  return ram[address] ?? null
}

export const shouldUpdate = (address, version, userId) => {
  const datum = get(address)

  if (datum.version > version) {
    return false
  }

  if (datum.version === version) {
    if (datum.lastUpdatedBy === userId) {
      return false
    }

    if (datum.lastUpdatedBy > userId) {
      return false
    }
  }

  return true
}

export const set = (value, userId, version = 0, address = createRandomId()) => {
  const datum = get(address)
  if (datum === null) {
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
        createdBy: datum.createdBy,
        lastUpdatedBy: userId,
      }
    }
  }

  return address
}

export const getLocalChanges = (address, value, user) => {
  const datum = get(address)
  if (datum) {
    if (deepCompare(datum.value, value)) {
      return null
    }
    return {
      type: 'set',
      address,
      value,
      version: datum.version + 1,
      createdBy: datum.createdBy,
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

export const applyOperation = (operation) => {
  if (operation.type === 'set') {
    set(operation.value, operation.lastUpdatedBy, operation.version, operation.address)
  }
}
