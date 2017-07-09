/* ##########################
  Imports
########################## */

import 'babel-polyfill'
import $ from 'jquery'

/* ##########################
  Prototype Functions
########################## */

String.prototype.contains = function(test){
  return this.indexOf(test) > 0
}

/* ##########################
  Class Definitions
########################## */

class Types {
  constructor(){
    this.BOOLEAN = "boolean"
    this.NUMBER = "number"
    this.STRING = "string"
    this.SYMBOL = "symbol"
    this.UNDEFINED = "undefined"
    this.FUNCTION = "function"
  }
  /* ##########################
    Get Type
  ########################## */
  
  /* eslint complexity: ["error", 11] */
  static asString(test){
    if(Types.isUndefined(test)) return 'undefined'
    else if(Types.isNull(test)) return 'null'
    else if(Types.isBoolean(test)) return 'boolean'
    else if(Types.isNumber(test)) return 'number'
    else if(Types.isString(test)) return 'string'
    else if(Types.isSymbol(test)) return 'symbol'
    else if(Types.isArray(test)) return 'array'
    else if(Types.isObject(test)) {
      return Types.isJQuery(test) ? 'jquery' : 'object'
    } else if(Types.isFunction(test)) return 'function'
    else return 'undefined'
  }

  /* ##########################
    Is Type
  ########################## */
  static isBoolean(test) { return typeof test === "boolean" }
  static isNumber(test)  {
    return typeof test === "number" && test !== isNaN(test)
  }
  static isString(test)  { return typeof test === "string"  }
  static isSymbol(test)  { return typeof test === "symbol"  }

  static isArray(test) { return Array.isArray(test) }
  static isFunction(test) { return typeof test === 'function' }
  static isObject(test) {
    return test === null ? false : test.constructor.toString().contains("Object") || typeof test == 'object'
  }

  static isUndefined(test) { return typeof test === "undefined" }
  static isNull(test) { return test === null }

  static isJQuery(test) {
    return Types.isObject(test) && typeof jQuery != undefined ? test instanceof $ : false
  }

  /* ##########################
    Is Empty
  ########################## */
  static hasLength(test){
    return test.hasOwnProperty("length")
  }

  static isEmptyString(test, strict = false){    
    if(Types.isString(test)){
      test = strict ? test.replace(/\s+/g,'') : test      
      return test.length <= 0
    } else {
      return undefined
    }
  }

  static isEmptyArray(test, strict = false, depth = -1){
    if(depth === 0) return test.length <= 0
    else if(depth === -1) depth = Types.MAX_DEPTH
    depth = depth - 1

    if(test.length > 0 && strict){
      for(let element of test){
        if(!Types.isEmpty(element, strict, depth)) return false
      }
    }
    return true
  }

  /* eslint complexity: ["error", 8] */
  static isEmptyObject(test, strict = false, depth = -1){
    if(depth === 0) 
      return !strict
    else if(depth === -1) {
      depth = Types.MAX_DEPTH
      if(depth === 0)
        depth = depth - 1

      for(let key in test) {
        if(test.hasOwnProperty(key) && strict){
          return Types.isEmpty(test[key])
        } else if(test.hasOwnProperty(key)){
          return false
        }
      }
      return true
    }
  }

  static isEmptyJQuery(test){
    return Types.isNumber(test.length) && test.length === 0
  }

  /* eslint complexity: ["error", 11] */
  static isEmpty(test, strict = true, depth = -1){
    const type = Types.asString(test)
    let result
    
    switch (type) {
      case 'undefined':
      case 'null':
        result = true
        break
      case 'boolean':
      case 'number':
      case 'symbol':
        result = false
        break
      case 'string': 
        result = Types.isEmptyString(test, strict)
        break
      case 'array': 
        result = Types.isEmptyArray(test, strict, depth)
        break
      case 'object': 
        result = Types.isEmptyObject(test, strict, depth)
        break
      case 'jquery': 
        result = Types.isEmptyJQuery(test)
        break
      default: 
        result = Types.isEmptyByProperty(test)
    }
    return result
  }
  static isEmptyByProperty(test){
    if(!test.hasOwnProperty("isEmpty")) {
      return false
    }
    return Types.isBoolean(test.isEmpty) && test.isEmpty
  }
}

Types.MAX_DEPTH = 21

/* ##########################
  Exports
########################## */

export default Types