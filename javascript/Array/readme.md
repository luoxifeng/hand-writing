# Array

## A

<details>
<summary>all</summary>

```js
const all = list => list.every(Boolean);

all([1, 2, 3, 4]);
```

</details>

<details>
<summary>allPass</summary>

```js
const allPass = (list, t) => list.every(fun => fun(t));

allPass([t => t], 1);
```

</details>

<details>
<summary>allEqual</summary>

```js
const allEqual = list => list.every((t, i, _list) => t === _list[0]);

allEqual([1, 1, 1, 1]);
```

</details>

<details>
<summary>any</summary>

```js
const any = (list, fun = Boolean) => list.some(fun);

any([1, 0, 0, 0]);
```

</details>

<details>
<summary>anyPass</summary>

```js
const anyPass = (list, t) => funList.some(fun => fun(t));

anyPass([t => t > 1, t => t > 0], 2);
```

</details>

<details>
<summary>append</summary>

```js
function append(list, target) {
  return (list.push(target), list)
}

append([1, 2, 3], 2);
```

</details>

## C

<details>
<summary>compact</summary>

```js
function compact(list) {
  return list.filter(t => t != null)
}

compact([null, undefined, 1, 0]);
```

</details>

<details>
<summary>crossJoin</summary>

```js
function crossJoin(...list) {
  if (list.length <= 1) return list;
  const res = [];
  const [first, second, ...rest] = list;
  for (let i = 0; i < first.length; i++) {
    for (let j = 0; j < second.length; j++) {
      res.push(`${first[i]}${second[j]}`);
    }
  }
  return crossJoin(res, ...rest);
}

function crossJoin(...list) {
  if (list.length <= 1) return list;
  const [list0, list1, ...list2] = list;
  return crossJoin(
    list0.map((i) => list1.map((j) => [`${i}${j}`])).flat(),
    ...list2
  );
}

crossJoin(["a", "b"], ["0", "1"], ["@", "#"], ["+", "-"]);
```

</details>

<details>
<summary>countRepeat</summary>

```js
// 统计一个数字在数组里面出现次数
function countRepeat(list, t) {
  let count = 0;
  for (let i = 0; i < list.length; i++) {
    if (t === list[i]) count++;
  }
  return count;
}

countRepeat([1, 2, 3, 8, 4, 3, 2, 3], 3);
```

</details>

## D

<details>
<summary>diff</summary>

```js
function diff(list1, list2) {
  return list1.filter(t => !list2.includes(t))
}

diff([1, 5, 10, 2], [11, 5, 10, 21]);
```

</details>

<details>
<summary>drop</summary>

```js
function drop(list, count) {
  return list.slice(Math.max(0, count), list.length)
}

drop([1, 5, 10, 2], 1);
```
</details>

<details>
<summary>dropLast</summary>

```js
function dropLast(list, count) {
  return list.slice(0, list.length - Math.min(count, list.length))
}

dropLast([1, 5, 10, 2], 1);
```
</details>

## E

<details>
<summary>empty</summary>

```js
const empty = () => ([])
```

</details>

<details>
<summary>emptySelf</summary>

```js
const emptySelf = list => !(list.length = 0)
```

</details>

<details>
<summary>ectopic</summary>

```js
// 异位词 比如 abc, acb, cba 这种包含字符个数相同位置不同的词
function ectopic(list) {
  // 制定一个规则，得到一个标识，能代表一类异位词，也就是只要是异位词，得到的标识应该是相同的
  // 比如 abc -> 'a_1-b_1-c_1' 统计每个字符出现的字数按照asc码排序得到一个字符串
  const toKey = str => {
    const map = str.split('').reduce((acc, k) => {
      acc[k] = (acc[k] || 0) + 1
      return acc 
    }, {})

    return Object.keys(map).sort().map(k => `${k}_${map[k]}`).join('-')
  }
  const groupMap = list.reduce((acc, str) => {
    const key = toKey(str)
    acc[key] = (acc[key] || []).concat(str)
    return acc
  }, {})

  return Object.values(groupMap)
}

ectopic(['abc', 'sdc', 'bca', 'dcs', '121', '211'])
```

</details>

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
  if (n <= 0) return list;
  return list.reduce(
    (acc, curr) => acc.concat(Array.isArray(curr) ? flat(curr, n--) : curr),
    []
  );
}

function flat(list) {
  while (list.some((t) => Array.isArray(t))) {
    list = [].concat(...list);
  }
  return list;
}

flat([[1], [2, [3]], [5]]);
```

</details>

<details>
<summary>flatMap</summary>

```js
function flatMap(list, callback = (t) => t) {
  return list.reduce((acc, curr, i) => acc.concat(callback(curr, i, list)), []);
}

