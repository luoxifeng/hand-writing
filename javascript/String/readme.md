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
    index = str.indexOf(substr, index + len);
    if (index < 0) return list;
    list.push(index);
  }
}

indexs('test####test$$$$test', 'test');
```

</details>

## P

<details>
<summary>padStart</summary>

```js
function padStart(str, length, padStr = ' ') {
  return [
    ...Array.from({ length: length - str.length }, () => padStr),
    str
  ].join('')
}

padStart("123", 5);
padStart("123", 5, '')
padStart("123", 5, '-')
padStart("123", 3, '-')
```

</details>


<details>
<summary>padEnd</summary>

```js
function padEnd(str, length, padStr = ' ') {
  return [
    str,
    ...Array.from({ length: length - str.length }, () => padStr)
  ].join('')
}

padEnd("123", 5);
padEnd("123", 5, '')
padEnd("123", 5, '-')
padEnd("123", 2, '-')
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


<details>
<summary>replaceAll</summary>

```js
function replaceAll(origin, from, to) {
  let current = origin
  if (from === to) return current
  if (from === '') return current.replace(/(?=.|$)/g, to)
  const length = from.length
  let res = ''
  let index = -1

  while ((index = current.indexOf(from)) > -1) {
    res += current.slice(0, index + length).replace(from, to)
    current = current.slice(index + length)
  }
  return res + current
}

replaceAll("a_a_a_a", 'a', 'b');
```

</details>

<details>
<summary>reverse</summary>

```js
function reverse(str = '') {
  return [...str].reverse().join('')
}

reverse('123456789')
```

</details>



