# String

- 手机号切割

```js
function phoneSlice(phone) {
  return phone.replace(/(?=(\d{4})+$)/g, ",");
}

phoneSlice("13112341234");
```

- 金额

```js
function moneySlice(money) {
  const reg = money.includes(".") ? /(?=(\d{3})+(\.\d+)$)/g : /(?=(\d{3})+$)/g;
  return money.replace(reg, ",");
}

moneySlice("1123456789.111");
moneySlice("1123456789");
```

## I

<details>
<summary>indexs</summary>

```js
function indexs(str, substr) {
  const list = [];
  if (substr === '') return list
  const len = substr.length
  let index = -len;
  while (true) {
    index = str.indexOf(substr, index + 2);
    if (index < 0) return list;
    list.push(index);
  }
}

indexs('test####test$$$$test', 'test');
```

</details>

## R

<details>
<summary>render</summary>

```js
function render(template, data) {
  const iterator = template.matchAll(/\{\{(\w+)\}\}/g);
  for (let i of iterator) {
    if (i) {
      template = template.replace(i[0], data[i[1]]);
    }
  }
  return template;
}

render("{{d}} {{k}}", { d: 12, k: 123 });
```

</details>
