export const PRIMITIVE = {
  STRING: 'string',
  NUMBER: 'number',
  BOOLEAN: 'boolean',
  NULL: 'null',
}

export const isPrimitive = (type, value) => {
  switch (type) {
    case PRIMITIVE.STRING:
      return typeof value === 'string'
    case PRIMITIVE.NUMBER:
      return typeof value === 'number'
    case PRIMITIVE.BOOLEAN:
      return typeof value === 'boolean'
    case PRIMITIVE.NULL:
      return value === null
    default:
      return false
  }
}
