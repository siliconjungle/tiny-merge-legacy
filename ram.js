import EventEmitter from 'events'
import { createRandomId } from './utils.js'
import { create, update } from './tiny.js'

class Ram {
  constructor() {
    this.emitter = new EventEmitter()
    this.emitter.setMaxListeners(0)
    this.store = {}
  }

  get (address) {
    return this.store[address] ?? null
  }

  set (value, userId, version = 0, address = createRandomId()) {
    const datum = this.get(address)
    let hasUpdated = false

    if (datum) {
      this.store = update(datum, value, version, userId)
      hasUpdated = true
    } else {
      const { version: oldVersion, lastUpdatedBy } = datum 
      this.store[address] = create(value, userId, version)

      if (oldVersion !== version || lastUpdatedBy !== userId) {
        hasUpdated = true
      }
    }

    if (hasUpdated) {
      this.emitter.emit(
        address,
        address,
        this.store[address]
      )
    }

    return address
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
