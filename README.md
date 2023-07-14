# Adobe ExtendScript Require

Function `require` compatible with [node.js](http://nodejs.org "Node.js").
Could be used with [es-node](https://github.com/coderaiser/es-node "AE Node").

## Why?

In Adobe ExtendScript `#include` used for loading dependencies.
It puts all modules to global scope. With `require` it could be avoided.

## Example

```js
#include 'lib/require.js';

var dir = File($.fileName).path + '/';
require.dir(dir);

var fs = require('./lib/fs');
var data = fs.readFileSync('./name');

alert(data);
```
## See Also

- [require for MongoDB](https://github.com/coderaiser/mongo-require "Mongo Require")

## License

MIT
