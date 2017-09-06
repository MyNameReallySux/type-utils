'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.TypeUtils = undefined;var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {return typeof obj;} : function (obj) {return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;};var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}(); /* ##########################
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          Imports
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        ########################## */

var _jquery = require('jquery');var _jquery2 = _interopRequireDefault(_jquery);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}

/* ##########################
                                                                                                                                                                                                                                                                                                                                    Class Definitions
                                                                                                                                                                                                                                                                                                                                  ########################## */var

TypeUtils = function () {function TypeUtils() {_classCallCheck(this, TypeUtils);}_createClass(TypeUtils, null, [{ key: 'getType',
		/* ##########################
                                                                                                                                    Get Type
                                                                                                                                  ########################## */value: function getType(

		test) {var types = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : TypeUtils.defaultTypeUtils;
			for (var key in types) {
				if (types.hasOwnProperty(key) && types[key](test)) {
					return key;
				}
			}
		} }, { key: 'getNativeType', value: function getNativeType(

		test) {var types = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : TypeUtils.defaultNativeTypeUtils;
			for (var key in types) {
				if (types.hasOwnProperty(key) && types[key](test)) {
					return key;
				}
			}
		} }, { key: 'getObjectType', value: function getObjectType(

		test) {
			return Object.prototype.toString.call(test);
		}

		/* ##########################
      Is Type
      - natives
    ########################## */ }, { key: 'isArray', value: function isArray(

		test) {
			return typeof Array.isArray === 'function' && Array.isArray(test);
		} }, { key: 'isBoolean', value: function isBoolean(
		test) {
			return typeof test === "boolean" || TypeUtils.getObjectType(test) === '[object Boolean]';
		} }, { key: 'isFunction', value: function isFunction(
		test) {
			return typeof test === 'function' && TypeUtils.getObjectType(test) === '[object Function]';
		} }, { key: 'isNumber', value: function isNumber(
		test) {
			return typeof test === "number" || TypeUtils.getObjectType(test) === '[object Number]';
		} }, { key: 'isObject', value: function isObject(
		test) {
			return test === Object(test) && (typeof test === 'undefined' ? 'undefined' : _typeof(test)) === 'object' && !TypeUtils.isArray(test);
		} }, { key: 'isString', value: function isString(
		test) {
			return typeof test === "string" || TypeUtils.getObjectType(test) === '[object String]';
		} }, { key: 'isSymbol', value: function isSymbol(
		test) {
			return (typeof test === 'undefined' ? 'undefined' : _typeof(test)) === "symbol";
		}

		/* ##########################
      Is Type
      - classes
    ########################## */ }, { key: 'isArgs', value: function isArgs(

		test) {
			return TypeUtils.getObjectType(test) === '[object Arguments]';
		} }, { key: 'isDate', value: function isDate(
		test) {
			return TypeUtils.getObjectType(test) === '[object Date]';
		} }, { key: 'isError', value: function isError(
		test) {
			return test instanceof Error;
		} }, { key: 'isJQuery', value: function isJQuery(
		test) {
			return TypeUtils.isObject(test) && (typeof _jquery2.default === 'undefined' ? 'undefined' : _typeof(_jquery2.default)) != undefined && test.jquery === _jquery2.default.fn.jquery;
		} }, { key: 'isMap', value: function isMap(
		test) {
			return TypeUtils.getObjectType(test) === '[object Map]';
		} }, { key: 'isRegExp', value: function isRegExp(
		test) {
			return TypeUtils.getObjectType(test) === '[object RegExp]';
		} }, { key: 'isSet', value: function isSet(
		test) {
			return TypeUtils.getObjectType(test) === '[object Set]';
		} }, { key: 'isWeakMap', value: function isWeakMap(
		test) {
			return TypeUtils.getObjectType(test) === '[object WeakMap]';
		}

		/* ##########################
      Is Type
      - undefined
    ########################## */ }, { key: 'isUndefined', value: function isUndefined(

		test) {
			return test === undefined || typeof test == 'undefined';
		} }, { key: 'isNull', value: function isNull(
		test) {
			return test === null;
		}

		/* ##########################
      Has Properties
    ########################## */ }, { key: 'hasLength', value: function hasLength(

		test) {
			return test.hasOwnProperty("length");
		}

		/* ##########################
      Is Empty
    ########################## */ }, { key: 'isEmptyString', value: function isEmptyString(

		test) {var strict = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
			if (TypeUtils.isString(test)) {
				test = strict ? test.replace(/\s+/g, '') : test;
				return test.length <= 0;
			} else {
				return undefined;
			}
		} }, { key: 'isEmptyArray', value: function isEmptyArray(

		test) {var strict = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var depth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -1;
			if (TypeUtils.isArray(test)) {
				if (depth === 0) return test.length <= 0;else
				if (depth === -1) depth = TypeUtils.MAX_DEPTH;
				depth = depth - 1;

				if (test.length > 0 && strict) {var _iteratorNormalCompletion = true;var _didIteratorError = false;var _iteratorError = undefined;try {
						for (var _iterator = test[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {var element = _step.value;
							if (!TypeUtils.isEmpty(element, strict, depth)) return false;
						}} catch (err) {_didIteratorError = true;_iteratorError = err;} finally {try {if (!_iteratorNormalCompletion && _iterator.return) {_iterator.return();}} finally {if (_didIteratorError) {throw _iteratorError;}}}
				} else {
					return test.length == 0;
				}
			}
		}

		/* eslint complexity: ["error", 8] */ }, { key: 'isEmptyObject', value: function isEmptyObject(
		test) {var strict = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var depth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -1;
			if (depth === 0)
			return !strict;else
			if (depth === -1) {
				depth = TypeUtils.MAX_DEPTH;
				if (depth === 0)
				depth = depth - 1;

				for (var key in test) {
					if (test.hasOwnProperty(key) && strict) {
						return TypeUtils.isEmpty(test[key]);
					} else if (test.hasOwnProperty(key)) {
						return false;
					}
				}
				return true;
			}
		} }, { key: 'isEmptyJQuery', value: function isEmptyJQuery(

		test) {
			return TypeUtils.isNumber(test.length) && test.length === 0;
		}

		/* eslint complexity: ["error", 11] */ }, { key: 'isEmpty', value: function isEmpty(
		test) {var strict = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;var depth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -1;
			var type = TypeUtils.getType(test);
			var result = void 0;

			switch (type) {
				case 'undefined':
				case 'null':
					result = true;
					break;
				case 'boolean':
				case 'number':
				case 'symbol':
					result = false;
					break;
				case 'string':
					result = TypeUtils.isEmptyString(test, strict);
					break;
				case 'array':
					result = TypeUtils.isEmptyArray(test, strict, depth);
					break;
				case 'object':
					result = TypeUtils.isEmptyObject(test, strict, depth);
					break;
				case 'jquery':
					result = TypeUtils.isEmptyJQuery(test);
					break;
				default:
					result = TypeUtils.isEmptyByProperty(test);}

			return result;
		} }, { key: 'isEmptyByProperty', value: function isEmptyByProperty(
		test) {
			if (!test.hasOwnProperty("isEmpty")) {
				return false;
			}
			return TypeUtils.isBoolean(test.isEmpty) && test.isEmpty;
		} }]);return TypeUtils;}();


TypeUtils.MAX_DEPTH = 21;
TypeUtils.defaultNativeTypeUtils = Object.freeze({
	array: TypeUtils.isArray,
	boolean: TypeUtils.isBoolean,
	function: TypeUtils.isFunction,
	number: TypeUtils.isNumber,
	string: TypeUtils.isString,
	symbol: TypeUtils.isSymbol,
	object: TypeUtils.isObject,

	'undefined': TypeUtils.isUndefined,
	'null': TypeUtils.isNull });

TypeUtils.defaultObjectTypeUtils = Object.freeze({
	args: TypeUtils.isArgs,
	date: TypeUtils.isDate,
	error: TypeUtils.isError,
	jquery: TypeUtils.isJQuery,
	map: TypeUtils.isMap,
	regexp: TypeUtils.isRegExp,
	set: TypeUtils.isSet,
	weakmap: TypeUtils.isWeakMap });

TypeUtils.defaultTypeUtils = Object.assign({}, TypeUtils.defaultObjectTypeUtils, TypeUtils.defaultNativeTypeUtils);

/* ##########################
                                                                                                                      Exports
                                                                                                                    ########################## */exports.default =

TypeUtils;exports.

TypeUtils = TypeUtils;