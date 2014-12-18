# After Effects Require

Function `require` compatible with [node.js](http://nodejs.org "Node.js").

## Why?

In After Effects `#include` used for loading dependencies.
It puts all modules to global scope. With `require` it could be avoided.

## Example

```js
#include 'lib/require.js';

var fs      = require('lib/fs');
    data    = fs.readFileSync('name');

alert(data);
```

## License

MIT
