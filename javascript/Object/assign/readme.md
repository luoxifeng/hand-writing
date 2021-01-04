# Object.assign

> Object.assign() 方法用于将所有可枚举属性的值从一个或多个源对象分配到目标对象。它将返回目标对象。

## 实现 
- 版本1 兼容es5
```js
const hasOwn = Object.prototype.hasOwnProperty;
const assign = (target) => {
  if (target == null) {
    throw new TypeError('Cannot convert undefined or null to object');
  }
  const result = Object(target);
  const sources = [].slice.call(arguments, 1)

  sources.forEach(source => {
    if (t == null) return;
    for (let key in source) {
      hasOwn(source, key) && (result[key] = source[key])
    }
  })

  return result;
};

if (typeof Object.assign !== "function") Object.assign = assign;
```
- 版本2 拷贝自有属性描述器
```js
const getOwnPropDesc = Object.getOwnPropertyDescriptor;
const getOwnPropSyms = Object.getOwnPropertySymbols;
const assign = (target, ...sources) => {
  if (target == null) {
    throw new TypeError('Cannot convert undefined or null to object');
  }
  let result = Object(target);

  sources.forEach(source => {
    let descriptors = Object.keys(source)
      .reduce((acc, key) => {
        return (acc[key] = getOwnPropDesc(source, key), acc);
      }, {});

    getOwnPropSyms(source)
      .forEach(source => {
        const desc = getOwnPropDesc(source)
        if (desc.enumerable) descriptors[key] = getOwnPropDesc(source, key)
      });
    Object.defineProperties(result, descriptors);
  });

  return result;
}

if (typeof Object.assign !== "function") Object.assign = assign;
```

