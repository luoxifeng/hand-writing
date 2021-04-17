# Others

## other

## 正则

- 手机号切割

```js
function phoneSlice(phone) {
  return phone.replace(/(?=(\d{4})+$)/g, ',')
}

phoneSlice('13112341234')
```
