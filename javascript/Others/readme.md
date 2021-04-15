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
