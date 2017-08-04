/* ##########################
  Imports
########################## */

import 'babel-polyfill'
import $ from 'jquery'

/* ##########################
  Prototype Functions
########################## */

String.prototype.contains = function (test){
	return this.indexOf(test) > 0
}

/* ##########################
  Class Definitions
########################## */

class Types {
	/* ##########################
	  Get Type
	########################## */
	
	static getType(test, types = Types.defaultTypes){
		for(let key in types){
			if(types.hasOwnProperty(key) && types[key](test)) return key
		}
	}
	
	static getNativeType(test, types = Types.defaultNativeTypes){
		for(let key in types){
			if(types.hasOwnProperty(key) && types[key](test)) return key
		}
	}

	static getObjectType(test){
		return Object.prototype.toString.call(test)
	}

	/* ##########################
	  Is Type
	  - natives
	########################## */
	
	static isArray(test){
		return typeof Array.isArray === 'function' && Array.isArray(test) || Types.getObjectType(test) === '[object Array]'
	}
	static isBoolean(test){
		return typeof test === "boolean" || Types.getObjectType(test) === '[object Boolean]'
	}
	static isFunction(test){
		return typeof test === 'function' && Types.getObjectType(test) === '[object Function]'
	}
	static isNumber(test){
		return typeof test === "number" || Types.getObjectType(test) === '[object Number]'
	}
	static isObject(test){
		if(test === undefined) return false
		if(test === null) return false
		if(Types.isArray(test)) return false
		return test.constructor.toString().contains("Object") || typeof test == 'object'
	}
	static isString(test){
		return typeof test === "string" || Types.getObjectType(test) === '[object String]'
	}
	static isSymbol(test){
		return typeof test === "symbol"
	}
	
	/* ##########################
	  Is Type
	  - classes
	########################## */
	
	static isArgs(test){
		return Types.getObjectType(test) === '[object Arguments]'
	}
	static isDate(test){
		return Types.getObjectType(test) === '[object Date]'
	}
	static isError(test){
		return test instanceof Error
	}
	static isJQuery(test){
		return Types.isObject(test) && typeof jQuery != undefined ? test instanceof $ : false
	}
	static isMap(test){
		return Types.getObjectType(test) === '[object Map]'
	}
	static isRegExp(test){
		return Types.getObjectType(test) === '[object RegExp]'
	}
	static isSet(test){
		return Types.getObjectType(test) === '[object Set]'
	}
	static isWeakMap(test){
		return Types.getObjectType(test) === '[object WeakMap]'
	}
	
	/* ##########################
	  Is Type
	  - undefined
	########################## */
	
	static isUndefined(test){
		return test === undefined || typeof test == 'undefined'
	}
	static isNull(test){
		return test === null
	}

	/* ##########################
	  Has Properties
	########################## */
	
	static hasLength(test){
		return test.hasOwnProperty("length")
	}
	
	/* ##########################
	  Is Empty
	########################## */
	
	static isEmptyString(test, strict = false){
		if (Types.isString(test)){
			test = strict ? test.replace(/\s+/g, '') : test
			return test.length <= 0
		} else {
			return false
		}
	}

	static isEmptyArray(test, strict = false, depth = -1){
		if(Types.isArray(test)){
			if (depth === 0) return test.length <= 0
			else if (depth === -1) depth = Types.MAX_DEPTH
			depth = depth - 1
			
			if (test.length > 0 && strict){
				for (let element of test){
					if (!Types.isEmpty(element, strict, depth)) return false
				}
			} else {
				return test.length == 0
			}
		}	
	}

	/* eslint complexity: ["error", 8] */
	static isEmptyObject(test, strict = false, depth = -1){
		if (depth === 0)
			return !strict
		else if (depth === -1){
			depth = Types.MAX_DEPTH
			if (depth === 0)
				depth = depth - 1

			for (let key in test){
				if (test.hasOwnProperty(key) && strict){
					return Types.isEmpty(test[key])
				} else if (test.hasOwnProperty(key)){
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
		const type = Types.getType(test)
		let result

		switch (type){
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
		if (!test.hasOwnProperty("isEmpty")){
			return false
		}
		return Types.isBoolean(test.isEmpty) && test.isEmpty
	}
}

Types.MAX_DEPTH = 21
Types.defaultNativeTypes = Object.freeze({
	array: 		 Types.isArray,
	boolean: 	 Types.isBoolean,
	function: 	 Types.isFunction,
	number: 	 Types.isNumber,
	object: 	 Types.isObject,
	string: 	 Types.isString,
	symbol: 	 Types.isSymbol,
	
	'undefined': Types.isUndefined,
	'null': 	 Types.isNull
})
Types.defaultObjectTypes = Object.freeze({
	args: 		 Types.isArgs,
	date: 		 Types.isDate,
	error: 		 Types.isError,
	jquery: 	 Types.isJQuery,
	map: 		 Types.isMap,
	regexp: 	 Types.isRegExp,
	set:		 Types.isSet,
	weakmap:	 Types.isWeakMap
})
Types.defaultTypes = Object.assign({}, Types.defaultObjectTypes, Types.defaultNativeTypes)

/* ##########################
  Exports
########################## */

export default Types