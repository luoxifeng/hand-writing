# 节流
```js
const throttle = (fun, delay) => {
    let doing = false;
    return function(...args) {
        if (doing) return;
        doing = true
        setTimeout(() => {
            fun.apply(this, args);
            doing = false;
        })
    }
}
```