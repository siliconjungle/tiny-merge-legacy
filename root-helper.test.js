import Ram from './ram.js'
import { PRIMITIVE } from './tiny-types.js'
import { create as createCollection } from './collection.js'
import { create as createDocument } from './document.js'
import {
  setCollectionByKey,
  getCollectionByKey,
  getCollectionKeys,
  setDocumentByKey,
  getDocumentByKey,
  getDocumentKeys,
} from './root-helper.js'

describe('collections', () => {
  it('should set a new collection', () => {
    const ram = new Ram()
    const root = {}

    const userId = '0123456789abcdef'
    const key = 'blogs'
    const collection = createCollection(
      ram,
      {
        title: { type: PRIMITIVE.STRING },
        content: { type: PRIMITIVE.STRING },
      },
      userId,
    )
    const { hasUpdated, address } = setCollectionByKey(ram, root, key, collection, userId)

    expect(hasUpdated).toBe(true)
    expect(root[key]).toEqual(address)
    expect(ram.get(address)).toEqual({
      value: collection,
      version: 0,
      createdBy: userId,
      lastUpdatedBy: userId,
    })
  })
  it('should update an existing collection', () => {
    const ram = new Ram()
    const root = {}

    const userId = '0123456789abcdef'
    const key = 'blogs'
    const collection = createCollection(
      ram,
      {
        title: { type: PRIMITIVE.STRING },
        content: { type: PRIMITIVE.STRING },
      },
      userId,
    )
    const { hasUpdated, address } = setCollectionByKey(ram, root, key, collection, userId)

    expect(hasUpdated).toBe(true)
    expect(root[key]).toEqual(address)
    expect(ram.get(address)).toEqual({
      value: collection,
      version: 0,
      createdBy: userId,
      lastUpdatedBy: userId,
    })
    expect(getCollectionByKey(ram, root, key)).toEqual({
      value: collection,
      version: 0,
      createdBy: userId,
      lastUpdatedBy: userId,
    })

    const userId2 = 'abcdef0123456789'
    const version2 = 1
    const collection2 = createCollection(
      ram,
      {
        title: { type: PRIMITIVE.STRING },
        content: { type: PRIMITIVE.STRING },
        createdAt: { type: PRIMITIVE.STRING },
        lastUpdatedAt: { type: PRIMITIVE.STRING },
      },
      userId2,
    )
    const { hasUpdated: hasUpdated2, address: address2 } = setCollectionByKey(ram, root, key, collection2, userId2, version2)

    expect(hasUpdated2).toBe(true)
    expect(root[key]).toEqual(address2)
    expect(ram.get(address2)).toEqual({
      value: collection2,
      version: 1,
      createdBy: userId,
      lastUpdatedBy: userId2,
    })
    expect(getCollectionByKey(ram, root, key)).toEqual({
      value: collection2,
      version: 1,
      createdBy: userId,
      lastUpdatedBy: userId2,
    })
  })
  it('should return null when getting a non-existing collection', () => {
    const ram = new Ram()
    const root = {}

    expect(getCollectionByKey(ram, root, 'non-existing-key')).toBe(null)
  })
  it ('should return no collection keys', () => {
    const ram = new Ram()
    const root = {}

    expect(getCollectionKeys(root)).toEqual([])
  })
  it('should return collection key blogs', () => {
    const ram = new Ram()
    const root = {}

    const userId = '0123456789abcdef'
    const key = 'blogs'
    const collection = createCollection(
      ram,
      {
        title: { type: PRIMITIVE.STRING },
        content: { type: PRIMITIVE.STRING },
      },
      userId,
    )
    const { hasUpdated, address } = setCollectionByKey(ram, root, key, collection, userId)

    expect(hasUpdated).toBe(true)
    expect(root[key]).toEqual(address)
    expect(ram.get(address)).toEqual({
      value: collection,
      version: 0,
      createdBy: userId,
      lastUpdatedBy: userId,
    })
    expect(getCollectionKeys(root)).toEqual([
      key,
    ])
  })
  it('should return collection key blogs and comments', () => {
    const ram = new Ram()
    const root = {}

    const userId = '0123456789abcdef'
    const key = 'blogs'
    const collection = createCollection(
      ram,
      {
        title: { type: PRIMITIVE.STRING },
        content: { type: PRIMITIVE.STRING },
      },
      userId,
    )

    const key2 = 'comments'
    const collection2 = createCollection(
      ram,
      {
        blogId: { type: PRIMITIVE.STRING },
        message: { type: PRIMITIVE.STRING },
      },
      userId,
    )

    const { hasUpdated } = setCollectionByKey(ram, root, key, collection, userId)
    const { hasUpdated: hasUpdated2 } = setCollectionByKey(ram, root, key2, collection2, userId)

    expect(hasUpdated).toBe(true)
    expect(hasUpdated2).toBe(true)

    expect(getCollectionKeys(root)).toEqual([
      key,
      key2,
    ])
  })
})

