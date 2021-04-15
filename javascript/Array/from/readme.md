# from

## 实现

```js
if (!Array.from) {
  Array.from = function from(arrayLike, mapping, ctx) {
    const arr = Array.prototype.slice.call(arrayLike);
    return mapping ? arr.map(function (t, i) {
      return mapping.call(this, t, i);
    }, ctx) : arr
  };
}
```
