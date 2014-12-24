# Adobe ExtendScript Require

Function `require` compatible with [node.js](http://nodejs.org "Node.js").
Could be used with [ae-node](https://github.com/coderaiser/ae-node "AE Node").

## Why?

In Adobe ExtendScript `#include` used for loading dependencies.
It puts all modules to global scope. With `require` it could be avoided.

## Example

```js
#include 'lib/require.js';

var fs      = require('lib/fs'),
    data    = fs.readFileSync('name');

alert(data);
```

## License

MIT
