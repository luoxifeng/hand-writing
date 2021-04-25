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
const controller = AbortController();
fetch("http://test.com/lll", {
  signal: controller.signal,
});

controller.abort();
```

</details>

## LRU

<details>
<summary>LRU</summary>

```js
class LRU {
  constructor(max) {
    this.max = max;
    this.cache = [];
  }

  append(target) {
    const index = this.cache.indexOf(target);
    if (index > -1) {
      this.cache.splice(index, 1);
    } else if (this.cache.length >= this.max) {
      this.cache.pop();
    }
    this.cache.unshift(target);
  }
}
const lru = new LRU(3);
lru.append(1);
console.log(lru.cache);
lru.append(2);
console.log(lru.cache);
lru.append(3);
console.log(lru.cache);
lru.append(2);
console.log(lru.cache);
lru.append(4);
console.log(lru.cache);
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
    let count = 0;
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

<details>
<summary>mergePromise</summary>

```js
const timeout = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const ajax1 = () => {
  return timeout(2000).then(() => {
    console.log("1");
    return 1;
  });
};

const ajax2 = () => {
  return timeout(1000).then(() => {
    console.log("2");
    return 2;
  });
};

const ajax3 = () => {
  return timeout(2000).then(() => {
    console.log("3");
    return 3;
  });
};

mergePromise([ajax1, ajax2, ajax3])
  .then((data) => {
    console.log("done");
    console.log(data);
  });
  // 1, 2, 3 done [1, 2, 3]

// #1
const mergePromise = async (ajaxArray) => {
  const list = [];
  for (let i = 0; i < ajaxArray.length; i++) {
    list[i] = await ajaxArray[i]();
  }
  return list;
};

// #2
const mergePromise = (ajaxArray) => {
  let temp = null
  const list = [];
  for (let i = 0; i< ajaxArray.length; i++) {
    if (!temp) {
      temp = ajaxArray[i]()
    } else {
      temp = temp.then(ajaxArray[i])
    }
    list.push(temp)
  }
  
  return Promise.all(list);
};

// #3
const mergePromise = (ajaxArray) => {
  const list = ajaxArray.reduce((pre, next) => {
    return pre.concat(pre[pre.length - 1].then(next))
  }, [Promise.resolve()])
  return Promise.all(list.slice(1));
};
```

</details>

<details>
<summary>RunQueue</summary>

```js
class RunQueue {
  max = 3

  list = []

  doing = false

  async add(...list) {
    this.list.push(...list)
    !this.doing && this.run()
  }

  async run() {
    this.doing = true
    let doingList = []
    while (this.list.length) {
      doingList = this.list.splice(0, this.max)
      await Promise.all(doingList.map(t => t()))
    }
    this.doing = false
  }
}

const runQueue = new RunQueue()
const delay = (time, text) => () => new Promise(res => setTimeout(res, time)).then(() => console.log(text))

runQueue.add(
  delay(1000, 'queue-1-1'),
  delay(5000, 'queue-1-2'),
  delay(500, 'queue-1-3'),
  delay(5000, 'queue-2-1'),
  delay(2000, 'queue-2-2'),
  delay(1000, 'queue-2-3'),
  delay(3000, 'queue-3-1'),
)


```

</details>

<details>
<summary>Scheduler</summary>

````js
class Scheduler {

  max = 2

  list = []

  async add(promiseFunc) {
    const context = {
      promise: null,
      resolve: () => {}
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
      .then(res => {
        this.next(context)
        return res
      });
  }

  next(pre) {
    // 删除已经完成的
    const index = this.list.indexOf(pre)
    index > -1 && this.list.splice(index, 1)

    // 找到没有处理的
    const target = this.list.find(t => t.status === 'pedding')
    // 启动这一个
    if (target) target.resolve()
  }
}

const scheduler = new Scheduler()
const timeout = (time) => {
  return new Promise(r => setTimeout(r, time))
}
const addTask = (time, order) => {
  return scheduler.add(() => timeout(time))
    .then(() => (console.log(order), time))
}

addTask(1000, 1).then(console.log)
addTask(500, 2).then(console.log)
addTask(300, 3).then(console.log)
addTask(400, 4).then(console.log)
// 2 3 1 4
```js
````
