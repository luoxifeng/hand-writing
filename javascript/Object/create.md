# create

## 简版实现

```js
const myCreate = (prototype, descriptors) => {
  const empty = {};
  empty.__proto__ = prototype;
  Object.defineProperties(empty, descriptors);
  return empty;
};
```
