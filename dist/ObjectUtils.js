"use strict";Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var ObjectUtils = function () {function ObjectUtils() {_classCallCheck(this, ObjectUtils);}_createClass(ObjectUtils, null, [{ key: "initialize", value: function initialize()
		{
			ObjectUtils.extendedPrototypes = new Map();
		} }, { key: "getInstanceProps", value: function getInstanceProps(

		instance) {
			return Object.getOwnPropertyNames(Object.getPrototypeOf(instance));
		} }, { key: "getStaticProps", value: function getStaticProps(

		clazz) {
			return Object.getOwnPropertyNames(clazz);
		} }, { key: "extendPrototype", value: function extendPrototype(

		clazz, extension) {
			if (!ObjectUtils.extendedPrototypes.has(clazz)) {
				ObjectUtils.extendedPrototypes.set(clazz, clazz.prototype);
			}
			clazz.prototype = Object.assign({}, extension, clazz.prototype);
		} }, { key: "resetPrototype", value: function resetPrototype(

		clazz) {
			if (ObjectUtils.extendedPrototypes.has(clazz)) {
				clazz.prototype = ObjectUtils.extendedPrototypes.get(clazz);
			}
		} }]);return ObjectUtils;}();


ObjectUtils.initialize();exports.default =

ObjectUtils;