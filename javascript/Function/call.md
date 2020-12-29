# call

## 实现

```js
const proto = Function.prototype;

proto.call = proto.call || function call(ctx, ...args) {
  ctx['fn'] = this;
  const result = ctx['fn'](...args);
  delete ctx['fn'];
  return result;
};
```
