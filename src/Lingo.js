import ObjectUtils from './ObjectUtils'

class Lingo {
	static modifyPrototype() {
		Lingo.STRING_PROTOTYPE = Lingo.STRING_PROTOTYPE || String.prototype
		
		/*
		let staticMethods = Object.getOwnPropertyNames(Lingo)
		for(let { key, value } of staticMethods){
			console.log(`${key}: ${value}`)
		}
		
		let classMethods = Object.getOwnPropertyNames(Object.getPrototypeOf(Lingo))
		for(let { key, value } of classMethods){
			console.log(`${key}: ${value}`)
		}
		*/
		
		String.prototype.contains = function(test){
			return Lingo.contains(this, test)
		}

		String.prototype.capitalize = function(){
			return Lingo.capitalize(this)
		}

		String.prototype.toCamelCase = function(){
			return Lingo.toCamelCase(this)
		}

		String.prototype.toSnakeCase = function(){
			return Lingo.toSnakeCase(this)
		}

		String.prototype.toReadable = function(){
			return Lingo.toReadable(this)
		}

		String.prototype.toWordArray = function(){
			return Lingo.toWordArray(this)
		}
	}

	static resetPrototype() {
		String.prototype = Lingo.STRING_PROTOTYPE
	}
	
	constructor(string){
		this.s = string
	}
	
	/**
	 * Returns if given string contains a specific phrase
	 * @param   {string}  str    Haystack
	 * @param   {string}  phrase Needle
	 * @returns {boolean} If 'str' contains 'phrase'
	 */
	static contains(str, phrase){
		return str.indexOf(phrase) > -1
	}
	/**
	 * Returns if instance value contains a specific phrase
	 * @param   {string}  phrase Needle
	 * @returns {boolean} If 'this.value' contains 'phrase'
	 */
	contains(phrase){
		this.value Lingo.contains(this.value)
		return this
	}
	
	static capitalize(str){
		return str.charAt(0).toUpperCase() + str.substr(1)
	}
	capitalize(){
		this.value = Lingo.capitalize(this.value)
		return this
	}
	
	static toCamelCase(str){
		let words = str.toWordArray()
		for(let word in words){
			word = word.trim()
		}
		return words.join('')
	}
	toCamelCase(){
		this.value = Lingo.toCamelCase(this.value)
		return this
	}

	static toSnakeCase(str){
		let words = this.toWordArray()
		for(let word in words){
			word = word.trim()
		}
		return words.join('_')
	}
	toSnakeCase(){
		this.value = Lingo.toSnakeCase(this.value)
		return this
	}
	
	static toReadable(str){
		return Lingo.toWordArray(str).join('.')
	}
	toReadable(){
		return Lingo.toReadable(this.value)
		return this
	}
	
	static toWordArray(str){
		return this.split(/(?=[A-Z_ ])/g);
	}
	toWordArray(){
		return Lingo.toWordArray(this.value)
		return this
	}
}


//Array.prototype.contains = function(test){
//	return this.indexOf(test) != -1
//}

export default Lingo