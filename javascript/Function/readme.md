# Function

## C

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

