const jsdom = require("jsdom");
const {JSDOM} = jsdom;

const assert = require('assert')
const Types = require('../src/Types').default
const jQuery = require('jquery')

let $, window, document, html

function getTypesArray(exclusion){
	let map = {
		array: [],
		boolean: true,
		function: function(){},
		number: 1,
		string: 'test',
		'null': null,
		'undefined': undefined,
		
		args: (function(){ return arguments })(),
		date: new Date('March 15, 1990'),
		error: (function(){
			try { throw Error('This is a Test') }
			catch(e) { return e }
		})(),
		map: new Map(),
		set: new Set(),
		weakmap: new WeakMap()
	}
	
	if(map.hasOwnProperty(exclusion)) delete map[exclusion]
	return Object.keys(map).map(function(key){ return map[key] })
}

function getNativeTypesArray(exclusion){
	let map = {
		array: [],
		boolean: true,
		function: function(){},
		number: 1,
		string: 'test',
		'null': null,
		'undefined': undefined,
	}
	
	if(map.hasOwnProperty(exclusion)) delete map[exclusion]
	return Object.keys(map).map(function(key){ return map[key] })
}

describe('Types', function(){
	describe('Infer Type', function(){
		describe('#getType', function(){
			describe('Natives (same as #getNativeType())', function(){
				describe('Arrays', function(){
					it("Should return 'array' when an array is passed in", function(done){
						let test = []
						let result = Types.getType(test)
						assert.equal(result, Types.getNativeType(test))
						done()
					})
				})
				describe('Booleans', function(){
					it("Should return 'boolean' when 'true' is passed in", function(done){
						let test = true
						let result = Types.getType(test)
						assert.equal(result, Types.getNativeType(test))
						done()
					})
					it("Should return 'boolean' when 'false' is passed in", function(done){
						let test = false
						let result = Types.getType(test)
						assert.equal(result, Types.getNativeType(test))
						done()
					})
				})
				describe('Functions', function(){
					it("Should return 'function' when a function is passed in", function(done){
						let test = function(){}
						let result = Types.getType(test)
						assert.equal(result, Types.getNativeType(test))
						done()
					})
					it("Should return 'function' when a lambda is passed in", function(done){
						let test = () => {}
						let result = Types.getType(test)
						assert.equal(result, Types.getNativeType(test))
						done()
					})
					it("Should return 'function' when a class is passed in", function(done){
						class Test {}
						let test = Test
						let result = Types.getType(test)
						assert.equal(result, Types.getNativeType(test))
						done()
					})
					it("Should return 'function' when a method is passed in", function(done){
						class Test {
							method(){}
						}
						let test = (new Test()).method
						let result = Types.getType(test)
						assert.equal(result, Types.getNativeType(test))
						done()
					})
				})			
				describe('Numbers', function(){
					it("Should return 'number' when '1' is passed in", function(done){
						let test = 1
						let result = Types.getType(test)
						assert.equal(result, Types.getNativeType(test))
						done()
					})
					it("Should return 'number' when '-0.5' is passed in", function(done){
						let test = -0.5
						let result = Types.getType(test)
						assert.equal(result, Types.getNativeType(test))
						done()
					})
					it("Should return 'number' when 'NaN' is passed in", function(done){
						let test = NaN
						let result = Types.getType(test)
						assert.equal(result, Types.getNativeType(test))
						done()
					})
					it("Should return 'number' when 'Infinity' is passed in", function(done){
						let test = Infinity
						let result = Types.getType(test)
						assert.equal(result, Types.getNativeType(test))
						done()
					})			
				})
				describe('Objects', function(){
					it("Should return 'object' when an object is passed in", function(done){
						let test = {}
						let result = Types.getType(test)
						assert.equal(result, Types.getNativeType(test))
						done()
					})
					it("Should return 'object' when a class instance is passed in", function(done){
						class Test {}
						let test = new Test()
						let result = Types.getType(test)
						assert.equal(result, 'object')
						done()
					})
				})
				describe('Strings', function(){
					it("Should return 'string' when 'This is a string' is passed in", function(done){
						let test = 'This is a string'
						let result = Types.getType(test)
						assert.equal(result, Types.getNativeType(test))
						done()
					})
				})
			})			
			describe('Extended Objects (same as #getExtendedType())', function(){
				describe('Arguments ', function(){
					it("Should return 'args' when an arguments object is passed in", function(done){
						let fcn = function(){
							let test = arguments
							let result = Types.getType(test)
							assert.equal(result, 'args')
							done()
						}
						
						fcn()
					})
				})
				describe('Date', function(){
					it("Should return 'date' when a date object is passed in", function(done){
						let test = new Date('March 15, 1990')
						let result = Types.getType(test)
						assert.equal(result, 'date')
						done()
					})
				})
				describe('Error ', function(){
					it("Should return 'error' when an error object is passed in", function(done){
						let result
						try {
							throw new Error('This is a test')
						} catch(e){
							result = Types.getType(e)
						}

						assert.ok(result)
						done()
					})
				})
				describe('jQuery', function(){
					before(function(){
						window = new JSDOM(html)
						document = window.document
						$ = jQuery
						html = `
						<!DOCTYPE html>
						<html>
						  <body>
							<div id="Test"></div>
						  </body>
						</html>
						`
					})

					it("Should return 'jQuery' when a jQuery object is passed in", function(done){
						let test = $('#div')
						let result = Types.getType(test)
						assert.equal(result, 'jquery')
						done()
					})
				})
				describe('Map', function(){
					it("Should return 'map' when a map object is passed in", function(done){
						let test = new Map()
						let result = Types.getType(test)
						assert.equal(result, 'map')
						done()
					})
				})
				describe('RegExp', function(){
					it("Should return 'regexp' when a RegExp string is passed in", function(done){
						let test = /test/
						let result = Types.getType(test)
						assert.equal(result, 'regexp')
						done()
					})
					it("Should return 'regexp' when a RegExp object is passed in", function(done){
						let test = new RegExp()
						let result = Types.getType(test)
						assert.equal(result, 'regexp')
						done()
					})
				})
				describe('Set', function(){
					it("Should return 'map' when a set object is passed in", function(done){
						let test = new Set()
						let result = Types.getType(test)
						assert.equal(result, 'set')
						done()
					})
				})
				describe('WeakMap', function(){
					it("Should return 'weakmap' when a map object is passed in", function(done){
						let test = new WeakMap()
						let result = Types.getType(test)
						assert.equal(result, 'weakmap')
						done()
					})
				})
			})
		})	
		describe('#getNativeType', function(){
			describe('Arrays', function(){
				it("Should return 'array' when an array is passed in", function(done){
					let test = []
					let result = Types.getNativeType(test)
					assert.equal(result, 'array')
					done()
				})
			})
			describe('Booleans', function(){
				it("Should return 'boolean' when 'true' is passed in", function(done){
					let test = true
					let result = Types.getNativeType(test)
					assert.equal(result, 'boolean')
					done()
				})
				it("Should return 'boolean' when 'false' is passed in", function(done){
					let test = false
					let result = Types.getNativeType(test)
					assert.equal(result, 'boolean')
					done()
				})
			})
			describe('Functions', function(){
				it("Should return 'function' when a function is passed in", function(done){
					let test = function(){}
					let result = Types.getNativeType(test)
					assert.equal(result, 'function')
					done()
				})
				it("Should return 'function' when a lambda is passed in", function(done){
					let test = () => {}
					let result = Types.getNativeType(test)
					assert.equal(result, 'function')
					done()
				})
				it("Should return 'function' when a class is passed in", function(done){
					class Test {}
					let test = Test
					let result = Types.getNativeType(test)
					assert.equal(result, 'function')
					done()
				})
				it("Should return 'function' when a method is passed in", function(done){
					class Test {
						method(){}
					}
					let test = (new Test()).method
					let result = Types.getNativeType(test)
					assert.equal(result, 'function')
					done()
				})
			})
			describe('Strings', function(){
				it("Should return 'string' when 'This is a string' is passed in", function(done){
					let test = 'This is a string'
					let result = Types.getNativeType(test)
					assert.equal(result, 'string')
					done()
				})
			})
			describe('Numbers', function(){
				it("Should return 'number' when '1' is passed in", function(done){
					let test = 1
					let result = Types.getNativeType(test)
					assert.equal(result, 'number')
					done()
				})
				it("Should return 'number' when '-0.5' is passed in", function(done){
					let test = -0.5
					let result = Types.getNativeType(test)
					assert.equal(result, 'number')
					done()
				})
				it("Should return 'number' when 'NaN' is passed in", function(done){
					let test = NaN
					let result = Types.getNativeType(test)
					assert.equal(result, 'number')
					done()
				})
				it("Should return 'number' when 'Infinity' is passed in", function(done){
					let test = Infinity
					let result = Types.getNativeType(test)
					assert.equal(result, 'number')
					done()
				})			
			})
			describe('Objects', function(){
				it("Should return 'object' when an object is passed in", function(done){
					let test = {}
					let result = Types.getNativeType(test)
					assert.equal(result, 'object')
					done()
				})
				it("Should return 'object' when a class instance is passed in", function(done){
					class Test {}
					let test = new Test()
					let result = Types.getNativeType(test)
					assert.equal(result, 'object')
					done()
				})
			})
		})
	})
	describe('Validate Type', function(){
		describe('Natives', function(){
			describe('#isArray', function(){
				it("Should return 'true' when an array is passed in", function(done){
					let test = []
					let result = Types.isArray(test)
					assert.ok(result)
					done()
				})

				it("Should return 'false' when anything else is passed in", function(done){
					let tests = getTypesArray('array')
					let result
					for (let test of tests){
						result = Types.isArray(test)
						assert.equal(result, false)
					}
					done()
				})
			})
			describe('#isBoolean', function(){
				it("Should return 'true' when 'true' is passed in", function(done){
					let test = true
					let result = Types.isBoolean(test)
					assert.ok(result)
					done()
				})

				it("Should return 'true' when 'false' is passed in", function(done){
					let test = false
					let result = Types.isBoolean(test)
					assert.ok(result)
					done()
				})

				it("Should return 'false' when anything else is passed in", function(done){
					let tests = getTypesArray('boolean')
					let result
					for (let test of tests){
						result = Types.isBoolean(test)
						assert.equal(result, false)
					}
					done()
				})
			})
			describe('#isFunction', function(){
				it("Should return 'true' when a function is passed in", function(done){
					let test = function(){}
					let result = Types.isFunction(test)
					assert.ok(result)
					done()
				})

				it("Should return 'true' when a lambda is passed in", function(done){
					let test = () => {}
					let result = Types.isFunction(test)
					assert.ok(result)
					done()
				})

				it("Should return 'true' when a class is passed in", function(done){
					let test = class Test {}
					let result = Types.isFunction(test)
					assert.ok(result)
					done()
				})

				it("Should return 'true' when a method is passed in", function(done){
					class Test {
						method(){}
					}
					let test = (new Test()).method
					let result = Types.isFunction(test)
					assert.ok(result)
					done()
				})

				it("Should return 'false' when anything else is passed in", function(done){
					let tests = getTypesArray('function')
					let result
					for (let test of tests){
						result = Types.isFunction(test)
						assert.equal(result, false)
					}
					done()
				})
			})
			describe('#isNumber', function(){
				it("Should return 'true' when '1' is passed in", function(done){
					let test = 1
					let result = Types.isNumber(test)
					assert.ok(result)
					done()
				})

				it("Should return 'true' when '-0.5' is passed in", function(done){
					let test = -0.5
					let result = Types.isNumber(test)
					assert.ok(result)
					done()
				})

				it("Should return 'true' when 'NaN' is passed in", function(done){
					let test = NaN
					let result = Types.isNumber(test)
					assert.ok(result)
					done()
				})

				it("Should return 'true' when 'Infinity' is passed in", function(done){
					let test = Infinity
					let result = Types.isNumber(test)
					assert.ok(result)
					done()
				})

				it("Should return 'false' when anything else is passed in", function(done){
					let tests = getTypesArray('number')
					let result
					for (let test of tests){
						result = Types.isNumber(test)
						assert.equal(result, false)
					}
					done()
				})
			})
			describe('#isObject', function(){
				it("Should return 'true' when an object is passed in", function(done){
					let test = {}
					let result = Types.isObject(test)
					assert.ok(result)
					done()
				})

				it("Should return 'true' when a class instance is passed in", function(done){
					class Test {}
					let test = new Test()
					let result = Types.isObject(test)
					assert.ok(result)
					done()
				})

				it("Should return 'false' when any other native is passed in", function(done){
					let tests = getNativeTypesArray('object')
					let result
				
					for (let test of tests){
						result = Types.isObject(test)
						assert.equal(result, false)
					}
					done()
				})
			})
			describe('#isString', function(){
				it("Should return 'true' when 'This is a string' is passed in", function(done){
					let test = "This is a string"
					let result = Types.isString(test)
					assert.ok(result)
					done()

				})

				it("Should return 'false' when anything else is passed in", function(done){
					let tests = getTypesArray('string')
					let result
					for (let test of tests){
						result = Types.isString(test)
						assert.equal(result, false)
					}
					done()
				})
			})
		})
		describe('Extended Objects', function(){
			describe('#isArgs', function(){
				it("Should return 'true' when an argument object is passed in", function(done){
					let result
					let fcn = function(){
						let test = arguments
						result = Types.isArgs(test)
						assert.ok(result)
						done()
					}

					fcn()
				})
				it("Should return 'false' when anything else is passed in", function(done){
					let tests = getTypesArray('args')
					let result
					for (let test of tests){
						result = Types.isArgs(test)
						assert.equal(result, false)
					}
					done()
				})
			})
			describe('#isDate', function(){
				it("Should return 'true' when a date object is passed in", function(done){
					let test = new Date('March 15, 1990')
					let result = Types.isDate(test)
					assert.ok(result)
					done()
				})
				it("Should return 'false' when anything else is passed in", function(done){
					let tests = getTypesArray('date')
					let result
					for (let test of tests){
						result = Types.isDate(test)
						assert.equal(result, false)
					}
					done()
				})
			})
			describe('#isError', function(){
				it("Should return 'true' when an error object is passed in", function(done){
					let result
					try {
						throw new Error('This is a test')
					} catch(e){
						result = Types.isError(e)
					}

					assert.ok(result)
					done()
				})
				it("Should return 'false' when anything else is passed in", function(done){
					let tests = getTypesArray('error')
					let result
					for (let test of tests){
						result = Types.isError(test)
						assert.equal(result, false)
					}
					done()
				})
			})
			describe('#isJQuery', function(){
				before(function(){
					window = new JSDOM(html)
					document = window.document
					$ = jQuery
					html = `
	  <!DOCTYPE html>
	  <html>
		<body>
		  <div id="Test"></div>
		</body>
	  </html>
	  `
				})

				it("Should return 'true' when a jQuery object is passed in", function(done){
					let test = $('#Test')
					let result = Types.isJQuery(test)
					assert.ok(result)
					done()
				})

				it("Should return 'false' when anything else is passed in", function(done){
					let tests = getTypesArray()
					let result
					for (let test of tests){
						result = Types.isJQuery(test)
						assert.equal(result, false)
					}
					done()
				})
			})
			describe('#isMap', function(){
				it("Should return 'true' when an map object is passed in", function(done){
					let test = new Map()
					let result = Types.isMap(test)
					assert.ok(result)
					done()
				})
				it("Should return 'false' when anything else is passed in", function(done){
					let tests = getTypesArray('map')
					let result
					for (let test of tests){
						result = Types.isMap(test)
						assert.equal(result, false)
					}
					done()
				})
			})
			describe('#isRegExp', function(){
				it("Should return 'true' when a RegExp string is passed in", function(done){
					let test = /test/
					let result = Types.isRegExp(test)
					assert.ok(result)
					done()
				})
				it("Should return 'true' when a RegExp object is passed in", function(done){
					let test = new RegExp()
					let result = Types.isRegExp(test)
					assert.ok(result)
					done()
				})
				it("Should return 'false' when anything else is passed in", function(done){
					let tests = getTypesArray('regexp')
					let result
					for (let test of tests){
						result = Types.isRegExp(test)
						assert.equal(result, false)
					}
					done()
				})
			})
			describe('#isSet', function(){
				it("Should return 'true' when an set object is passed in", function(done){
					let test = new Set()
					let result = Types.isSet(test)
					assert.ok(result)
					done()
				})
				it("Should return 'false' when anything else is passed in", function(done){
					let tests = getTypesArray('set')
					let result
					for (let test of tests){
						result = Types.isSet(test)
						assert.equal(result, false)
					}
					done()
				})
			})
			describe('#isWeakMap', function(){
				it("Should return 'true' when an weakmap object is passed in", function(done){
					let test = new WeakMap()
					let result = Types.isWeakMap(test)
					assert.ok(result)
					done()
				})
				it("Should return 'false' when anything else is passed in", function(done){
					let tests = getTypesArray('weakmap')
					let result
					for (let test of tests){
						result = Types.isWeakMap(test)
						assert.equal(result, false)
					}
					done()
				})
			})
		})
		describe('Null Values', function(){
			describe('#isUndefined', function(){
				it("Should return 'true' when 'undefined' is passed in", function(done){
					let test
					let result = Types.isUndefined(test)
					assert.ok(result)
					done()
				})

				it("Should return 'false' when anything else is passed in", function(done){
					let tests = getTypesArray('undefined')
					let result
					for (let test of tests){
						result = Types.isUndefined(test)
						assert.equal(result, false)
					}
					done()
				})
			})
			describe('#isNull', function(){
				it("Should return 'true' when 'null' is passed in", function(done){
					let test = null
					let result = Types.isNull(test)
					assert.ok(result)
					done()
				})

				it("Should return 'false' when anything else is passed in", function(done){
					let tests = getTypesArray('null')
					let result
					for (let test of tests){
						result = Types.isNull(test)
						assert.equal(result, false)
					}
					done()
				})
			})
		})
	})
	describe('Check Properties', function(){
		describe('#hasLength', function(){
			it("Should return 'true' when an array is passed in", function(done){
				done()
			})
		})
	})
	describe('Check if Empty', function(){
		describe('#isEmptyString', function(){
			it("Should return 'true' when an empty string is passed in", function(done){
				let test = ''
				let result = Types.isEmptyString(test)
				assert.ok(result)
				done()
			})
			it("Should return 'false' when a non empty string is passed in", function(done){
				let test = 'This is a string'
				let result = Types.isEmptyString(test)
				assert.equal(result, false)
				done()
			})

			it("Should return 'undefined' when anything else is passed in", function(done){
				let tests = getTypesArray('string')
				let result
				for (let test of tests){
					result = Types.isEmptyString(test)
					assert.equal(result, undefined)
				}
				done()
			})
		})
		describe('#isEmptyArray', function(){
			it("Should return 'true' when an empty array is passed in", function(done){
				let test = []
				let result = Types.isEmptyArray(test)
				assert.ok(result)
				done()
			})
			it("Should return 'false' when a non empty array is passed in", function(done){
				let test = ['test']
				let result = Types.isEmptyArray(test)
				assert.equal(result, false)
				done()
			})

			it("Should return 'undefined' when anything else is passed in", function(done){
				let tests = getTypesArray('array')
				let result
				for (let test of tests){
					result = Types.isEmptyArray(test)
					assert.equal(result, undefined)
				}
				done()
			})
		})
	})
})