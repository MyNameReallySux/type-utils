import Lingo from '../src/Lingo'
import ObjectUtils from '../src/ObjectUtils'

describe('Lingo', function(){
	it("Debug", function(done){
		console.log(ObjectUtils.getStaticProps(String.prototype))
		console.log(ObjectUtils.getStaticProps(Lingo))
		console.log(ObjectUtils.getInstanceProps(new Lingo()))
		console.log(Object.getOwnPropertyNames(String.prototype))
		done()
	})
})