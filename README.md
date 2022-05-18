# Tiny Merge
A tiny CRDT implemented in Javascript.

The philosophy behind Tiny Merge is to strategically reduce the functionality of CRDT's in favour of simplicity.

## What future usage will look like for Tiny Merge

### Collections
```
const blogsCollection = collection.create('blogs', {
  title: { type: PRIMITIVE.STRING },
  content: { type: PRIMITIVE.STRING },
  tags: { type: CRDT.SEQUENCER, options: { type: PRIMITIVE.STRING } },
})
```

```
const commentsCollection = collection.create('comments', {
  blogId: { type: PRIMITIVE.STRING },
  message: { type: PRIMITIVE.STRING },
})
```

```
const likesCollection = collection.create('likes', {
  blogId: { type: PRIMITIVE.STRING },
  users: { type: CRDT.KEY_STORE, options: { type: TYPE.BOOLEAN } }
})
```

### Documents
```
  const blogDocument = setDocument(blogsCollection, key, {
    title: 'First blog post',
    content: '# Some blog content',
    tags: ['introduction'],
  })

  applyDocumentOperation(blogDocument, ['tags'], OPERATIONS.SEQUENCER.PUSH, value)
```

### Used with React

```
const [blog, setBlog, applyOperation] = useDocument(collection, key, initialValue)
```

## License
MIT License

Copyright (c) 2022 James Addison

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
