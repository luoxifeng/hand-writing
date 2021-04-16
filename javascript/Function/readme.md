# Function

## A

<details>
<summary>apply</summary>

```js
// #1
Function.prototype.myApply = function (ctx, args = []) {
  ctx.__HANDLER__ = this;

  const result = ctx.__HANDLER__(...args);
  delete ctx.__HANDLER__;
  return result;
};

// #2
Function.prototype.myApply = function () {
  const ctx = arguments[0];
  const args = arguments[1];
  ctx.__HANDLER__ = this;

  const result = new Function("return arguments[0].__HANDLER__(" + args + ")")(
    ctx
  );
  delete ctx.__HANDLER__;
  return result;
};
```

</details>

## B

<details>
<summary>bind</summary>

```js
Function.prototype.myBind = function (ctx, ...args) {
  const self = this;
  function fNOP() {}
  function fBound(...args1) {
    return self.apply(this instanceof fNOP ? this : ctx, [...args, ...args1]);
  }

  if (self.prototype) fNOP.prototype = self.prototype;
  fBound.prototype = new fNOP();

  return fBound;
};

function test(...args) {
  console.log(this.a, ...args);
}
test.myBind({ a: 123 }, 1, 2)(3, 4);
```

</details>

## C

<details>
<summary>call</summary>

```js
// #1
Function.prototype.myCall = function (ctx, ...args) {
  ctx.__HANDLER__ = this;

  const result = ctx.__HANDLER__(...args);
  delete ctx.__HANDLER__;
  return result;
};

// #2
Function.prototype.myCall = function () {
  const ctx = arguments[0];
  const args = Array.prototype.slice.call(arguments, 1);
  ctx.__HANDLER__ = this;

  const result = new Function("return arguments[0].__HANDLER__(" + args + ")")(
    ctx
  );
  delete ctx.__HANDLER__;
  return result;
};
```

</details>

<details>
<summary>curry</summary>

```js
const curry = (fun, ...args) => {
  if (args.length >= fun.length) return fun(...args);
  return (...args1) => curry(fun, ...args, ...args1);
};

const add = (a, b, c, d) => a + b + c + d;

curry(add)(1, 2, 3, 4);
curry(add, 1, 2)(3, 4);
```

</details>

<details>
<summary>compose</summary>

```js
const compose = (...funs) => funs.reduce((a, b) => (...args) => a(b(...args)));

compose(
  (a) => a + 2,
  (a) => a * 2
)(2);
```

</details>


## M

<details>
<summary>moveZeroesToEnd</summary>

```js
// #1 改变自身
function moveZeroesToEnd(list) {
  let index = list.length - 1
  while (index >= 0) {
    if (list[index] === 0) {
      list.push(...list.splice(index, 1))
    }
    index--
  }
  return list
}

// #2 不改变自身
function moveZeroesToEnd(list) {
  const res = [];
  let index = list.length - 1
  while (index >= 0) {
    list[index] ? res.unshift(list[index]) : res.push(list[index])
    index--
  }
  return res
}
```

</details>


## P

<details>
<summary>pipe</summary>

```js
const pipe = (...funs) => funs.reduce((a, b) => (...args) => b(a(...args)));

pipe(
  (a) => a + 2,
  (a) => a * 2
)(2);
```

</details>

## R

<details>
<summary>repeat</summary>

```js
const repeat = (str, length) => Array.from({ length }, () => str).join("");
const repeat = (str, length, index = 0, res = "") => {
  while (index++ < length) res += str;
  return res;
};

repeat("d", 3);
```

</details>
