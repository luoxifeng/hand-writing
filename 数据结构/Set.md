# 集合

```js
class Set {
  items = {};

  /**
   * 是否包含
   */
  has(value) {
    return this.items.hasOwnProperty(value);
  }

  /**
   * 添加
   * @param {*} value
   */
  add(value) {
    if (this.has(value)) return false;
    return (this.items[value] = value), true;
  }

  /**
   * 删除
   * @param {*} value
   */
  remove(value) {
    return this.has(value) && delete this.items[value];
  }

  /**
   * 清空
   */
  clear() {
    this.items = {};
  }

  /**
   * 包含的元素
   */
  values() {
    return Object.keys(this.items);
  }

  /**
   * 长度
   */
  size() {
    return this.values().length;
  }
}
```
