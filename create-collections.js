import { CRDT_TYPE, DATA_TYPE } from './tiny-factory.js'
import { createCollection, setCollectionByKey } from './collection.js'
import { createDocument, setDocumentByKey } from './document.js'
import { createKeystore } from './keystore.js'
import Ram from './ram.js'

const ram = new Ram()
const root = createKeystore()

const blogsCollection = createCollection('A collection of blog posts', {
  title: { crdtType: CRDT_TYPE.LIST, options: { dataType: DATA_TYPE.STRING } },
  content: { crdtType: CRDT_TYPE.LIST, options: { dataType: DATA_TYPE.STRING } },
  tags: { crdtType: CRDT_TYPE.SEQUENCER, options: { dataType: DATA_TYPE.STRING } },
})

const blogAddress = setCollectionByKey(ram, root, 'blogs', blogsCollection, 0, '0')

const blog1 = createDocument('Blog 1', {
  title: ['Blog 1'],
  content: ['This is the first blog post'],
  tags: ['introduction'],
})
