#Type Utils

This is a simple, type identification and validation library. This handles both native types, and es6 types, as well as jQuery objects. This is intended to be used imported via Node.js (or a bundler like Webpack for client side).

##Installation

###Using NPM or Yarn
```
npm install '@beautiful-code/type-utils'
yard add '@beautiful-code/type-utils'
```

##Usage

###Basic Usage

```javascript
const TypeUtils = require('@beautiful-code/type-utils').TypeUtils

let o = {},
	a = [1, 2, 3],
	s = 'string',
	m = new Map()
TypeUtils.getType(o) // object
TypeUtils.getType(a) // array
TypeUtils.getType(s) // string
TypeUtils.getType(m) // map
```