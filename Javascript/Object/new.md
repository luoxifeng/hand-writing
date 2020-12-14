# new 关键字实现
- 创建空对象
- 实例属性和方法赋值
- 原型链的保持
- 返回类型的修正
    - 如果为复杂类型返回这个复杂类型
    - 简单类型被忽略

## step1 创建空对象

```javascript
const myNew = (Constrcutor, ...args) => {
    const empty = {};
}
```
## step2 实例属性和方法保留
```javascript
const myNew = (Constrcutor, ...args) => {
    const empty = {};
    Constrcutor.call(empty, ...args);
}
```

## step3 原型链的保持
```javascript
const myNew = (Constrcutor, ...args) => {
    const empty = {};
    Constrcutor.call(empty, ...args);
    const setPrototypeOf = Object.setPrototypeOf;

    // step3
    if (Object.setPrototypeOf) {
        Object.setPrototypeOf(empty, Constrcutor.prototype);
    } else {
        empty.__proto__ = Constrcutor.prototype;
    }
}
```

## step4 返回类型的修正
```javascript
```
    setPrototypeOf(empty, Constrcutor.prototype)
    return result instanceof Object ? result : empty;

const setPrototypeOf = Object.setPrototypeOf || ((target, prototype) => target.__proto__ = prototype);
const myNew = (Constrcutor, ...args) => {
    const empty = {};
    const result = Constrcutor.call(empty, ...args);
    setPrototypeOf(empty, Constrcutor.prototype)
    return result instanceof Object ? result : empty;
}