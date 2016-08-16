# express-cachebust

Cachebust asset paths using an md5 of the file. Zero dependencies. For node 6+.

`npm install express-cachebust`

## Usage

Setting up the middleware:

```js
const express = require('express');
const cachebust = require('express-cachebust');
const app = express();

// cachebust urls going to public directory
app.use(cachebust('/public'));

// serves static assets from /public
app.use('/public/', express.static('./public'));
```

Tokenizing a path:

```js
const tokenizer = cachebust.tokenize(); // take an optional string as root for pathing to assets
tokenizer('/public/sample.jpg'); // '/0e0b7c1729e5e2a96ea027e390ed7ddf/public/sample.jpg'
```

## How it works

The first time a path is created with the `tokenizer` (above), the file is read and an md5 is created of the file. The path is then cached and returned to be used in the view.

The middleware looks for an md5 hash in the path that includes the directory provided. If the hash exists, it's removed and the middleware continues with `next`.

In this way, any file cachebusted gets a unique path that is unique to that file's contents without altering the rest of the middleware stack. This allows for busting to be easily toggled on and off for develpoment and production environments.

## Tests

`npm test`

## Note

Due to the fact that most view engines render synchronously, the `tokenizer` function reads files synchronously to provide the path return value.

This may be a problem if assets/paths are generated dynamically. I recommend only using this for static assets.

## License

MIT License

Copyright (c) 2016 Joseph Clay

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
