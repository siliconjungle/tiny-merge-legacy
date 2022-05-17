import * as keystore from './keystore.js'

export const create = () => {
  return keystore.create()
}

export const getAddressAtPath = (ram, rootAddress, path) => {
  if (path.length === 0) {
    return rootAddress
  }
  const key = path[0]
  const root = ram.get(rootAddress)
  const address = keystore.getChildAddressByKey(root, key)
  if (address === null) {
    return null
  }
  return getAddressAtPath(ram, address, path.slice(1))
}

export const getValueAtPath = (ram, rootAddress, path) => {
  const address = getAddressAtPath(ram, rootAddress, path)
  if (address === null) {
    return null
  }
  return ram.get(address)
}

export const getParentAddressAtPath = (ram, rootAddress, path) => {
  if (path.length === 0) {
    return null
  }
  return getAddressAtPath(ram, rootAddress, path.slice(0, -1))
}

export const setValueAtPath = (ram, rootAddress, path, value, version, userId) => {
  const parentAddress = getParentAddressAtPath(ram, rootAddress, path)
  if (parentAddress === null) {
    return null
  }

  const key = path[path.length - 1]
  const keystore = ram.get(parentAddress)

  if (keystore === null) {
    return
  }

  return keystore.setChildByKey(ram, keystore, key, value, version, userId)
}
