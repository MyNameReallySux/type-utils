import assert from 'assert'
import Validator from '../src/Validator'
import Types from '../src/TypeUtils'


describe('Validator', function(){
	describe('#constructor', function(){
		it("Should be an instance of Validator", function(done){
			let test = new Validator()
			let result = test instanceof Validator
			assert.ok(result)
			done()
		})
	})
	
	describe('Default String Validators', function(){
		let instance

		before(function(){
			instance = new Validator()
		})

		describe('#isValidEmail', function(){
			it("Should return 'true' when 'email@domain.com'", function(done){
				let result = instance.isValidEmail('email@domain.com')
				assert.ok(result)
				done()
			})

			it("Should return 'false' when any non-email is passed in", function(done){
				let tests = [
					'email',
					'email@com',
					'email.com',
					'email@123.com',
					'123@aol.com',
					'123@345.com',
					'123@345.567',
					'email@a123.com'
				]

				let result 

				for(let test in tests){
					result = instance.isValidEmail(test)
					assert.equal(result, false)
				}

				done()
			})
		})

		describe('#isValidURL', function(){
			it("Should return 'true' when 'http://www.domain.com' is passed in", function(done){
				let result = instance.isValidURL('http://www.domain.com')
				assert.ok(result)
				done()
			})

			it("Should return 'true' when 'https://www.domain.com' is passed in", function(done){
				let result = instance.isValidURL('https://www.domain.com')
				assert.ok(result)
				done()
			})

			it("Should return 'true' when 'ftp://www.domain.com' is passed in", function(done){
				let result = instance.isValidURL('ftp://www.domain.com')
				assert.ok(result)
				done()
			})

			it("Should return 'true' when 'www.domain.com' is passed in", function(done){
				let result = instance.isValidURL('www.domain.com')
				assert.ok(result)
				done()
			})

			it("Should return 'true' when 'www.domain.com/page'", function(done){
				let result = instance.isValidURL('https://www.domain.com/page')
				assert.ok(result)
				done()
			})

			it("Should return 'true' when 'www.domain.com/page.html'", function(done){
				let result = instance.isValidURL('https://www.domain.com/page.html')
				assert.ok(result)
				done()
			})

			it("Should return 'false' when any non-url is passed in", function(done){
				let tests = [
					'email',
					'email@com',
					'email.com',
					'email@123.com',
					'123@aol.com',
					'123@345.com',
					'123@345.567',
					'email@a123.com'
				]

				let result 

				for(let test in tests){
					result = instance.isValidURL(test)
					assert.equal(result, false)
				}

				done()
			})
		})

		describe('#isFullURL', function(){
			it("Should return 'true' when 'http://www.domain.com' is passed in", function(done){
				let result = instance.isFullURL('http://www.domain.com')
				assert.ok(result)
				done()
			})

			it("Should return 'true' when 'https://www.domain.com' is passed in", function(done){
				let result = instance.isFullURL('https://www.domain.com')
				assert.ok(result)
				done()
			})

			it("Should return 'true' when 'ftp://www.domain.com' is passed in", function(done){
				let result = instance.isFullURL('ftp://www.domain.com')
				assert.ok(result)
				done()
			})

			it("Should return 'true' when 'http://www.domain.com/page' is passed in", function(done){
				let result = instance.isFullURL('http://www.domain.com/page')
				assert.ok(result)
				done()
			})

			it("Should return 'true' when 'http://www.domain.com/page.html' is passed in", function(done){
				let result = instance.isFullURL('http://www.domain.com/page.html')
				assert.ok(result)
				done()
			})

			it("Should return 'false' when 'www.domain.com' is passed in", function(done){
				let result = instance.isFullURL('www.domain.com')
				assert.equal(result, false)
				done()
			})

			it("Should return 'false' when '/page' is passed in", function(done){
				let result = instance.isFullURL('/page')
				assert.equal(result, false)
				done()
			})

			it("Should return 'false' when './page' is passed in", function(done){
				let result = instance.isFullURL('./page')
				assert.equal(result, false)
				done()
			})


			it("Should return 'false' when any non-url is passed in", function(done){
				let tests = [
					'email',
					'email@com',
					'email.com',
					'email@123.com',
					'123@aol.com',
					'123@345.com',
					'123@345.567',
					'email@a123.com'
				]

				let result 

				for(let test in tests){
					result = instance.isValidURL(test)
					assert.equal(result, false)
				}

				done()
			})
		})
	})
	
	describe('#define', function(){
		describe('Custom String Validator', function(){
		
			let instance

			before(function(){
				instance = new Validator()
				instance.define('firstName', {
					type: 'string',
					required: true,
					min: 3,
					max: 10
				})
			})

			it("Should create a custom function 'isValidFirstName'", function(done){
				let result = instance.hasOwnProperty('isValidFirstName')
				assert.ok(result)
				done()
			})
			it("Should add custom requirements (required: true, min: 3, max: 10)", function(done){
				let requirements = instance.fields['firstName'].requirements
				assert.ok(requirements.required == true)
				assert.ok(requirements.min == 3)
				assert.ok(requirements.max == 10)
				done()
			})
			describe("'isValidFirstName' Test Cases", function(){
				describe("True cases", function(){
					it("'Chris'", function(done){
						let result = instance.isValidFirstName('Chris')
						assert.ok(result)
						done()
					})
					it("'Jon' - minimun length", function(done){
						let result = instance.isValidFirstName('Jon')
						assert.ok(result)
						done()
					})
					it("'Alessandro' - maximum length", function(done){
						let result = instance.isValidFirstName('Alessandro')
						assert.ok(result)
						done()
					})
				})
				describe("False cases", function(){
					it("undefined", function(done){
						let result = instance.isValidFirstName(undefined)
						assert.equal(result, false)
						done()
					})
					it("null", function(done){
						let result = instance.isValidFirstName(null)
						assert.equal(result, false)
						done()
					})
					it("''", function(done){
						let result = instance.isValidFirstName('')
												
						assert.equal(result, false)
						
						let error = instance.lastTest.error
						assert.ok(error.match(/is [Rr]equired/))
						done()
					})
					it("'C'", function(done){
						let result = instance.isValidFirstName('C')
						
						assert.equal(result, false)

						let error = instance.lastTest.error
						assert.ok(error.match(/minimum of length \d+/))
						done()
					})
					it("'Christopher'", function(done){
						let result = instance.isValidFirstName('Christopher')
						assert.equal(result, false)

						let error = instance.lastTest.error
						assert.ok(error.match(/maximum of length \d+/))
						done()
					})	
				})
				
				
			})
			
		})

		describe('Custom Numerical Validator', function(){
			let instance

			before(function(){
				instance = new Validator()
				instance.define('drinkingAge', {
					type: 'number',
					min: 21
				})
			})

			it("Should create a custom function of 'isValidDrinkingAge'", function(done){
				let result = instance.hasOwnProperty('isValidDrinkingAge')
				assert.ok(result)
				done()
			})
			it("Should return 'true' when '21' is passed into 'isValidDrinkingAge' -- min: '21'", function(done){
				let result = instance.isValidDrinkingAge(21)
				assert.ok(result)
				done()
			})
			it("Should return 'false' when '18' is passed into 'isValidDrinkingAge' -- min: '21'", function(done){
				let result = instance.isValidDrinkingAge(18)
				assert.equal(result, false)
				done()
			})
		})
	})	
})