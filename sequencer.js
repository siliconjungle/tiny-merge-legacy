// Sequences handle ordering a list of references.
// Sequences can only grow, and are not allowed to shrink.
// Sequences can be re-ordered by creating a reference to a reference.

export const create = () => {
  return {
    references: [],
    sequences: [],
  }
}

export const push = (ram, sequencer, value, sequence, userId) => {
  const { references, sequences } = sequencer
  const { address } = ram.set (value, userId)

  let index = sequences.findIndex(s => s >= sequence)
  if (index === -1) {
    references.push(address)
    sequences.push(sequence)
    return address
  }

  const element = ram.get(references[index])

  while (index < sequences.length && sequences[index] <= sequence && userId < element.createdBy) {
    index++
  }

  references.splice(index, 0, address)
  sequences.splice(index, 0, sequence)
  return address
}

export const getValues = (ram, sequencer) => {
  const { references } = sequencer
  return references.map(address => ram.get(address))
}
