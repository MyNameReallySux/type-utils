/* ##########################
  Imports
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
			if(types.hasOwnProperty(key) && types[key](test)){
				return key
			}
		}
	}
	
	static getNativeType(test, types = TypeUtils.defaultNativeTypeUtils){
		for(let key in types){
			if(types.hasOwnProperty(key) && types[key](test)){
				return key
			}
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
		return typeof Array.isArray === 'function' && Array.isArray(test)
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
		return test === Object(test) && typeof test === 'object' && !TypeUtils.isArray(test)
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
			return undefined
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
			default:
				result = TypeUtils.isEmptyByProperty(test)
		}
		return result
	}
	static isEmptyByProperty(test){
		if (!test.hasOwnProperty("isEmpty")){
			return false
		}
		return test.hasOwnProperty('isEmpty') && TypeUtils.isBoolean(test.isEmpty) && test.isEmpty
	}
}

TypeUtils.MAX_DEPTH = 21
TypeUtils.defaultNativeTypeUtils = Object.freeze({
	array: 		 TypeUtils.isArray,
	boolean: 	 TypeUtils.isBoolean,
	function: 	 TypeUtils.isFunction,
	number: 	 TypeUtils.isNumber,
	string: 	 TypeUtils.isString,
	symbol: 	 TypeUtils.isSymbol,
	object: 	 TypeUtils.isObject,

	'undefined': TypeUtils.isUndefined,
	'null': 	 TypeUtils.isNull
})
TypeUtils.defaultObjectTypeUtils = Object.freeze({
	args: 		 TypeUtils.isArgs,
	date: 		 TypeUtils.isDate,
	error: 		 TypeUtils.isError,
	map: 		 TypeUtils.isMap,
	regexp: 	 TypeUtils.isRegExp,
	set:		 TypeUtils.isSet,
	weakmap:	 TypeUtils.isWeakMap
})
TypeUtils.defaultTypeUtils = Object.assign({}, TypeUtils.defaultObjectTypeUtils, TypeUtils.defaultNativeTypeUtils)

/* ##########################
  Exports
########################## */

let getType = 			TypeUtils.getType,
	getNativeType = 	TypeUtils.getNativeType,
	getObjectType = 	TypeUtils.getObjectType,

	isArray = 			TypeUtils.isArray,
	isBoolean = 		TypeUtils.isBoolean,
	isFunction = 		TypeUtils.isFunction,
	isNumber = 			TypeUtils.isNumber,
	isObject = 			TypeUtils.isObject,
	isString = 			TypeUtils.isString,
	isSymbol = 			TypeUtils.isSymbol,

	isArgs = 			TypeUtils.isArgs,
	isDate = 			TypeUtils.isDate,
	isError = 			TypeUtils.isError,
	isMap = 			TypeUtils.isMap,
	isRegExp = 			TypeUtils.isRegExp,
	isSet = 			TypeUtils.isSet,
	isWeakMap = 		TypeUtils.isWeakMap,

	isUndefined = 		TypeUtils.isUndefined,
	isNull = 			TypeUtils.isNull,

	hasLength =			TypeUtils.hasLength,

	isEmpty = 			TypeUtils.isEmpty,
	isEmptyString = 	TypeUtils.isEmptyString,
	isEmptyArray = 		TypeUtils.isEmptyArray,
	isEmptyObject = 	TypeUtils.isEmptyObject,
	isEmptyByProperty = TypeUtils.isEmptyByProperty

export default TypeUtils
export {
	TypeUtils,
	getType, getNativeType, getObjectType,
	isArray, isBoolean, isFunction, isNumber, isObject, isString, isSymbol, 
	isArgs, isDate, isError, isMap, isRegExp, isSet, isWeakMap, isUndefined, isNull,
	hasLength, isEmpty, isEmptyString, isEmptyArray, isEmptyObject, isEmptyByProperty
}