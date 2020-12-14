/**
 * 防抖
 */
const debounce = (fun, delay, ctx) => {
    let timer = null;
    return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => fun.apply(this, args), delay);
    }
}

/**
 * 节流
 */
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
