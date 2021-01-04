# Object.assign

> Object.assign() 方法用于将所有可枚举属性的值从一个或多个源对象分配到目标对象。它将返回目标对象。

## 实现

```js
const hasOwn = Object.prototype.hasOwnProperty;
const assign = (target, ...list) => {
  if (target == null) {
    throw new TypeError('Cannot convert undefined or null to object');
  }
  let res = Object(target);

  list.forEach(current => {
    if (t == null) return;
    for (let key in current) {
      hasOwn(current, key) && (res[key] = current[key])
    }
  })

  return res;
};

if (typeof Object.assign !== "function") Object.assign = assign;
```
