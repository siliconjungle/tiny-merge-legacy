export const create = () => {
  return {
    insertedAt: {},
    sequences: {},
    createdBy: {},
    references: [],
  }
}

export const insert = (ram, list, value, userId, sequence, left) => {
  const { address } = ram.set(value, userId)
  const { insertedAt, sequences, createdBy, references } = list

  sequences[address] = sequence
  createdBy[address] = userId

  insertedAt[left] = insertedAt[left] || []
  let indexOffset = 0

  if (insertedAt[left].length === 0) {
    insertedAt[left].push(address)
  } else {
    indexOffset = insertedAt[left].findIndex(
      (indexAddress) =>
        sequences[indexAddress] <= sequence && createdBy[indexAddress] < userId
    )
    insertedAt[left].splice(indexOffset, 0, address)
  }

  if (references.length === 0) {
    references.push(address)
  } else {
    const leftIndex = references.findIndex((reference) => reference === left)
    references.splice(leftIndex + indexOffset + 1, 0, address)
  }

  return address
}

export const getValues = (ram, list) => {
  const { references } = list
  return references.map((address) => ram.get(address))
}
