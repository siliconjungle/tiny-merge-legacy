import { deepCompare } from './utils.js'

export const create = (value, userId, version = 0) => {
  return {
    value,
    version,
    createdBy: userId,
    lastUpdatedBy: userId,
  }
}

export const shouldUpdate = (datum, version, userId) => {
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

export const update = (datum, value, version, userId) => {
  if (!shouldUpdate(datum, version, userId)) {
    return null
  }

  return {
    value,
    version,
    createdBy: datum.createdBy,
    lastUpdatedBy: userId,
  }
}

export const getLocalChanges = (datum, value, userId) => {
  if (deepCompare(datum.value, value)) {
    return null
  }

  return {
    value,
    version: datum.version + 1,
    lastUpdatedBy: userId,
  }
}
