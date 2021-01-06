# from

## 实现

```js
if (typeof Array.from === "undefined") {
  Array.from = function from(arrayLike, mapping, ctx) {
    Array.apply(null, arrayLike).map(function (t, i) {
      return mapping.call(this, t, i);
    }, ctx);
  };
}
```
