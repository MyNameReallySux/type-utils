'use strict';Object.defineProperty(exports, "__esModule", { value: true });exports.Validator = undefined;var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}(); /* ##########################
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 Imports
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               ########################## */

var _jquery = require('jquery');var _jquery2 = _interopRequireDefault(_jquery);
var _TypeUtils = require('./TypeUtils');var _TypeUtils2 = _interopRequireDefault(_TypeUtils);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}

/* ##########################
                                                                                                                                                                                                                                                                                                                                                  Prototype Functions
                                                                                                                                                                                                                                                                                                                                                ########################## */

/* ##########################
                                                                                                                                                                                                                                                                                                                                                                                Class Definitions
                                                                                                                                                                                                                                                                                                                                                                              ########################## */

var Patterns = {
	email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,

	url: /(((htt|ft)?ps?)?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
	full_url: /(((htt|ft)?ps?):\/\/)(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
	local_url: /(\/?[\w-]+)(\/[\w-]+)*(.[\w-]+)?/,
	absolute_url: /(\/)([\w-]*)?(\/[\w-]*)*(.[a-zA-Z]+)|(((htt|ft)?ps?):\/\/)(www\.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
	relative_url: /((\.\.?\/)*?[\w-]+)(\/[\w-]+)*(.[\w-]+)?/ };var


Validator = function () {
	function Validator() {var setDefaults = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;_classCallCheck(this, Validator);
		this.fields = {};
		if (setDefaults) this.setDefaults();
	}_createClass(Validator, [{ key: 'setDefaults', value: function setDefaults()

		{
			this.define('email', {
				type: 'string',
				pattern: Patterns.email });


			this.define('url', {
				type: 'string',
				pattern: Patterns.url,
				functionName: 'isValidURL' });


			this.define('full_url', {
				type: 'string',
				pattern: Patterns.full_url,
				functionName: 'isFullURL' });


			this.define('relative_url', {
				type: 'string',
				pattern: Patterns.relative_url,
				functionName: 'isRelativeURL' });


			this.define('absolute_url', {
				type: 'string',
				pattern: Patterns.absolute_url,
				functionName: 'isAbsoluteURL' });


			this.define('local_url', {
				type: 'string',
				pattern: Patterns.local_url,
				functionName: 'isLocalURL' });

		}

		/* =================================== */ }, { key: 'createValidator', value: function createValidator(

		key, options) {
			var type = this.checkValidatorType(options);
			this.fields[key] = this.appendDefaults(options, type);
			this.fields[key].meta = {};
			this.fields[key].requirements = {};
		} }, { key: 'updateValidator', value: function updateValidator(

		key, options) {
			var field = this.fields[key];
			field = Object.assign({}, field, options);
		} }, { key: 'deleteValidator', value: function deleteValidator(

		key) {
			this.fields[key] = undefined;
		} }, { key: 'checkValidatorType', value: function checkValidatorType(

		options) {
			var hasTypeProperty = options.hasOwnProperty('type');
			if (hasTypeProperty) {
				return options.type;
			} else {
				throw new Error("Custom Validator must have 'type' property passed in, should be [string|number]");
			}
		} }, { key: 'appendDefaults', value: function appendDefaults(

		options, type) {
			if (Validator.defaults.hasOwnProperty(type)) {
				return Object.assign({}, options, Validator.defaults[type], Validator.defaults.meta);
			} else {
				throw new Error('Passed in type is not valid, should be [string|number]');
			}
		} }, { key: 'generateCustomFunction', value: function generateCustomFunction(

		key, options) {var _this = this;
			var functionName = this.fields[key].functionName;

			var hasCustomFunction = this.hasOwnProperty(functionName);
			if (!hasCustomFunction) {
				this[functionName] = function (test) {
					return _this.isValid(test, key);
				};
			}
		} }, { key: 'handleOptions', value: function handleOptions(

		key, options) {
			var metaProps = [
			'type', 'displayName', 'functionName'];

			var requirementProps = [
			'required', 'min', 'max', 'pattern', 'patterns', 'predicate', 'predicates'];

			var merged = metaProps.concat(requirementProps);

			this.handleMeta(key, options);
			this.handlePatterns(key, options);
			this.handlePredicates(key, options);
			this.generateCustomFunction(key, options);

			this.fields[key] = function (options) {
				var reworked = {
					meta: {},
					requirements: {} };var _iteratorNormalCompletion = true;var _didIteratorError = false;var _iteratorError = undefined;try {

					for (var _iterator = Object.keys(options)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {var _key = _step.value;
						var isMetaProp = metaProps.contains(_key);
						var isRequirementProp = requirementProps.contains(_key);
						if (isMetaProp) {
							reworked.meta[_key] = options[_key];
						}
						if (isRequirementProp) {
							reworked.requirements[_key] = options[_key];
						}
						if (isMetaProp || isRequirementProp) {
							delete options[_key];
						}
					}} catch (err) {_didIteratorError = true;_iteratorError = err;} finally {try {if (!_iteratorNormalCompletion && _iterator.return) {_iterator.return();}} finally {if (_didIteratorError) {throw _iteratorError;}}}
				return reworked;
			}(options);


		} }, { key: 'handleMeta', value: function handleMeta(

		key, options) {
			this.fields[key].displayName = _TypeUtils2.default.isUndefined(options.displayName) ? key.toReadable().capitalize() : options.displayName;
			this.fields[key].functionName = _TypeUtils2.default.isUndefined(options.functionName) ? 'isValid' + key.toCamelCase().capitalize() : options.functionName;
		} }, { key: 'handlePatterns', value: function handlePatterns(

		key, options) {
			var patterns = options.pattern || options.patterns;
			var type = _TypeUtils2.default.getType(patterns);

			switch (type) {
				case 'regexp':
				case 'undefined':{
						// Do Nothing
					}break;
				case 'string':{
						patterns = Patterns[patterns] || undefined;
					}break;
				case 'array':{
						for (var _pattern in patterns) {
							var pType = _TypeUtils2.default.getType(_pattern);
							switch (pType) {
								case 'regexp':
								case 'undefined':{
										// Do Nothing
									}break;
								case 'string':{
										_pattern = Patterns[_pattern] || undefined;
									}break;
								default:{
										throw new Error('Cannot define validator with pattern of type ' + pType + ', must be [string|regexp]');
									}}

						}
					}break;

				default:{
						throw new Error('Cannot define validator with pattern of type ' + type + ', must be [string|regexp]');
					}}

		} }, { key: 'handlePredicates', value: function handlePredicates(

		key, options) {
			var predicates = options.predicate || options.predicates;
			var type = _TypeUtils2.default.getType(predicates);

			switch (type) {
				case 'function':
				case 'undefined':{
						// Do Nothing
					}break;
				case 'array':{
						for (var predicate in predicates) {
							var pType = _TypeUtils2.default.getType(predicate);
							switch (pType) {
								case 'function':
								case 'undefined':{
										// Do Nothing
									}break;
								default:{
										throw new Error('Cannot define validator with predicate of type ' + pType + ', must be [function]');
									}}

						}
					}break;
				default:{
						throw new Error('Cannot define validator with predicate of type ' + type + ', must be [function]');
					}}

		}

		/* =================================== */ }, { key: 'define', value: function define(

		key) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
			var validatorExists = this.hasOwnProperty(key);

			if (!validatorExists) {
				this.createValidator(key, options);
			} else {
				this.updateValidator(key, options);
			}

			this.handleOptions(key, options);
		} }, { key: 'isValid', value: function isValid(

		test, key) {
			/* ##########################
                Local Functions
              ########################## */

			function _handleString() {
				var defaults = Validator.defaults.string;
				var isEmpty = _TypeUtils2.default.isEmptyString(test);

				requirements = Object.assign({}, defaults, requirements);

				if (_TypeUtils2.default.isUndefined(test) || _TypeUtils2.default.isNull(test)) {
					errors.push(requirements.displayName + ' field value was undefined or null!');
				} else {
					if (requirements.required && isEmpty) {
						errors.push(requirements.displayName + ' field is required, passed in value was empty!');
					}
					if (test.length < requirements.min) {
						errors.push(requirements.displayName + '\'s field must be a minimum of length ' + requirements.min + ', was ' + test.length);
					}
					if (test.length > requirements.max) {
						errors.push(requirements.displayName + '\'s field must be a maximum of length ' + requirements.min + ', was ' + test.length);
					}
					if (_TypeUtils2.default.isRegExp(requirements.pattern) && !requirements.pattern.test(test)) {
						errors.push(requirements.displayName + '\'s field did not match the required pattern, was ' + test + ' \n pattern: \'' + requirements.pattern + '\'');
					}
					if (_TypeUtils2.default.isArray(requirements.pattern)) {
						for (var _pattern2 in requirements.pattern) {
							if (_TypeUtils2.default.isRegExp(_pattern2) && !_pattern2.test(test)) {
								errors.push(requirements.displayName + '\'s field did not match one of the required pattern, was ' + test + ' \n pattern: \'' + requirements.match + '\'');
							}
						}
					}
					if (_TypeUtils2.default.isFunction(requirements.predicate) && !requirements.predicate()) {
						errors.push(requirements.displayName + '\'s field did not match the required predicate, was ' + test + '\'');
					}
					if (_TypeUtils2.default.isArray(requirements.predicate)) {
						for (var predicate in requirements.predicate) {
							if (_TypeUtils2.default.isRegExp(pattern) && !pattern.test(test)) {
								errors.push(requirements.displayName + '\'s field did not match one of the required predicates, was ' + test + '\'');
							}
						}
					}
				}

				return errors.length == 0;
			}

			function _handleNumber() {
				var defaults = Validator.defaults.number;
				requirements = Object.assign({}, defaults, requirements);

				if (_TypeUtils2.default.isUndefined(test) || _TypeUtils2.default.isNull(test)) {
					errors.push(requirements.displayName + ' field value was undefined or null!');
				} else {
					if (requirements.required && isEmpty) {
						errors.push(requirements.displayName + ' field is required, passed in value was empty!');
					}
					if (test < requirements.min) {
						errors.push(requirements.displayName + '\'s field must be a minimum of value ' + requirements.min + ', was ' + test);
					}
					if (test > requirements.max) {
						errors.push(requirements.displayName + '\'s field must be a maximum of value ' + requirements.min + ', was ' + test);
					}
					if (_TypeUtils2.default.isFunction(requirements.predicate) && !requirements.predicate()) {
						errors.push(requirements.displayName + '\'s field did not match the required predicate, was ' + test + '\'');
					}
					if (_TypeUtils2.default.isArray(requirements.predicate)) {
						for (var predicate in requirements.predicate) {
							if (_TypeUtils2.default.isRegExp(pattern) && !pattern.test(test)) {
								errors.push(requirements.displayName + '\'s field did not match one of the required predicates, was ' + test + '\'');
							}
						}
					}
				}
			}

			function _handleResults() {
				try {
					if (errors.length > 0) {
						throw new Error(errors);
					}
					this.lastTest = {};
					this.lastTest.status == 'success';
					return true;
				} catch (e) {
					this.lastTest = {};
					this.lastTest.status == 'failure';
					this.lastTest.error = e.message;
					return false;
				}
			}

			/* ##########################
       Procedure
     ########################## */

			var requirements = this.fields[key].requirements;
			var meta = this.fields[key].meta;
			var errors = [];

			var handleString = _handleString.bind(this);
			var handleNumber = _handleNumber.bind(this);
			var handleResults = _handleResults.bind(this);

			if (!meta.hasOwnProperty('type')) throw new Error('Custom validator \'' + key + '\' does not have a \'type\' property. Should be [string|number].');

			switch (meta.type) {
				case 'string':{
						handleString();
					}break;
				case 'number':{
						handleNumber();
					}break;
				default:{
						errors.push('Custom validator \'' + key + '\' does not have a valid \'type\' property. Should be [string|number], was ' + requirements.type);
					}}


			return handleResults();


		} }]);return Validator;}();

Validator.defaults = {
	meta: {
		type: 'string',
		functionName: undefined,
		displayName: undefined },

	string: {
		min: 0,
		max: 250,
		pattern: undefined,
		predicate: undefined },

	number: {
		min: 0,
		max: 255,
		predicate: undefined } };exports.default =


Validator;exports.

Validator = Validator;