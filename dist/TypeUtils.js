'use strict';var _typeof='function'==typeof Symbol&&'symbol'==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&'function'==typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?'symbol':typeof a},_createClass=function(){function a(a,b){for(var c,d=0;d<b.length;d++)c=b[d],c.enumerable=c.enumerable||!1,c.configurable=!0,'value'in c&&(c.writable=!0),Object.defineProperty(a,c.key,c)}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}();Object.defineProperty(exports,'__esModule',{value:!0});function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError('Cannot call a class as a function')}var







TypeUtils=function(){function a(){_classCallCheck(this,a)}return _createClass(a,null,[{key:'getType',value:function(b)




{var c=1<arguments.length&&void 0!==arguments[1]?arguments[1]:a.defaultTypeUtils;
for(var d in c)
if(c.hasOwnProperty(d)&&c[d](b))
return d;


}},{key:'getNativeType',value:function(b)

{var c=1<arguments.length&&void 0!==arguments[1]?arguments[1]:a.defaultNativeTypeUtils;
for(var d in c)
if(c.hasOwnProperty(d)&&c[d](b))
return d;


}},{key:'getObjectType',value:function(a)

{
return Object.prototype.toString.call(a);
}},{key:'isArray',value:function(a)






{
return'function'==typeof Array.isArray&&Array.isArray(a);
}},{key:'isBoolean',value:function(b)
{
return'boolean'==typeof b||'[object Boolean]'===a.getObjectType(b);
}},{key:'isFunction',value:function(b)
{
return'function'==typeof b&&'[object Function]'===a.getObjectType(b);
}},{key:'isNumber',value:function(b)
{
return'number'==typeof b||'[object Number]'===a.getObjectType(b);
}},{key:'isObject',value:function(b)
{
return b===Object(b)&&'object'===('undefined'==typeof b?'undefined':_typeof(b))&&!a.isArray(b);
}},{key:'isString',value:function(b)
{
return'string'==typeof b||'[object String]'===a.getObjectType(b);
}},{key:'isSymbol',value:function(a)
{
return'symbol'===('undefined'==typeof a?'undefined':_typeof(a));
}},{key:'isArgs',value:function(b)






{
return'[object Arguments]'===a.getObjectType(b);
}},{key:'isDate',value:function(b)
{
return'[object Date]'===a.getObjectType(b);
}},{key:'isError',value:function(a)
{
return a instanceof Error;
}},{key:'isMap',value:function(b)
{
return'[object Map]'===a.getObjectType(b);
}},{key:'isRegExp',value:function(b)
{
return'[object RegExp]'===a.getObjectType(b);
}},{key:'isSet',value:function(b)
{
return'[object Set]'===a.getObjectType(b);
}},{key:'isWeakMap',value:function(b)
{
return'[object WeakMap]'===a.getObjectType(b);
}},{key:'isUndefined',value:function(a)






{
return void 0===a||'undefined'==typeof a;
}},{key:'isNull',value:function(a)
{
return null===a;
}},{key:'hasLength',value:function(a)





{
return a.hasOwnProperty('length');
}},{key:'isEmptyString',value:function(b)





{var c=1<arguments.length&&void 0!==arguments[1]&&arguments[1];return(
a.isString(b)?(
b=c?b.replace(/\s+/g,''):b,
0>=b.length):void 0);



}},{key:'isEmptyArray',value:function(b)

{var c=1<arguments.length&&void 0!==arguments[1]&&arguments[1],d=2<arguments.length&&void 0!==arguments[2]?arguments[2]:-1;
if(a.isArray(b)){
if(0===d)return 0>=b.length;



if(-1===d&&(d=a.MAX_DEPTH),--d,0<b.length&&c){var e=!0,f=!1,g=void 0;try{
for(var h,i,j=b[Symbol.iterator]();!(e=(h=j.next()).done);e=!0)
if(i=h.value,!a.isEmpty(i,c,d))return!1}catch(a){f=!0,g=a}finally{try{!e&&j.return&&j.return()}finally{if(f)throw g}}

}else
return 0==b.length;

}
}},{key:'isEmptyObject',value:function(b)


{var c=1<arguments.length&&void 0!==arguments[1]&&arguments[1],d=2<arguments.length&&void 0!==arguments[2]?arguments[2]:-1;
if(0===d)
return!c;
if(-1===d){




for(var e in d=a.MAX_DEPTH,0===d&&--d,b){
if(b.hasOwnProperty(e)&&c)
return a.isEmpty(b[e]);
if(b.hasOwnProperty(e))
return!1}


return!0;
}
}},{key:'isEmpty',value:function(b)


{var c=1<arguments.length&&void 0!==arguments[1]?arguments[1]:!0,d=2<arguments.length&&void 0!==arguments[2]?arguments[2]:-1,
e=a.getType(b),
f=void 0;























return f='undefined'===e||'null'===e||('boolean'===e||'number'===e||'symbol'===e?!1:'string'===e?a.isEmptyString(b,c):'array'===e?a.isEmptyArray(b,c,d):'object'===e?a.isEmptyObject(b,c,d):a.isEmptyByProperty(b)),f;
}},{key:'isEmptyByProperty',value:function(b)
{return!!
b.hasOwnProperty('isEmpty')&&


b.hasOwnProperty('isEmpty')&&a.isBoolean(b.isEmpty)&&b.isEmpty;
}}]),a}();