flatMap([1, 2, 3, 4], (x) => [[x * 2]]);
```

</details>

<details>
<summary>from</summary>

```js
function from(arrayLike, mapping, ctx) {
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

## G

<details>
<summary>getIntersection</summary>

```js
/**
 * 1.计算多个区间的交集
 *   区间用长度为2的数字数组表示，如[2, 5]表示区间2到5（包括2和5）；
 *   区间不限定方向，如[5, 2]等同于[2, 5]；
 *   实现`getIntersection 函数`
 *   可接收多个区间，并返回所有区间的交集（用区间表示），如空集用null表示
 * 示例：
 *   getIntersection([5, 2], [4, 9], [3, 6]); // [4, 5]
 *   getIntersection([1, 7], [8, 9]); // null
 */
function getIntersection(...list) {
  const res = [];
  const sort = (a, b) => (a > b ? [b, a] : [a, b]);

  let [_min, _max] = sort(...list[0]);
  for (let i = 1; i <= list.length - 1; i++) {
    const [min, max] = sort(...list[i]);
    // 没有交集
    if (_min > max || _max < min) return null;

    // 肯定有交集 取2个小的之中的大的 取2个大的之中的小的 就是去交集
    _min = sort(_min, min)[1];
    _max = sort(_max, max)[0];
  }

  return [_min, _max];
}
```

</details>

## H

<details>
<summary>head</summary>

```js
const head = list => list[0]

head([1, 5, 10, 2]);
```

</details>

## I 

<details>
<summary>intersect</summary>

```js
function intersect(list1, list2) {
  return list1.filter(t => list2.includes(t))
}

intersect([1, 5, 10, 2], [11, 5, 10, 21]);
```

</details>



## L

<details>
<summary>last</summary>

```js
const last = list => list[list.length - 1]

last([1, 5, 10, 2]);
```

</details>


## M

<details>
<summary>max</summary>

```js
function max(list) {
  let res = list[0];
  let index = list.length;;
  while (--index >= 0) {
    if (list[index] > res) res = list[index];
  }
  return res;
}

function max(list) {
  return Math.max.apply(null, list)
}

max([1, 5, 10, 2]);
```

</details>

<details>
<summary>min</summary>

```js
function min(list) {
  let res = list[0];
  let index = list.length;;
  while (--index >= 0) {
    if (list[index] < res) res = list[index];
  }
  return res;
}

function min(list) {
  return Math.min.apply(null, list)
}

min([1, 5, 10, 2]);
```

</details>

<details>
<summary>maxSecond</summary>

```js
function maxSecond(list) {
  let max = list[0];
  let sec = max;
  const length = list.length;
  let index = 1;
  while (index < length) {
    if (list[index] > sec) {
      sec = list[index];
    }
    if (sec > max) {
      [max, sec] = [sec, max];
    }
    index++;
  }
  return sec;
}

maxSecond([1, 5, 10, 2, 15]);
```

</details>

<details>
<summary>maxThird</summary>

```js
function maxThird(list) {
  let max = list[0];
  let sec = max;
  let third = sec;
  const length = list.length;
  let index = 1;
  while (index < length) {
    if (list[index] > third) {
      third = list[index];
    }
    if (third > sec) {
      [sec, third] = [third, sec];
    }
    if (sec > max) {
      [max, sec] = [sec, max];
    }
    index++;
  }
  return third;
}

maxThird([1, 5, 10, 2, 15]);
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

## N

<details>
<summary>nth</summary>

```js
const nth = (list, index) => list[index]

nth([10, 100, 123], 1);
```

</details>

## P

<details>
<summary>pluck</summary>

```js
function pluck(list, name) {
  return list.map(t => t[name]).filter(t => t != null)
}

pluck([{ a: 10 }, { a: null }, { a: undefined }, { a: 123 }])
```

</details>

## R

<details>
<summary>random</summary>

```js
function random(list) {
  return list[parseInt(Math.random() * list.length)]
}

random([0, 1, 2, 3, 4])
```

</details>

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
function reduce(list, fun, initData, ctx) {
  const len = list.length
  if (len === 0) return initData
  let i = initData !== undefined ? 0 : 1
  let result = initData !== undefined ? initData : list[0]

  for (;i < len;i++) {
    result = fun.call(ctx, result, list[i], i, list)
  }
  return result
}
```
</details>

<details>
<summary>remove</summary>

```js
const remove = (list, item) => {
  const index = list.indexOf(item)
  return ~index ? !!list.splice(index, 1).length : false
}

remove([0, 1], 1);
```

</details>

<details>
<summary>removeAt</summary>

```js
const removeAt = (list, index) => !!list.splice(index, 1).length

removeAt([0, 1], 1);
```

</details>

## S

<details>
<summary>shuffle</summary>

```js
function shuffle(list) {
  const _list = [...list]
  let i = _list.length, j
  while (i > 0) {
    j = parseInt(Math.random() * i)
    i--
    [_list[j], _list[i]] = [_list[i], _list[j]]
  }
  return _list
}

shuffle([0, 1, 2, 3, 4]);
```
</details>

<details>
<summary>size</summary>

```js
function size(list) {
  return list.length
}

size([0, 1, 2, 3, 4]);
```
</details>

<details>
<summary>sum</summary>

```js
function sum(list) {
  return list.reduce((a, b) => a + b)
}

sum([0, 1, 2, 3, 4]);
```
</details>


## T

<details>
<summary>tail</summary>

```js
function tail(list) {
  return list.length > 1 ? list.slice(1) : list
}

tail([0, 1, 2, 3]);
```

</details>

<details>
<summary>take</summary>

```js
const take = (list, n = 1) => list.slice(0, n)

take([0, 1, 2, 3], 2);
```

</details>

<details>
<summary>takeRight</summary>

```js
const takeRight = (list, n = 1) => list.slice(list.length - n, list.length)

takeRight([0, 1, 2, 3], 2);
```

</details>

<details>
<summary>takeRightWhile</summary>

```js
const takeRightWhile = (list, fun) => {
  let i = list.length
  while (--i > -1) {
    if (fun(list[i])) return list.slice(i + 1, list.length)
  }
  return list
}

takeRightWhile([0, 1, 2, 3], n => n < 2);
```

</details>

<details>
<summary>takeWhile</summary>

```js
const takeWhile = (list, fun) => {
  let i = -1
  while (i++ < list.length) {
    if (fun(list[i])) return list.slice(0, i)
  }
  return list
}

takeWhile([0, 1, 2, 3], n => n > 1);
```

</details>

## union

<details>
<summary>union</summary>

```js
function union(list1, list2) {
  return [...new Set([...list1, ...list2])]
}

union([0, 1, 2, 3], [2, 3, 4]);
```

</details>
