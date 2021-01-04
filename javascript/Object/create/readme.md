# create
> Object.create()方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__

## 简版实现
```js
const myCreate = (proto, descriptors) => {
  function F() {}
  F.prototype = proto;
  const empty = new F();
  if (typeof descriptors !== 'undefined') {
    Object.defineProperties(empty, descriptors);
  }
  return empty;
};
```
## MDN polyfill
> 尽管在 ES5 中 Object.create支持设置为[[Prototype]]为null，但因为那些ECMAScript5以前版本限制，此 polyfill 无法支持该特性

```js
if (typeof Object.create !== "function") {
  Object.create = function (proto, propertiesObject) {
    if (typeof proto !== 'object' && typeof proto !== 'function') {
      throw new TypeError('Object prototype may only be an Object: ' + proto);
    } else if (proto === null) {
      throw new Error("This browser's implementation of Object.create is a shim and doesn't support 'null' as the first argument.");
    }

    if (typeof propertiesObject !== 'undefined') throw new Error("This browser's implementation of Object.create is a shim and doesn't support a second argument.");

    function F() {}
    F.prototype = proto;

    return new F();
  };
}
```
