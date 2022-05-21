import { createRandomId } from './utils.js'

const SERVER_ID = createRandomId()

const convertOtOpToCrdtOp = (op) => {
  const { address, value, parentVersion, userVersion, userId } = op
  return { address, value, serverVersion: parentVersion + 1, serverId: SERVER_ID, userVersion, userId }
}
