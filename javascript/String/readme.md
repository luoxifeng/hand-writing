# String

- 手机号切割

```js
function phoneSlice(phone) {
  return phone.replace(/(?=(\d{4})+$)/g, ',')
}

phoneSlice('13112341234')
```

- 金额

```js
function moneySlice(money) {
  const reg = money.includes('.') ? /(?=(\d{3})+(\.\d+)$)/g : /(?=(\d{3})+$)/g
  return money.replace(reg, ',')
}

moneySlice('1123456789.111')
moneySlice('1123456789')
```
