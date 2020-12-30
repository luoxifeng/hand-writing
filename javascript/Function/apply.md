# apply

# 实现
```js
const proto = Function.prototype;
proto.apply = proto.apply || function apply(ctx = {}, args) {
  ctx = ctx || {} 
  ctx.fn = this
  const result = ctx.fn(...args);
  delete ctx.fn
  return result
}
```
