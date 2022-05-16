# Tiny CRDT
A tiny CRDT implemented in Javascript.

I've tried to make it as small and simple as possible whilst still remaining useful and readable.

The structure is as follows:
- There is a key/value store called ram
- You can get values, set values, check if a value should be set and get local changes.
- It doesn't check each of the individual fields like Shelf does, instead it treats the whole thing as a blob.
- The intent is for this data to be used as RAM and for other data structures to be defined later such as "scene graphs, lists, key / value stores, etc). That's why random id's are assigned as their keys rather than focussing on allowing user's to set their own.
- Types are not compared in the same way as shelf, instead if there is a version conflict, who is selected is entirely based on userId.
- Due to objects being treated as blobs, the diff is not sent and instead the whole object is. This would be fine for something like a list when you're sending the items on push, but wouldn't be as great for other forms of collaboration. The diff's could be sent but a history would be needed to figure out what the state looked like when the user made that change.

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
