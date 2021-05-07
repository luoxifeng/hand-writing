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

## C

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

## M

<details>
<summary>max</summary>

```js
function max(list) {
  let max = -Infinity;
  const length = list.length;
  let index = 0;
  while (index < length - 1) {
    if (list[index] > max) max = list[index];
    index++;
  }
  return max;
}

max([1, 5, 10, 2]);
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
<summary>maxSecond</summary>

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

```js
// MyPromise.js

// 先定义三个常量表示状态
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

// 新建 MyPromise 类
class MyPromise {
  constructor(executor) {
    // executor 是一个执行器，进入会立即执行
    // 并传入resolve和reject方法
    try {
      executor(this.resolve, this.reject);
    } catch (error) {
      this.reject(error);
    }
  }

  // 储存状态的变量，初始值是 pending
  status = PENDING;
  // 成功之后的值
  value = null;
  // 失败之后的原因
  reason = null;

  // 存储成功回调函数
  onFulfilledCallbacks = [];
  // 存储失败回调函数
  onRejectedCallbacks = [];

  // 更改成功后的状态
  resolve = (value) => {
    // 只有状态是等待，才执行状态修改
    if (this.status === PENDING) {
      // 状态修改为成功
      this.status = FULFILLED;
      // 保存成功之后的值
      this.value = value;
      // resolve里面将所有成功的回调拿出来执行
      while (this.onFulfilledCallbacks.length) {
        // Array.shift() 取出数组第一个元素，然后（）调用，shift不是纯函数，取出后，数组将失去该元素，直到数组为空
        this.onFulfilledCallbacks.shift()(value);
      }
    }
  };

  // 更改失败后的状态
  reject = (reason) => {
    // 只有状态是等待，才执行状态修改
    if (this.status === PENDING) {
      // 状态成功为失败
      this.status = REJECTED;
      // 保存失败后的原因
      this.reason = reason;
      // resolve里面将所有失败的回调拿出来执行
      while (this.onRejectedCallbacks.length) {
        this.onRejectedCallbacks.shift()(reason);
      }
    }
  };

  then(onFulfilled, onRejected) {
    const realOnFulfilled =
      typeof onFulfilled === "function" ? onFulfilled : (value) => value;
    const realOnRejected =
      typeof onRejected === "function"
        ? onRejected
        : (reason) => {
            throw reason;
          };

    // 为了链式调用这里直接创建一个 MyPromise，并在后面 return 出去
    const promise2 = new MyPromise((resolve, reject) => {
      const fulfilledMicrotask = () => {
        // 创建一个微任务等待 promise2 完成初始化
        queueMicrotask(() => {
          try {
            // 获取成功回调函数的执行结果
            const x = realOnFulfilled(this.value);
            // 传入 resolvePromise 集中处理
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      };

      const rejectedMicrotask = () => {
        // 创建一个微任务等待 promise2 完成初始化
        queueMicrotask(() => {
          try {
            // 调用失败回调，并且把原因返回
            const x = realOnRejected(this.reason);
            // 传入 resolvePromise 集中处理
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      };
      // 判断状态
      if (this.status === FULFILLED) {
        fulfilledMicrotask();
      } else if (this.status === REJECTED) {
        rejectedMicrotask();
      } else if (this.status === PENDING) {
        // 等待
        // 因为不知道后面状态的变化情况，所以将成功回调和失败回调存储起来
        // 等到执行成功失败函数的时候再传递
        this.onFulfilledCallbacks.push(fulfilledMicrotask);
        this.onRejectedCallbacks.push(rejectedMicrotask);
      }
    });

    return promise2;
  }
  // resolve 静态方法
  static resolve(parameter) {
    // 如果传入 MyPromise 就直接返回
    if (parameter instanceof MyPromise) {
      return parameter;
    }

    // 转成常规方式
    return new MyPromise((resolve) => {
      resolve(parameter);
    });
  }

  // reject 静态方法
  static reject(reason) {
    return new MyPromise((resolve, reject) => {
      reject(reason);
    });
  }
}

function resolvePromise(promise, x, resolve, reject) {
  // 如果相等了，说明return的是自己，抛出类型错误并返回
  if (promise === x) {
    return reject(
      new TypeError("The promise and the return value are the same")
    );
  }

  if (typeof x === "object" || typeof x === "function") {
    // x 为 null 直接返回，走后面的逻辑会报错
    if (x === null) {
      return resolve(x);
    }

    let then;
    try {
      // 把 x.then 赋值给 then
      then = x.then;
    } catch (error) {
      // 如果取 x.then 的值时抛出错误 error ，则以 error 为据因拒绝 promise
      return reject(error);
    }

    // 如果 then 是函数
    if (typeof then === "function") {
      let called = false;
      try {
        then.call(
          x, // this 指向 x
          // 如果 resolvePromise 以值 y 为参数被调用，则运行 [[Resolve]](promise, y)
          (y) => {
            // 如果 resolvePromise 和 rejectPromise 均被调用，
            // 或者被同一参数调用了多次，则优先采用首次调用并忽略剩下的调用
            // 实现这条需要前面加一个变量 called
            if (called) return;
            called = true;
            resolvePromise(promise, y, resolve, reject);
          },
          // 如果 rejectPromise 以据因 r 为参数被调用，则以据因 r 拒绝 promise
          (r) => {
            if (called) return;
            called = true;
            reject(r);
          }
        );
      } catch (error) {
        // 如果调用 then 方法抛出了异常 error：
        // 如果 resolvePromise 或 rejectPromise 已经被调用，直接返回
        if (called) return;

        // 否则以 error 为据因拒绝 promise
        reject(error);
      }
    } else {
      // 如果 then 不是函数，以 x 为参数执行 promise
      resolve(x);
    }
  } else {
    // 如果 x 不为对象或者函数，以 x 为参数执行 promise
    resolve(x);
  }
}

MyPromise.resolve()
  .then(() => {
    console.log(0);
    return MyPromise.resolve(4);
  })
  // .then((res) => {
  //   return 4
  // })
  .then((res) => {
    console.log(res);
  });

MyPromise.resolve()
  .then(() => {
    console.log(1);
  })
  .then(() => {
    console.log(2);
  })
  .then(() => {
    console.log(3);
  })
  .then(() => {
    console.log(5);
  })
  .then(() => {
    console.log(6);
  });
```
