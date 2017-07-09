const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const assert = require('assert')
const Types = require('../app/js/Types').default
const jQuery = require('jquery')

let $, window, document, html

describe('Types', function(){
  describe('#asString', function(){
    // Boolean Tests
    it("Should return 'boolean' when 'true' is passed in", function(done){
      let test = true
      let result = Types.asString(test)
      assert.equal(result, 'boolean')
      done()
    })
    it("Should return 'boolean' when 'false' is passed in", function(done){
      let test = false
      let result = Types.asString(test)
      assert.equal(result, 'boolean')
      done()
    })
    
    // String Tests
    it("Should return 'string' when 'This is a string' is passed in", function(done){
      let test = 'This is a string'
      let result = Types.asString(test)
      assert.equal(result, 'string')
      done()
    })
    
    // Number Tests
    it("Should return 'number' when '1' is passed in", function(done){
      let test = 1
      let result = Types.asString(test)
      assert.equal(result, 'number')
      done()
    })
    it("Should return 'number' when '-0.5' is passed in", function(done){
      let test = -0.5
      let result = Types.asString(test)
      assert.equal(result, 'number')
      done()
    })
    it("Should return 'number' when 'NaN' is passed in", function(done){
      let test = NaN
      let result = Types.asString(test)
      assert.equal(result, 'number')
      done()
    })
    it("Should return 'number' when 'Infinity' is passed in", function(done){
      let test = Infinity
      let result = Types.asString(test)
      assert.equal(result, 'number')
      done()
    })
    
    // Array Tests
    it("Should return 'array' when an array is passed in", function(done){
      let test = []
      let result = Types.asString(test)
      assert.equal(result, 'array')
      done()
    })
    
    // Object Tests
    it("Should return 'object' when an object is passed in", function(done){
      let test = {}
      let result = Types.asString(test)
      assert.equal(result, 'object')
      done()
    })
    
    it("Should return 'object' when a class instance is passed in", function(done){
      class Test {}
      let test = new Test()
      let result = Types.asString(test)
      assert.equal(result, 'object')
      done()
    })
    
    // Function Tests
    it("Should return 'function' when a function is passed in", function(done){
      let test = function(){}
      let result = Types.asString(test)
      assert.equal(result, 'function')
      done()
    })
    it("Should return 'function' when a lambda is passed in", function(done){
      let test = ()=>{}
      let result = Types.asString(test)
      assert.equal(result, 'function')
      done()
    })
    it("Should return 'function' when a class is passed in", function(done){
      class Test{}
      let test = Test
      let result = Types.asString(test)
      assert.equal(result, 'function')
      done()
    })
    it("Should return 'function' when a method is passed in", function(done){
      class Test {
        method(){}
      }
      let test = (new Test()).method
      let result = Types.asString(test)
      assert.equal(result, 'function')
      done()
    })
    
    // jQuery Tests
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
      let result = Types.asString(test)
      assert.equal(result, 'jquery')    
      done()
    })
  }) 
  describe('Type Checking', function(){
    describe('#isBoolean', function(){
      it("Should return 'true' when 'true' is passed in", function(done){
        let test = true
        let result = Types.isBoolean(test)
        assert.equal(result, true)
        done()
      })

      it("Should return 'true' when 'false' is passed in", function(done){
        let test = false
        let result = Types.isBoolean(test)
        assert.equal(result, true)
        done()
      })

      it("Should return 'false' when anything else is passed in", function(done){
        let tests = [
          1, 'test', [], {}, function(){}, undefined, null
        ]
        let result
        for(let test in tests){
          result = Types.isBoolean(test)
          assert.equal(result, false)
        }      
        done()
      })
    }) 
    describe('#isNumber', function(){
      it("Should return 'true' when '1' is passed in", function(done){
        let test = 1
        let result = Types.isNumber(test)
        assert.equal(result, true)
        done()
      })

      it("Should return 'true' when '-0.5' is passed in", function(done){
        let test = -0.5
        let result = Types.isNumber(test)
        assert.equal(result, true)
        done()
      })

      it("Should return 'true' when 'NaN' is passed in", function(done){
        let test = NaN
        let result = Types.isNumber(test)
        assert.equal(result, true)
        done()
      })

      it("Should return 'true' when 'Infinity' is passed in", function(done){
        let test = Infinity
        let result = Types.isNumber(test)
        assert.equal(result, true)
        done()
      })

      it("Should return 'false' when anything else is passed in", function(done){
        let tests = [
          true, 'test', [], {}, function(){}, undefined, null
        ]
        let result
        for(let test in tests){
          result = Types.isNumber(test)
          assert.equal(result, false)
        }      
        done()
      })
    })
    describe('#isString', function(){
      it("Should return 'true' when 'This is a string' is passed in", function(done){
        let test = "This is a string"
        let result = Types.isString(test)
        assert.equal(result, true)
        done()

      })

      it("Should return 'false' when anything else is passed in", function(done){
        let tests = [
          true, 1, [], {}, function(){}, undefined, null
        ]
        let result
        for(let test in tests){
          result = Types.isBoolean(test)
          assert.equal(result, false)
        }      
        done()
      })
    }) 
    describe('#isArray', function(){
      it("Should return 'true' when an array is passed in", function(done){
        let test = []
        let result = Types.isArray(test)
        assert.equal(result, true)
        done()
      })

      it("Should return 'false' when anything else is passed in", function(done){
        let tests = [
          true, 1, "test", {}, function(){}, undefined, null
        ]
        let result
        for(let test in tests){
          result = Types.isBoolean(test)
          assert.equal(result, false)
        }      
        done()
      })
    }) 
    describe('#isObject', function(){
      it("Should return 'true' when an object is passed in", function(done){
        let test = []
        let result = Types.isObject(test)
        assert.equal(result, true)
        done()
      })

      it("Should return 'true' when a class instance is passed in", function(done){
        class Test {}
        let test = new Test()
        let result = Types.isObject(test)
        assert.equal(result, true)
        done()
      })

      it("Should return 'false' when anything else is passed in", function(done){
        let tests = [
          true, 1, "test", [], function(){}, undefined, null
        ]
        let result
        for(let test in tests){
          result = Types.isObject(test)
          assert.equal(result, false)
        }      
        done()
      })
    })
    describe('#isFunction', function(){
      it("Should return 'true' when a function is passed in", function(done){
        let test = function(){}
        let result = Types.isFunction(test)
        assert.equal(result, true)
        done()
      })

      it("Should return 'true' when a lambda is passed in", function(done){
        let test = ()=>{}
        let result = Types.isFunction(test)
        assert.equal(result, true)
        done()
      })

      it("Should return 'true' when a class is passed in", function(done){
        let test = class Test {}
        let result = Types.isFunction(test)
        assert.equal(result, true)
        done()
      })

      it("Should return 'true' when a method is passed in", function(done){
        class Test { 
          method(){}
        }
        let test = (new Test()).method
        let result = Types.isFunction(test)
        assert.equal(result, true)
        done()
      })

      it("Should return 'false' when anything else is passed in", function(done){
        let tests = [
          true, 1, "test", [], {}, function(){}, null
        ]
        let result
        for(let test in tests){
          result = Types.isObject(test)
          assert.equal(result, false)
        }      
        done()
      })
    })
    describe('#isUndefined', function(){
      it("Should return 'true' when 'undefined' is passed in", function(done){
        let test
        let result = Types.isUndefined(test)
        assert.equal(result, true)
        done()
      })

      it("Should return 'false' when anything else is passed in", function(done){
        let tests = [
          true, 1, "test", [], {}, function(){}, null
        ]
        let result
        for(let test in tests){
          result = Types.isObject(test)
          assert.equal(result, false)
        }      
        done()
      })
    })
    describe('#isNull', function(){
      it("Should return 'true' when 'null' is passed in", function(done){
        let test = null
        let result = Types.isNull(test)
        assert.equal(result, true)
        done()
      })

      it("Should return 'false' when anything else is passed in", function(done){
        let tests = [
          true, 1, "test", [], {}, function(){}, undefined
        ]
        let result
        for(let test in tests){
          result = Types.isObject(test)
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
        assert.equal(result, true)
        done()
      })

      it("Should return 'false' when anything else is passed in", function(done){
        let tests = [
          true, 1, "test", [], {}, function(){}, undefined, null
        ]
        let result
        for(let test in tests){
          result = Types.isJQuery(test)
          assert.equal(result, false)
        }      
        done()
      })
    })
  }) 
  describe('Empty Checking', function(){
    describe('#hasLength', function(){
      it("Should return 'true' when an array is passed in", function(done){
        done()
      })
    })
    describe('#isEmptyString', function(){
      it("Should return 'true' when an empty string is passed in", function(done){
        let test = ''
        let result = Types.isEmptyString(test)
        assert.equal(result, true)
        done()
      })
      it("Should return 'false' when a non empty string is passed in", function(done){
        let test = 'This is a string'
        let result = Types.isEmptyString(test)
        assert.equal(result, false)
        done()
      })

      it("Should return 'undefined' when anything else is passed in", function(done){
        let tests = [
            true, 1, [], {}, function(){}, undefined, null
          ]
          let result
          for(let test of tests){
            result = Types.isEmptyString(test)
            assert.equal(result, undefined)
          }      
          done()
      })
    })
    describe('#isEmptyArray', function(){
      it("Should return 'true' when an empty string is passed in", function(done){
        let test = ''
        let result = Types.isEmptyString(test)
        assert.equal(result, true)
        done()
      })
      it("Should return 'false' when a non empty string is passed in", function(done){
        let test = 'This is a string'
        let result = Types.isEmptyString(test)
        assert.equal(result, false)
        done()
      })

      it("Should return 'undefined' when anything else is passed in", function(done){
        let tests = [
            true, 1, [], {}, function(){}, undefined, null
          ]
          let result
          for(let test of tests){
            result = Types.isEmptyString(test)
            assert.equal(result, undefined)
          }      
          done()
      })
  	})
  })
})