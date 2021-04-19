# Array

## F

<details>
<summary>fill</summary>

```js
function fill(list, t) {
  const length = list.length
  let index = 0
  const result = []
  while (index < length) {
    result.push(t)
    index++
  }
  return result
}

cosnt fill => (list, t) => Array.from(list, () => t)

fill([1,2,2,2], 1)
```

</details>

<details>
<summary>flat</summary>

```js
function flat(list, n = 1) {
  if (n <= 0) return list
  return list.reduce((acc, curr) => acc.concat(Array.isArray(curr) ? flat(curr, n--) : curr), [])
}

flat([[1], [2, [3]], [5]])
```

</details>

<details>
<summary>flatMap</summary>

```js
function flatMap(list, callback = t => t) {
  return list.reduce((acc, curr, i) => acc.concat(callback(curr, i, list)), [])
}

flatMap([1, 2, 3, 4], x => [[x * 2]])
```

</details>

<details>
<summary>from</summary>

```js
if (!Array.from) {
  Array.from = function from(arrayLike, mapping, ctx) {
    const arr = Array.prototype.slice.call(arrayLike);
    return mapping
      ? arr.map(function (t, i) {
          return mapping.call(this, t, i);
        }, ctx)
      : arr;
  };
}
```

</details>

## M

<details>
<summary>max</summary>

```js
function max(list) {
  let max = -Infinity
  const length = list.length
  let index = 0
  while (index < length - 1) {
    if (list[index] > max) max = list[index]
    index++
  }
  return max
}

max([1, 5, 10, 2])
```
</details>

<details>
<summary>moveZeroesToEnd</summary>

```js
// #1 改变自身
function moveZeroesToEnd(list) {
  let index = list.length - 1;
  while (index >= 0) {
    if (list[index] === 0) {
      list.push(...list.splice(index, 1));
    }
    index--;
  }
  return list;
}

// #2 不改变自身
function moveZeroesToEnd(list) {
  const res = [];
  let index = list.length - 1;
  while (index >= 0) {
    list[index] ? res.unshift(list[index]) : res.push(list[index]);
    index--;
  }
  return res;
}
```

</details>

## R

<details>
<summary>range</summary>

```js
function range(from, to) {
  var result = [];
  while (from < to) {
    result.push(from);
    from++;
  }
  return result;
}

range(10, 100);
```

</details>

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
