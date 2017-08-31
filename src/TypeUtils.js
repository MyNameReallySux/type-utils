/* ##########################
  Imports
########################## */

import $ from 'jquery'

/* ##########################
  Prototype Functions
########################## */

/* ##########################
  Class Definitions
########################## */

class TypeUtils {
	/* ##########################
	  Get Type
	########################## */
	
	static getType(test, types = TypeUtils.defaultTypeUtils){
		for(let key in types){
			if(types.hasOwnProperty(key) && types[key](test)) return key
		}
	}
	
	static getNativeType(test, types = TypeUtils.defaultNativeTypeUtils){
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
		return typeof Array.isArray === 'function' && Array.isArray(test) || TypeUtils.getObjectType(test) === '[object Array]'
	}
	static isBoolean(test){
		return typeof test === "boolean" || TypeUtils.getObjectType(test) === '[object Boolean]'
	}
	static isFunction(test){
		return typeof test === 'function' && TypeUtils.getObjectType(test) === '[object Function]'
	}
	static isNumber(test){
		return typeof test === "number" || TypeUtils.getObjectType(test) === '[object Number]'
	}
	static isObject(test){
		if(test === undefined) return false
		if(test === null) return false
		if(TypeUtils.isArray(test)) return false
		return test.constructor.toString().contains("Object") || typeof test == 'object'
	}
	static isString(test){
		return typeof test === "string" || TypeUtils.getObjectType(test) === '[object String]'
	}
	static isSymbol(test){
		return typeof test === "symbol"
	}
	
	/* ##########################
	  Is Type
	  - classes
	########################## */
	
	static isArgs(test){
		return TypeUtils.getObjectType(test) === '[object Arguments]'
	}
	static isDate(test){
		return TypeUtils.getObjectType(test) === '[object Date]'
	}
	static isError(test){
		return test instanceof Error
	}
	static isJQuery(test){
		return TypeUtils.isObject(test) && typeof jQuery != undefined ? test instanceof $ : false
	}
	static isMap(test){
		return TypeUtils.getObjectType(test) === '[object Map]'
	}
	static isRegExp(test){
		return TypeUtils.getObjectType(test) === '[object RegExp]'
	}
	static isSet(test){
		return TypeUtils.getObjectType(test) === '[object Set]'
	}
	static isWeakMap(test){
		return TypeUtils.getObjectType(test) === '[object WeakMap]'
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
		if (TypeUtils.isString(test)){
			test = strict ? test.replace(/\s+/g, '') : test
			return test.length <= 0
		} else {
			return false
		}
	}

	static isEmptyArray(test, strict = false, depth = -1){
		if(TypeUtils.isArray(test)){
			if (depth === 0) return test.length <= 0
			else if (depth === -1) depth = TypeUtils.MAX_DEPTH
			depth = depth - 1
			
			if (test.length > 0 && strict){
				for (let element of test){
					if (!TypeUtils.isEmpty(element, strict, depth)) return false
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
			depth = TypeUtils.MAX_DEPTH
			if (depth === 0)
				depth = depth - 1

			for (let key in test){
				if (test.hasOwnProperty(key) && strict){
					return TypeUtils.isEmpty(test[key])
				} else if (test.hasOwnProperty(key)){
					return false
				}
			}
			return true
		}
	}

	static isEmptyJQuery(test){
		return TypeUtils.isNumber(test.length) && test.length === 0
	}

	/* eslint complexity: ["error", 11] */
	static isEmpty(test, strict = true, depth = -1){
		const type = TypeUtils.getType(test)
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
				result = TypeUtils.isEmptyString(test, strict)
				break
			case 'array':
				result = TypeUtils.isEmptyArray(test, strict, depth)
				break
			case 'object':
				result = TypeUtils.isEmptyObject(test, strict, depth)
				break
			case 'jquery':
				result = TypeUtils.isEmptyJQuery(test)
				break
			default:
				result = TypeUtils.isEmptyByProperty(test)
		}
		return result
	}
	static isEmptyByProperty(test){
		if (!test.hasOwnProperty("isEmpty")){
			return false
		}
		return TypeUtils.isBoolean(test.isEmpty) && test.isEmpty
	}
}

TypeUtils.MAX_DEPTH = 21
TypeUtils.defaultNativeTypeUtils = Object.freeze({
	array: 		 TypeUtils.isArray,
	boolean: 	 TypeUtils.isBoolean,
	function: 	 TypeUtils.isFunction,
	number: 	 TypeUtils.isNumber,
	object: 	 TypeUtils.isObject,
	string: 	 TypeUtils.isString,
	symbol: 	 TypeUtils.isSymbol,
	
	'undefined': TypeUtils.isUndefined,
	'null': 	 TypeUtils.isNull
})
TypeUtils.defaultObjectTypeUtils = Object.freeze({
	args: 		 TypeUtils.isArgs,
	date: 		 TypeUtils.isDate,
	error: 		 TypeUtils.isError,
	jquery: 	 TypeUtils.isJQuery,
	map: 		 TypeUtils.isMap,
	regexp: 	 TypeUtils.isRegExp,
	set:		 TypeUtils.isSet,
	weakmap:	 TypeUtils.isWeakMap
})
TypeUtils.defaultTypeUtils = Object.assign({}, TypeUtils.defaultObjectTypeUtils, TypeUtils.defaultNativeTypeUtils)

/* ##########################
  Exports
########################## */

export default TypeUtils