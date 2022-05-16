import { deepCompare, createRandomId } from './utils'

const ram = {}

const OPERATIONS = {
  SET: 'set',
}

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
  const createdBy = datum ? datum.createdBy : userId

  if (datum && !shouldUpdate(address, version, userId)) {
    return null
  }

  ram[address] = {
    value,
    version,
    createdBy,
    lastUpdatedBy: userId,
  }

  return address
}

export const getLocalChanges = (address, value, user) => {
  const datum = get(address)

  if (datum && deepCompare(datum.value, value)) {
    return null
  }

  const version = datum?.version + 1 || 0
  const createdBy = datum?.createdBy || user

  return {
    type: OPERATIONS.SET,
    address,
    value,
    version,
    createdBy,
    lastUpdatedBy: user,
  }
}

export const applyOperation = (operation) => {
  if (operation.type === OPERATIONS.SET) {
    set(operation.value, operation.lastUpdatedBy, operation.version, operation.address)
  }
}
