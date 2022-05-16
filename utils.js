export const deepCopy = (obj) => {
  return JSON.parse(JSON.stringify(obj))
}

export const generateRandomId = () => {
  return Math.random().toString(36).substring(2)
}
