# Others

## Ajax
<details>
<summary>ajax</summary>

```js
let ajax = (...args) => {
  const wrapper = (getInstance) => (
    url,
    method = "GET",
    data,
    callback = () => {},
    flag = true
  ) => {
    debugger;
    const xhr = getInstance();
    method = method.toUpperCase();
    if (method == "GET") {
      xhr.open(method, `${url}?${data}`, flag);
      xhr.send();
    } else if (method == "POST") {
      xhr.open(method, url, flag);
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.send(data);
    }

    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4 && xml.status == 200) {
        callback(xhr.responseText);
      }
    };

    return xhr;
  };

  if (window.XMLHttpRequest) {
    ajax = wrapper(() => new XMLHttpRequest());
  } else {
    ajax = wrapper(() => new ActiveXObject("Microsoft.XMLHttp"));
  }

  return ajax(...args);
};
```

</details>

## fetch
<details>
<summary>cancel</summary>

```js
const controller = AbortController()
fetch('http://test.com/lll', {
  signal: controller.signal
})

controller.abort()
```

</details>



## LRU

<details>
<summary>LRU</summary>

```js
class LRU {
  constructor(max) {
    this.max = max
    this.cache = []
  }

  append(target) {
    const index = this.cache.indexOf(target)
    if (index > -1) {
      this.cache.splice(index, 1)
    } else if (this.cache.length >= this.max) {
      this.cache.pop()
    }
    this.cache.unshift(target)
  }
}
const lru = new LRU(3)
lru.append(1)
console.log(lru.cache)
lru.append(2)
console.log(lru.cache)
lru.append(3)
console.log(lru.cache)
lru.append(2)
console.log(lru.cache)
lru.append(4)
console.log(lru.cache)
```

</details>


## Promise

<details>
<summary>all</summary>

```js
Promise.myAll = (promises = []) => {
  return new Promise((resolve, reject) => {
    const length = promises.length;
    const result = new Array(length);
    let count = 0
    for (let i = 0; i <= length - 1; i++) {
      Promise.resolve(promises[i]).then((res) => {
        count++;
        result[i] = res;
        if (count === length) resolve(result);
      }, reject);
    }
  });
};

Promise.myAll([
  Promise.resolve(1),
  2,
  new Promise((res) => setTimeout(() => res(3), 2000)),
  Promise.resolve(4),
]).then(console.log, console.error);
```

Promise.resolve(new Promise(res => res(1))).then(console.log)
Promise.resolve(2).then(console.log)

</details>

## Scheduler
<details>
<summary>Scheduler</summary>

```js
class Scheduler {

  max = 2

  list = []

  async add(promiseFunc) {
    let context = {
      status: 'pedding',
    }

    context.promise = new Promise(resolve => {
      context.resolve = () => {
        resolve()
        context.status = 'fulfilled'
      }
    })
      .then(promiseFunc)

    this.list.push(context)
    if (this.list.length <= this.max) context.resolve()

    return context.promise
      .then(() => this.next(context));
  }

  next(pre) {
    // 删除已经完成的
    const index = this.list.indexOf(pre)
    index > -1 && this.list.splice(index, 1)

    // 找到没有处理的
    const target = this.list.find(t => t.status === 'pedding')
    return target ? target.resolve() : Promise.resolve()
  }
}

const scheduler = new Scheduler()
const timeout = (time) => {
  return new Promise(r => setTimeout(r, time))
}
const addTask = (time, order) => {
  scheduler.add(() => timeout(time))
    .then(() => console.log(order))
}

addTask(1000, 1)
addTask(500, 2)
addTask(300, 3)
addTask(400, 4)
// 2 3 1 4
```js
