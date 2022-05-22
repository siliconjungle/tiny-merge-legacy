import EventEmitter from 'events'
import { createRandomId } from './utils.js'
import * as tiny from './tiny-pairs.js'

class Ram {
  constructor() {
    this.emitter = new EventEmitter()
    this.emitter.setMaxListeners(0)
    this.store = {}
  }

  get (address) {
    return this.store[address] ?? null
  }

  set (value, serverId, serverVersion, userId, userVersion = 0, address = createRandomId()) {
    const datum = this.get(address)
    let hasUpdated = false

    if (datum) {
      this.store[address] = tiny.update(datum, value, serverVersion, serverId, userVersion, userId)

      const { version: oldVersion, lastUpdatedBy } = datum

      if (
        oldVersion.serverVersion !== serverVersion ||
        oldVersion.userVersion !== userVersion ||
        lastUpdatedBy.serverId !== serverId ||
        lastUpdatedBy.userId !== userId
      ) {
        hasUpdated = true
      }
    } else {
      this.store[address] = tiny.create(value, serverId, serverVersion, userId, userVersion)
      hasUpdated = true
    }

    if (hasUpdated) {
      this.emitter.emit(
        address,
        address,
        this.store[address]
      )
    }

    return { hasUpdated, address }
  }

  subscribe (address, callback) {
    this.emitter.addListener(address, callback)
  }

  unsubscribe (address, callback) {
    this.emitter.removeListener(address, callback)
  }

  getSubscriptionCount (address) {
    return this.emitter.listenerCount(address)
  }
}

export default Ram
