# Object

## C

<details>
<summary>create</summary>

```js
function create(prototype, descriptors = {}) {
  function NOP() {}
  NOP.prototype = prototype;
  const empty = new NOP();
  Object.defineProperties(empty, descriptors);
  return empty;
}
```

</details>

## I

<details>
<summary>instanceof</summary>

```js
function myInstanceof(a, A) {
  // es 新标准
  if (A[Symbol.hasInstane]) return A[Symbol.hasInstane].call(A, a);

  while (true) {
    if (a === null) return false;
    if (a.__proto__ === A.prototype) return true;
    a = a.__proto__;
  }
}

// test
function A() {}
console.log(myInstanceof(new A(), A)); //
function B() {}
A.prototype = Object.create(B.prototype);
console.log(myInstanceof(new A(), B)); //
```

</details>

## N

<details>
<summary>new</summary>

```js
function myNew(A, ...args) {
  const empty = {};
  const result = (A.call(empty, ...args).empty.__proto__ = A.prototype);

  return result instanceof Object ? res : empty;
}
```
