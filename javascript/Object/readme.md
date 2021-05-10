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

## H

<details>
<summary>hasCircle</summary>

```js
function hasCircle(obj) {
  const map = new Map()
  let has = false

  function loop(o) {
    const keys = Object.keys(o)
    for (let i = 0;i < keys.length;i++) {
      const t = o[keys[i]]
      if (typeof t === 'object') {
        if (map.has(t)) {
          has = true
          return
        } else {
          map.set(t)
          loop(t)
        }
      }
    }
  }

  loop(obj)

  return has
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
</details>

## T

<details>
<summary>typeOf</summary>

```js
function typeOf(target) {
  return /^\[object\s(\w+)\]$/.exec(Object.prototype.toString.call(target))[1].toLowerCase()
}
```
</details>

