# range

## 实现

```js
function range(from, to) {
  var result = [],
    temp = from;

  if (typeof from !== "number" || typeof to !== "number") {
    throw new TypeError("Both arguments to range must be numbers");
  }

  if (from === -Infinity || to === Infinity || from >= to) return result;

  while (temp < to) {
    result.push(temp);
    temp++;
  }
  return result;
}
```
