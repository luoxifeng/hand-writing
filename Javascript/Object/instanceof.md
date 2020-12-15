# instanceof
```javascript
a instanceof A
```
以上面为例instanceof关键的一步就是，
- 判断`a.__proto__ === A.prototype`,如果相等返回`true`;
- 如果不等,沿着原型链继续层层查找对比`a.__proto__.__proto__.....__proto__ === A.prototype`
- 如果中间某一级相等则返回`true`,如果原型链一直到`null`则返回`false`

## 简版实现
根据以上步骤我们可以实现一个简版的`myInstanceof`
```javascript
const myInstanceof = (a, A) => {
    const P = A.prototype;
    const t = a.__proto__;
    while(true) {
        if (t === null) return false;
        if (t === P) return true;
        t = t.__proto__;
    }
}
```

