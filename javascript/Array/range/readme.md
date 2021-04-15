# range

## 实现

```js
function range(from, to) {
  var result = [];
  while (from < to) {
    result.push(from);
    from++;
  }
  return result;
}

range(10, 100)
```
