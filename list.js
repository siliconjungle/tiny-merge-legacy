// Works similarly to an append only list, except you can also specify a left element to insert at.
// Each parent has its own sequence numbers that go up separately.
// When a user makes an insertion their sequence is the highest sequence for that left element they've received + 1.
// There are problems with this as it's not eventually consistent.
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
  let leftInsertAddress = left

  if (insertedAt[left].length === 0) {
    insertedAt[left].push(address)
  } else {
    const indexOffset = insertedAt[left].find(
      (indexAddress) =>
        sequences[indexAddress] <= sequence && createdBy[indexAddress] < userId
    )
    insertedAt[left].splice(indexOffset, 0, address)
    leftInsertAddress = insertedAt[left][indexOffset]
  }

  if (references.length === 0) {
    references.push(address)
  } else {
    const leftIndex = references.findIndex((reference) => reference === leftInsertAddress)
    references.splice(leftIndex + 1, 0, address)
  }

  return address
}

export const getValues = (ram, list) => {
  const { references } = list
  return references.map((address) => ram.get(address))
}