TypeUtils.MAX_DEPTH=21,
TypeUtils.defaultNativeTypeUtils=Object.freeze({
array:TypeUtils.isArray,
boolean:TypeUtils.isBoolean,
function:TypeUtils.isFunction,
number:TypeUtils.isNumber,
string:TypeUtils.isString,
symbol:TypeUtils.isSymbol,
object:TypeUtils.isObject,

undefined:TypeUtils.isUndefined,
null:TypeUtils.isNull}),

TypeUtils.defaultObjectTypeUtils=Object.freeze({
args:TypeUtils.isArgs,
date:TypeUtils.isDate,
error:TypeUtils.isError,
map:TypeUtils.isMap,
regexp:TypeUtils.isRegExp,
set:TypeUtils.isSet,
weakmap:TypeUtils.isWeakMap}),

TypeUtils.defaultTypeUtils=Object.assign({},TypeUtils.defaultObjectTypeUtils,TypeUtils.defaultNativeTypeUtils);





var getType=TypeUtils.getType,
getNativeType=TypeUtils.getNativeType,
getObjectType=TypeUtils.getObjectType,

isArray=TypeUtils.isArray,
isBoolean=TypeUtils.isBoolean,
isFunction=TypeUtils.isFunction,
isNumber=TypeUtils.isNumber,
isObject=TypeUtils.isObject,
isString=TypeUtils.isString,
isSymbol=TypeUtils.isSymbol,

isArgs=TypeUtils.isArgs,
isDate=TypeUtils.isDate,
isError=TypeUtils.isError,
isMap=TypeUtils.isMap,
isRegExp=TypeUtils.isRegExp,
isSet=TypeUtils.isSet,
isWeakMap=TypeUtils.isWeakMap,

isUndefined=TypeUtils.isUndefined,
isNull=TypeUtils.isNull,

hasLength=TypeUtils.hasLength,

isEmpty=TypeUtils.isEmpty,
isEmptyString=TypeUtils.isEmptyString,
isEmptyArray=TypeUtils.isEmptyArray,
isEmptyObject=TypeUtils.isEmptyObject,
isEmptyByProperty=TypeUtils.isEmptyByProperty;exports.default=

TypeUtils,exports.

TypeUtils=TypeUtils,exports.
getType=getType,exports.getNativeType=getNativeType,exports.getObjectType=getObjectType,exports.
isArray=isArray,exports.isBoolean=isBoolean,exports.isFunction=isFunction,exports.isNumber=isNumber,exports.isObject=isObject,exports.isString=isString,exports.isSymbol=isSymbol,exports.
isArgs=isArgs,exports.isDate=isDate,exports.isError=isError,exports.isMap=isMap,exports.isRegExp=isRegExp,exports.isSet=isSet,exports.isWeakMap=isWeakMap,exports.isUndefined=isUndefined,exports.isNull=isNull,exports.
hasLength=hasLength,exports.isEmpty=isEmpty,exports.isEmptyString=isEmptyString,exports.isEmptyArray=isEmptyArray,exports.isEmptyObject=isEmptyObject,exports.isEmptyByProperty=isEmptyByProperty;