# 集合

```js
class Set {

  items = {}

  /**
   * 是否包含
   */
  has(value) {
    return this.items.hasOwnProperty(value)
  }

  /**
   * 添加
   * @param {*} value 
   */
  add(value) {
    if (this.has(value)) return false
    return (this.items[value] = value, true)
  }

  /**
   * 删除
   * @param {*} value 
   */
  remove(value) {
    return this.has(value) && (delete this.items[value])
  }

  /**
   * 清空
   */
  clear() {
    this.items = {}
  }

  /**
   * 包含的元素
   */
  values() {
    return Object.keys(this.items)
  }

  /**
   * 长度
   */
  size() {
    return this.values().length
  }

  /**
   * 并集
   * @param {*} otherSet 
   */
  umion(otherSet) {
    const set = new Set()
    this.values().concat(otherSet.values()).forEach(value => set.add(value))
    return set
  }

  /**
   * 交集
   * @param {*} otherSet 
   */
  intersection(otherSet) {
    const set = new Set()
    this.values().forEach(value => otherSet.has(value) && set.add(value))
    return set
  }

  /**
   * 差集
   * @param {*} otherSet 
   */
  difference(otherSet) {
    const set = new Set()
    this.values().forEach(value => !otherSet.has(value) && set.add(value))
    return set
  }

  /**
   * 
   * @param {*} otherSet 
   */
  subset(otherSet) {
    return this.size() > otherSet.size() ? false :
      this.values().every(value => otherSet.has(value))
  }
}
```
