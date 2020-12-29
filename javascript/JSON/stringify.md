# JSON.stringify

- 忽视函数
- 忽视 undefined
- Object.prototype.toJSON

## Object.prototype.toJSON

```js
const test = {
  foo: "foo",
};
JSON.stringify(test);

test.toJSON = function toJSON() {
  return 'foo';
}

```
