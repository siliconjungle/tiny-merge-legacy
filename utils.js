export const deepCompare = (a, b) => {
  return JSON.stringify(a) === JSON.stringify(b)
}

export const createRandomId = () => {
  return Math.random().toString(36).substring(2)
}
