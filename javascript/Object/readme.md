# Object

## C

- create

```js
function create(prototype, descriptors = {}) {
  function NOP() {}
  NOP.prototype = prototype;
  const empty = new NOP();
  Object.defineProperties(empty, descriptors);
  return empty;
}
```

- cloneReg

```js
function cloneReg(reg) {
  const cloned = new reg.constructor(reg.source, reg.flags)
  cloned.lastIndex = reg.lastIndex
  return cloned;
}
```


- cloneSymbol

```js
function cloneSymbol(target) {
  return Object(Symbol.prototype.valueOf.call(target))
}
```

- cloneFun

```js
// 分箭头函数和普通函数
function cloneFun(fun) {
  const funString = fun.toString()
  // 箭头函数
  if (!fun.prototype) return eval(funString)

  // 普通函数
  const params = (/(?<=\()((.|\n)*?)(?=\))/.exec(funString) || [''])[0].split(',')
  const body = (/(?<=\{)((.|\n)*)(?=\})/.exec(funString) || [''])[0]
  return new Function(...params, body)
}

function cloneFun(fun) {
  try {
    eval(`var __clone_fun__ = ${fun.toString()}`)
    return __clone_fun__
  } catch (e) {
    return fun
  }
}
```

## D

- deepClone
```js
function isObject(terget) {
  const type = typeof terget
  return target !== null && (type === 'object' || type === 'function')
}

const shallowSimpleTypes = [
  'String',
  'Number',
  'Boolean',
  'Error',
  'Date',
]
const shallowSpecialTypes = [
  'RegExp',
  'Symbol',
  'Funtion',
]
const shallowTypes = [...shallowSimpleTypes, ...shallowSpecialTypes]
const deepTypes = [
  'Map',
  'Set',
  'Array',
  'Object',
]
const TypeMap = [...shallowTypes, ...deepTypes].reduce((a, b) => (a[b] = b, a), {})

function getType(target) {
  const type = Object.prototype.toString.call(target)
  return /(?<=\[object\s)(\w+?)(?=\])/.exec(type)[0]
}

// 正则 函数 date Error 简单类型的包装类型
function cloneShallowType(type, target) {
  if (shallowSimpleTypes.includes(type)) return new targe.constructor(target)
  if (type === TypeMap.RegExp) return cloneReg(target)
  if (type === TypeMap.Function) return cloneFun(target)
  if (type === TypeMap.Symbol) return cloneSymbol(target)
}

function deepClone(target, map = new WeakMap()) {
  // 简单类型
  if (!isObject(target)) return target

  const type = getType(target)

  // 克隆不需要递归的对象
  if (shallowTypes.includes(type)) return cloneShallowType(type, target)

  // 初始化需要深度克隆的对象
  const cloned = new target.constructor()

  // 处理环
  if (map.get(target)) return target
  map.set(target, cloned)

  // 处理set
  if (type === TypeMap.Set) { 
    target.forEach(t => {
      cloned.add(deepClone(t, map))
    })
    return cloned;
  }

  // 处理map
  if (type === TypeMap.Map) {
     target.forEach((value, key) => {
      cloned.set(key, deepClone(value, map))
    })
  }
  
  // 处理数组
  if (type === TypeMap.Array) {
    cloned.push(...target.map(t => deepClone(t, map)))
    return cloned
  }

  // 处理普通对象
  Object.keys(target)
    .forEach(key => {
      cloned[key] = deepClone(target[key], map)
    })
  return cloned
}

```

## H

- hasCircle

```js
function hasCircle(obj = {}) {
  const map = new Map()
  return (function loop(o) {
    return Object.keys(o).some(k => {
      const t = o[k]
      if (typeof t === 'object' && t !== null) {
        if (map.has(t)) return true;
        map.set(t)
        if (loop(t)) return true;
      }
    })
  })(obj)
}
```

## I

- instanceof

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



## N

- new

```js
function myNew(A, ...args) {
  const empty = {};
  const result = (A.call(empty, ...args).empty.__proto__ = A.prototype);

  return result instanceof Object ? res : empty;
}
```


## T

- take

```js
const take = (list, count = 1) => list.slice(0, count)
```



- takeRight

```js
const takeRight = (list, count = 1) => list.slice(list.length - count, list.length)
```

- typeOf

```js
function typeOf(target) {
  return /^\[object\s(\w+)\]$/.exec(Object.prototype.toString.call(target))[1].toLowerCase()
}
```

## U

- union 
```js
const union = (a = [], b = []) => [...new Set([...a,  ...b])]
```

