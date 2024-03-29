# Function

## A

- apply

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


## B

- bind

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

## C

- call

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

- curry

```js
const curry = (fun, ...args) => {
  if (args.length >= fun.length) return fun(...args);
  return (...args1) => curry(fun, ...args, ...args1);
};

const add = (a, b, c, d) => a + b + c + d;

curry(add)(1, 2, 3, 4);
curry(add, 1, 2)(3, 4);
```

- compose

```js
const compose = (...funs) => funs.reduce((a, b) => (...args) => a(b(...args)));

compose(
  (a) => a + 2,
  (a) => a * 2
)(2);
```

- composeMiddleware

```js
const composeMiddleware = (middlewares) => {
  const next = (i) => {
    const middleware = middlewares[i];
    return middleware && middleware(next.bind(null, i + 1));
  };
  next(0);
};

composeMiddleware([
  async (next) => {
    console.log("1 start");
    await next();
    console.log("1 end");
  },
  async (next) => {
    console.log("2 start");
    await next();
    console.log("2 end");
  },
  async (next) => {
    console.log("3 start");
    next();
    console.log("3 end");
  },
]);
```

## D

- debounce

```js
const debounce = (fun, delay) => {
  let timer;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(fun, delay);
  };
};

debounce(() => console.log("test"), 3000);
```

## P

- partial

```js
function partial(fn, ...args) {
  return (...arg) => {
    args.forEach((t, i) => {
      if (t === partial.__) args[i] = arg.shift()
    })
    return fn(...args, ...arg)
  }
}
partial.__ = `__partial_placeholder__`

const test = (a, b, c, d) => a + b + c + d
partial(test, partial.__, 2)(3, 4, 5)
```

- pipe

```js
const pipe = (...funs) => funs.reduce((a, b) => (...args) => b(a(...args)));

pipe(
  (a) => a + 2,
  (a) => a * 2
)(2);
```

## R

- repeat

```js
const repeat = (str, length) => Array.from({ length }, () => str).join("");
const repeat = (str, length, index = 0, res = "") => {
  while (index++ < length) res += str;
  return res;
};

repeat("d", 3);
```

