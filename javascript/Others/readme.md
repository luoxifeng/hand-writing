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

## List

<details>
<summary>sum</summary>

```js
function sum(...list) {
  function temp(..._list) {
    return sum(...list, ..._list);
  }

  temp.toString = function () {
    return list.reduce((a, b) => a + b);
  };

  // or
  temp[Symbol.toPrimitive] = function () {
    return list.reduce((a, b) => a + b);
  };


  return temp;
}
console.log(sum(1, 2, 3)(4));
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

- LRU

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

## Promise

- all

```js
Promise._all = (promises = []) => {
  return new Promise((resolve, reject) => {
    const length = promises.length;
    const result = new Array(length);
    let count = 0;

    promises.forEach((promise, index) => {
      Promise.resolve(promise).then(
        value => {
          result[index] = value
          ++count === length && resolve(result)
        },
        reject
      )
    })
  })
};

Promise.
  _all([
    Promise.resolve(1),
    2,
    new Promise((res) => setTimeout(() => res(3), 2000)),
    Promise.resolve(4),
  ])
  .then(console.log, console.error);
```

<details>
<summary>allSettled</summary>

```js
Promise._allSettled = function(promises) {
  const length = promises.length
  const result = new Array(length)
  let count = 0
  return new Promise(resolve => {
    promises.forEach((promise, index) => {
       Promise.resolve(promise).then(
          value => {
            result[index] = {
              status: "fulfilled",
              value
            }
          }, 
          reason => {
            result[index] = {
              status: "rejected",
              reason
            }
          }
        )
        .then(() => ++count === length && resolve(result))

    })
  })
}

Promise._allSettled([1, Promise.reject(2), 3, Promise.reject(4)])
```

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

mergePromise([ajax1, ajax2, ajax3]).then((data) => {
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
  let temp = null;
  const list = [];
  for (let i = 0; i < ajaxArray.length; i++) {
    if (!temp) {
      temp = ajaxArray[i]();
    } else {
      temp = temp.then(ajaxArray[i]);
    }
    list.push(temp);
  }

  return Promise.all(list);
};

// #3
const mergePromise = (ajaxArray) => {
  const list = ajaxArray.reduce(
    (pre, next) => {
      return pre.concat(pre[pre.length - 1].then(next));
    },
    [Promise.resolve()]
  );
  return Promise.all(list.slice(1));
};
```

</details>

<details>
<summary>RunQueue</summary>

```js
class RunQueue {
  max = 3;

  list = [];

  doing = false;

  async add(...list) {
    this.list.push(...list);
    !this.doing && this.run();
  }

  async run() {
    this.doing = true;
    let doingList = [];
    while (this.list.length) {
      doingList = this.list.splice(0, this.max);
      await Promise.all(doingList.map((t) => t()));
    }
    this.doing = false;
  }
}

const runQueue = new RunQueue();
const delay = (time, text) => () =>
  new Promise((res) => setTimeout(res, time)).then(() => console.log(text));

runQueue.add(
  delay(1000, "queue-1-1"),
  delay(5000, "queue-1-2"),
  delay(500, "queue-1-3"),
  delay(5000, "queue-2-1"),
  delay(2000, "queue-2-2"),
  delay(1000, "queue-2-3"),
  delay(3000, "queue-3-1")
);
```

</details>

<details>
<summary>Scheduler</summary>

```js
class Scheduler {

  max = 2

  taskList = []

  getTask() {
    const task = {
      promise: null,
      resolve: () => {},
      status: 'waiting',
    }

    task.promise = new Promise(resolve => {
      task.resolve = () => {
        resolve()
        task.status = 'done'
      }
    })
    return task;
  }

  async add(promiseFunc) {
    const task = this.getTask()
    this.taskList.push(task)

    if (this.taskList.length <= this.max) task.resolve() // 启动

    return task
      .promise
      .then(promiseFunc)
      .then(this.next);
  }

  next = (result) => {
    // 清除已经完成的任务
    this.taskList = this.taskList.filter(t => t.status === 'waiting')

    // 找到第一个等待的任务启动
    this.taskList[0] && this.taskList[0].resolve()

    return result
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
```

```js
function requestInOrder(requests, initialParam) {
  let list = []
  let count = 0
  return new Promise(res => {
    requests.forEach((fun, i) => {
      fun(initialParam).then(data => {
        count++
        list[i] = data
        if (count === requests.length) res(list)
      })
    })
  })
}

const request1 = (param) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(param), param)
  })
}

const request2 = (param) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(param * 2), param * 2)
  })
}

const request3 = (param) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(param * 3), param * 3)
  })
}

requestInOrder([request2, request3, request1], 1000).then(res => console.log(res))
```
</details>

## Random
<details>
<summary>Random</summary>

```js
/*
请实现抽奖函数rand，保证随机性
输入为表示对象数组，对象有属性n表示人名，w表示权重
随机返回一个中奖人名，中奖概率和w成正比
*/
let peoples = [
  { n:'p1', weight: 100 },
  { n:'p2', w: 200 },
  { n:'p3', w: 1 }
];
let rand = function (p) {
};
```

```js
let peoples = [
  { n:'p1', w: 100 },
  { n:'p2', w: 200 },
  { n:'p3', w: 1 }
];
function random(list) {
  const newList = list.reduce((a, b) => {
    let curr = null 
    if (a.length === 0) {
      curr = {
        ...b,
        start: 0,
        end: b.w
      }
    } else {
      const last = a[a.length - 1]
      curr = {
        ...b,
        start: last.end,
        end: last.end + b.w
      }
    }
    return a.concat(curr)
  }, [])
  const num = newList[newList.length - 1].end * Math.random()
  return newList.find(t => num >= t.start && num < t.end).n
};

random(peoples)
```


</details>
