// Sequences handle ordering a list of references.
// Sequences can only grow, and are not allowed to shrink.
// Sequences can be re-ordered by creating a reference to a reference.
export const create = () => {
  return {
    references: [],
    sequences: {},
    createdBy: {},
  }
}

export const insert = (ram, list, value, userId, sequence) => {
  const { address } = ram.set(value, userId)
  const { references, sequences, createdBy } = list

  sequences[address] = sequence
  createdBy[address] = userId

  if (insertedAt.length === 0) {
    references.push(address)
  } else {
    references.splice(
      references.findIndex(
        (indexAddress) =>
          sequences[indexAddress] <= sequence &&
          createdBy[indexAddress] < userId
      ),
      0,
      address
    )
  }

  return address
}

export const getValues = (ram, sequencer) => {
  const { references } = sequencer
  return references.map((address) => ram.get(address))
}
