import * as keystore from './keystore.js'
import { setDocumentByKey } from './root-helper'

export const create = (ram, data, userId) => {
  return {
    data: keystore.create(ram, data, userId),
  }
}

export const set = (ram, collection, key, data, userId, version = 0) => {
  const document = create(ram, data, userId)
  return setDocumentByKey(ram, collection, key, document, userId, version)
}

// What should it look like when you get a document?
// Well that depends on if you need to edit the document or not doesn't it? Maybe... it depends on how updates occur.
// You could return json storing values and json storing memory addresses.
// Or you could store json of memory addresses and a flat object of values.
// const document = {
//   data: {
//     name: '0x123',
//     age: '0x456',
//     height: '0x789',
//     weight: '0x101112',
//   },
// }

// Do I just send this and have each field be a separate subscription?
// Do I just send the document subscription and then send the diff of changes as they happen?
// Can you subscribe to some but not all?
// I think there's a single subscription to a document but you can specify the fields which you fetch.
