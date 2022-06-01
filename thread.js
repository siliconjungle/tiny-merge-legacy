export const create = () => {
  return {
    insertedAt: {},
    sequences: {},
    createdBy: {},
  }
}

export const insert = (ram, list, value, userId, sequence, parent) => {
  const { address } = ram.set(value, userId)
  const { insertedAt, sequences, createdBy } = list

  sequences[address] = sequence
  createdBy[address] = userId

  insertedAt[parent] = insertedAt[parent] || []

  if (insertedAt[parent].length === 0) {
    insertedAt[parent].push(address)
  } else {
    insertedAt[parent].splice(insertedAt[parent].findIndex(
      (indexAddress) =>
        sequences[indexAddress] <= sequence && createdBy[indexAddress] < userId
    ), 0, address)
  }

  return address
}
