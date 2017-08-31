class ObjectUtils {
	static initialize(){
		ObjectUtils.extendedPrototypes = new Map()
	}
	
	static getInstanceProps(instance){
		return Object.getOwnPropertyNames(Object.getPrototypeOf(instance))
	}
	
	static getStaticProps(clazz){
		return Object.getOwnPropertyNames(clazz)
	}
	
	static extendPrototype(clazz, extension){
		if(!ObjectUtils.extendedPrototypes.has(clazz)){
			ObjectUtils.extendedPrototypes.set(clazz, clazz.prototype)
		}
		clazz.prototype = Object.assign({}, extension, clazz.prototype)
	}
	
	static resetPrototype(clazz){
		if(ObjectUtils.extendedPrototypes.has(clazz)){
			clazz.prototype = ObjectUtils.extendedPrototypes.get(clazz)
		}
	}
}

ObjectUtils.initialize()

export default ObjectUtils