describe('documents', () => {
  it('should set a new document', () => {
    const ram = new Ram()
    const root = {}

    const userId = '0123456789abcdef'
    const key = 'blogs'
    const collection = createCollection(
      ram,
      {
        title: { type: PRIMITIVE.STRING },
        content: { type: PRIMITIVE.STRING },
      },
      userId,
    )
    
    const document = createDocument(
      ram,
      {
        title: 'My first blog post',
        content: 'Hello World',
      },
      userId,
    )

    const { hasUpdated, address } = setDocumentByKey(ram, collection, key, document, userId)

    expect(hasUpdated).toBe(true)
    expect(ram.get(address)).toEqual({
      value: document,
      version: 0,
      createdBy: userId,
      lastUpdatedBy: userId,
    })

    expect(getDocumentByKey(ram, collection, key)).toEqual({
      value: document,
      version: 0,
      createdBy: userId,
      lastUpdatedBy: userId,
    })
  })
  it('should update an existing document', () => {
    const ram = new Ram()
    const root = {}

    const userId = '0123456789abcdef'
    const key = 'blogs'
    const collection = createCollection(
      ram,
      {
        title: { type: PRIMITIVE.STRING },
        content: { type: PRIMITIVE.STRING },
      },
      userId,
    )

    const document = createDocument(
      ram,
      {
        title: 'My first blog post',
        content: 'Hello World',
      },
      userId,
    )

    const { hasUpdated, address } = setDocumentByKey(ram, collection, key, document, userId)

    expect(hasUpdated).toBe(true)
    expect(ram.get(address)).toEqual({
      value: document,
      version: 0,
      createdBy: userId,
      lastUpdatedBy: userId,
    })

    const userId2 = 'abcdef0123456789'
    const version2 = 1
    const document2 = createDocument(
      ram,
      {
        title: 'My first blog post',
        content: 'The world says hello back',
      },
      userId2,
    )

    const { hasUpdated: hasUpdated2, address: address2 } = setDocumentByKey(ram, collection, key, document2, userId2, version2)

    expect(hasUpdated2).toBe(true)
    expect(ram.get(address2)).toEqual({
      value: document2,
      version: 1,
      createdBy: userId,
      lastUpdatedBy: userId2,
    })
  })
  it('should return null when getting a non-existing document', () => {
    const ram = new Ram()

    const userId = '0123456789abcdef'
    const key = 'blogs'
    const collection = createCollection(
      ram,
      {
        title: { type: PRIMITIVE.STRING },
        content: { type: PRIMITIVE.STRING },
      },
      userId,
    )

    expect(getDocumentByKey(ram, collection, key)).toBe(null)
  })
  it('should return no document keys', () => {
    const ram = new Ram()

    const userId = '0123456789abcdef'
    const collection = createCollection(
      ram,
      {
        title: { type: PRIMITIVE.STRING },
        content: { type: PRIMITIVE.STRING },
      },
      userId,
    )

    expect(getDocumentKeys(collection)).toEqual([])
  })
  it('should return document key blog', () => {
    const ram = new Ram()

    const userId = '0123456789abcdef'
    const key = 'blogs'
    const collection = createCollection(
      ram,
      {
        title: { type: PRIMITIVE.STRING },
        content: { type: PRIMITIVE.STRING },
      },
      userId,
    )

    const document = createDocument(
      ram,
      {
        title: 'My first blog post',
        content: 'Hello World',
      },
      userId,
    )

    const { hasUpdated, address } = setDocumentByKey(ram, collection, key, document, userId)

    expect(hasUpdated).toBe(true)
    expect(ram.get(address)).toEqual({
      value: document,
      version: 0,
      createdBy: userId,
      lastUpdatedBy: userId,
    })

    expect(getDocumentByKey(ram, collection, key)).toEqual({
      value: document,
      version: 0,
      createdBy: userId,
      lastUpdatedBy: userId,
    })

    expect(getDocumentKeys(collection)).toEqual([
      key,
    ])
  })
})
