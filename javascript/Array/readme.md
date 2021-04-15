# Array

## R
<details>
<summary>reduce</summary>

```js
if (!Array.prototype.reduce) {
  Array.prototype.reduce1 = function (callback) {
    var o = Object(this);
    var len = o.length >>> 0;
    var k = 0;
    var value;

    if (arguments.length >= 2) {
      value = arguments[1];
    } else {
      // 找到第一个不是empty的位置
      while (k < len && !(k in o)) k++;
      if (k >= len) {
        throw new TypeError("Reduce of empty array with no initial value");
      }

      value = o[k++];
    }

    while (k < len) {
      if (k in o) {
        value = callback(value, o[k], k, o);
      }
      k++;
    }

    return value;
  };
}
```
<details>
