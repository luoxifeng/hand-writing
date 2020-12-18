# 防抖
```js
const debounce = (fun, delay, ctx) => {
    let timer = null;
    return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => fun.apply(this, args), delay);
    }
}
```
