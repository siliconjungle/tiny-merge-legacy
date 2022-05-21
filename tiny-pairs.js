import { deepCompare } from './utils.js'

export const create = (value, serverId, serverVersion, userId, userVersion) => {
  return {
    value,
    version: { serverVersion, userVersion },
    createdBy: { serverId, userId},
    lastUpdatedBy: { serverId, userId },
  }
}

export const shouldUpdate = (datum, serverId, serverVersion, userId, userVersion) => {
  if (datum.version.serverVersion > serverVersion) {
    return false
  }

  if (datum.version.serverVersion === serverVersion) {
    if (datum.lastUpdatedBy.serverId === serverId) {
      if (datum.version.userVersion > userVersion) {
        return false
      }

      if (datum.version.userVersion === userVersion) {
        if (datum.lastUpdatedBy.userId === userId) {
          return false
        }

        if (datum.lastUpdatedBy.userId > userId) {
          return false
        }
      }
    }
  }

  return true
}

export const update = (datum, value, serverVersion, serverId, userVersion, userId) => {
  if (!shouldUpdate(datum, serverId, serverVersion, userId, userVersion)) {
    return null
  }

  return {
    value,
    version: { serverVersion, userVersion },
    createdBy: datum.createdBy,
    lastUpdatedBy: { serverId, userId },
  }
}

export const getLocalChanges = (datum, value, userId) => {
  if (deepCompare(datum.value, value)) {
    return null
  }

  return {
    value,
    parentVersion: datum.version.serverVersion,
    userVersion: datum.version.userVersion + 1,
    userId,
  }
}
