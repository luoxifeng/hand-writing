# Others

## ajax

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
