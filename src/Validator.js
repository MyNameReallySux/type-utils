/* ##########################
  Imports
########################## */

import $ from 'jquery'
import TypeUtils from './TypeUtils'

/* ##########################
  Prototype Functions
########################## */

/* ##########################
  Class Definitions
########################## */

const Patterns = {
	email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
	
	url: /(((htt|ft)?ps?)?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
	full_url: /(((htt|ft)?ps?):\/\/)(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
	local_url: /(\/?[\w-]+)(\/[\w-]+)*(.[\w-]+)?/,
	absolute_url: /(\/)([\w-]*)?(\/[\w-]*)*(.[a-zA-Z]+)|(((htt|ft)?ps?):\/\/)(www\.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
	relative_url: /((\.\.?\/)*?[\w-]+)(\/[\w-]+)*(.[\w-]+)?/
}

class Validator {
	constructor(setDefaults = true){
		this.fields = {}
		if(setDefaults) this.setDefaults()
	}
	
	setDefaults(){
		this.define('email', {
			type: 'string',
			pattern: Patterns.email
		})
		
		this.define('url', {
			type: 'string',
			pattern: Patterns.url,
			functionName: 'isValidURL'
		})
		
		this.define('full_url', {
			type: 'string',
			pattern: Patterns.full_url,
			functionName: 'isFullURL'
		})
		
		this.define('relative_url', {
			type: 'string',
			pattern: Patterns.relative_url,
			functionName: 'isRelativeURL'
		})
		
		this.define('absolute_url', {
			type: 'string',
			pattern: Patterns.absolute_url,
			functionName: 'isAbsoluteURL'
		})
		
		this.define('local_url', {
			type: 'string',
			pattern: Patterns.local_url,
			functionName: 'isLocalURL'
		})
	}
	
	/* =================================== */

	createValidator(key, options){
		let type = this.checkValidatorType(options)
		this.fields[key] = this.appendDefaults(options, type)
		this.fields[key].meta = {}
		this.fields[key].requirements = {}
	}

	updateValidator(key, options){
		let field = this.fields[key]
		field = Object.assign({}, field, options)
	}
	
	deleteValidator(key){
		this.fields[key] = undefined
	}
	
	checkValidatorType(options){
		let hasTypeProperty = options.hasOwnProperty('type')
		if(hasTypeProperty) {
			return options.type
		} else {
			throw new Error("Custom Validator must have 'type' property passed in, should be [string|number]")
		} 
	}

	appendDefaults(options, type){
		if(Validator.defaults.hasOwnProperty(type)){
			return Object.assign({}, options, Validator.defaults[type], Validator.defaults.meta)
		} else {
			throw new Error('Passed in type is not valid, should be [string|number]')
		}
	}
	
	generateCustomFunction(key, options){
		let functionName = this.fields[key].functionName
		
		let hasCustomFunction = this.hasOwnProperty(functionName)
		if(!hasCustomFunction){
			this[functionName] = (test) => {
				return this.isValid(test, key)
			}
		}
	}
	
	handleOptions(key, options){
		let metaProps = [
			'type', 'displayName', 'functionName'
		]
		let requirementProps = [
			'required', 'min', 'max', 'pattern', 'patterns', 'predicate', 'predicates'
		]
		let merged = metaProps.concat(requirementProps)
		
		this.handleMeta(key, options)
		this.handlePatterns(key, options)
		this.handlePredicates(key, options)
		this.generateCustomFunction(key, options)
		
		this.fields[key] = (function(options){
			let reworked = {
				meta: {}, 
				requirements: {}
			}
			for(let key of Object.keys(options)){
				let isMetaProp = metaProps.contains(key)
				let isRequirementProp = requirementProps.contains(key)
				if(isMetaProp){
					reworked.meta[key] = options[key]
				}
				if(isRequirementProp){
					reworked.requirements[key] = options[key]
				}
				if(isMetaProp || isRequirementProp){
					delete options[key]
				}
			}
			return reworked
		}(options))
		
		
	}
	
	handleMeta(key, options){
		this.fields[key].displayName =  TypeUtils.isUndefined(options.displayName)  ? key.toReadable().capitalize() : options.displayName
		this.fields[key].functionName = TypeUtils.isUndefined(options.functionName) ? `isValid${key.toCamelCase().capitalize()}` : options.functionName
	}
	
	handlePatterns(key, options){
		let patterns = options.pattern || options.patterns
		let type = TypeUtils.getType(patterns)
		
		switch(type){
			case 'regexp':
			case 'undefined': {
				// Do Nothing
			} break;
			case 'string': {
				patterns = Patterns[patterns] || undefined
			} break;
			case 'array': {
				for(let pattern in patterns){
					let pType = TypeUtils.getType(pattern)
					switch(pType){
						case 'regexp':
						case 'undefined': {
							// Do Nothing
						} break;
						case 'string': {
							pattern = Patterns[pattern] || undefined
						} break;
						default: {
							throw new Error(`Cannot define validator with pattern of type ${pType}, must be [string|regexp]`)
						}
					}
				}
			} break;
			
			default: {
				throw new Error(`Cannot define validator with pattern of type ${type}, must be [string|regexp]`)
			}
		}
	}
	
	handlePredicates(key, options){
		let predicates = options.predicate || options.predicates
		let type = TypeUtils.getType(predicates)
		
		switch(type){
			case 'function':
			case 'undefined': {
				// Do Nothing
			} break;
			case 'array': {
				for(let predicate in predicates){
					let pType = TypeUtils.getType(predicate)
					switch(pType){
						case 'function':
						case 'undefined': {
							// Do Nothing
						} break;
						default: {
							throw new Error(`Cannot define validator with predicate of type ${pType}, must be [function]`)
						}
					}
				}
			} break;
			default: {
				throw new Error(`Cannot define validator with predicate of type ${type}, must be [function]`)
			}
		}
	}
	
	/* =================================== */
	
	define(key, options = {}){
		let validatorExists = this.hasOwnProperty(key)
		
		if(!validatorExists){
			this.createValidator(key, options)
		} else {
			this.updateValidator(key, options)
		}
		
		this.handleOptions(key, options)
	}
	
	isValid(test, key){
		/* ##########################
		  Local Functions
		########################## */
		
		function _handleString(){
			const defaults = Validator.defaults.string
			const isEmpty = TypeUtils.isEmptyString(test)
			
			requirements = Object.assign({}, defaults, requirements)			

			if(TypeUtils.isUndefined(test) || TypeUtils.isNull(test)) {
				errors.push(`${requirements.displayName} field value was undefined or null!`)
			} else {
				if(requirements.required && isEmpty){
					errors.push(`${requirements.displayName} field is required, passed in value was empty!`)
				}
				if(test.length < requirements.min){
					errors.push(`${requirements.displayName}'s field must be a minimum of length ${requirements.min}, was ${test.length}`)
				}
				if(test.length > requirements.max){
					errors.push(`${requirements.displayName}'s field must be a maximum of length ${requirements.min}, was ${test.length}`)
				}
				if(TypeUtils.isRegExp(requirements.pattern) && !requirements.pattern.test(test)){
					errors.push(`${requirements.displayName}'s field did not match the required pattern, was ${test} \n pattern: '${requirements.pattern}'`)
				}
				if(TypeUtils.isArray(requirements.pattern)){
					for(let pattern in requirements.pattern){
						if(TypeUtils.isRegExp(pattern) && !pattern.test(test)){
							errors.push(`${requirements.displayName}'s field did not match one of the required pattern, was ${test} \n pattern: '${requirements.match}'`)
						}
					}
				}
				if(TypeUtils.isFunction(requirements.predicate) && !requirements.predicate()){
					errors.push(`${requirements.displayName}'s field did not match the required predicate, was ${test}'`)
				}
				if(TypeUtils.isArray(requirements.predicate)){
					for(let predicate in requirements.predicate){
						if(TypeUtils.isRegExp(pattern) && !pattern.test(test)){
							errors.push(`${requirements.displayName}'s field did not match one of the required predicates, was ${test}'`)
						}
					}
				}
			}
			
			return errors.length == 0
		}
		
		function _handleNumber(){
			let defaults = Validator.defaults.number
			requirements = Object.assign({}, defaults, requirements)
			
			if(TypeUtils.isUndefined(test) || TypeUtils.isNull(test)) {
				errors.push(`${requirements.displayName} field value was undefined or null!`)
			} else {
				if(requirements.required && isEmpty){
					errors.push(`${requirements.displayName} field is required, passed in value was empty!`)
				}
				if(test < requirements.min) {
					errors.push(`${requirements.displayName}'s field must be a minimum of value ${requirements.min}, was ${test}`)
				}
				if(test > requirements.max){
					errors.push(`${requirements.displayName}'s field must be a maximum of value ${requirements.min}, was ${test}`)
				}
				if(TypeUtils.isFunction(requirements.predicate) && !requirements.predicate()){
					errors.push(`${requirements.displayName}'s field did not match the required predicate, was ${test}'`)
				}
				if(TypeUtils.isArray(requirements.predicate)){
					for(let predicate in requirements.predicate){
						if(TypeUtils.isRegExp(pattern) && !pattern.test(test)){
							errors.push(`${requirements.displayName}'s field did not match one of the required predicates, was ${test}'`)
						}
					}
				}
			}
		}
		
		function _handleResults(){
			try {
				if(errors.length > 0){
					throw new Error(errors)
				}	
				this.lastTest = {}
				this.lastTest.status == 'success'
				return true
			} catch(e){
				this.lastTest = {}
				this.lastTest.status == 'failure'
				this.lastTest.error = e.message
				return false
			}
		}
		
		/* ##########################
		  Procedure
		########################## */
		
		let requirements = this.fields[key].requirements
		let meta = 		   this.fields[key].meta
		const errors = []
				
		let handleString  = _handleString.bind(this)
		let handleNumber  = _handleNumber.bind(this)
		let handleResults = _handleResults.bind(this)
		
		if(!meta.hasOwnProperty('type')) throw new Error(`Custom validator '${key}' does not have a 'type' property. Should be [string|number].`)
		
		switch(meta.type){
			case 'string': {
				handleString()
			} break;
			case 'number': {
				handleNumber()
			} break;
			default: {
				errors.push(`Custom validator '${key}' does not have a valid 'type' property. Should be [string|number], was ${requirements.type}`)
			}
		}

		return handleResults()
		
		
	}
}
Validator.defaults = {
	meta: {
		type: 'string',
		functionName: undefined,
		displayName: undefined
	},
	string: {
		min: 0,
		max: 250,
		pattern: undefined,
		predicate: undefined
	},
	number: {
		min: 0,
		max: 255,
		predicate: undefined
	}
}
export default Validator
export {
	Validator
}