#  Dictionary 字典

- 类型约束
```ts
interface IDictionary {
  /**
   * 向字典中添加新元素
   * @param key 
   * @param value 
   */
  set(key: string, value: any): void;

  /**
   * 通过使用键值来从字典中移除键值对应的数据值。
   * @param key 
   */
  remove(key): boolean;

  /**
   * 如果某个键值存在于这个字典中，则返回true，反之则返回false
   * @param key 
   */
  has(key: string): boolean;

  /**
   * 通过键值查找特定的数值并返回
   * @param key 
   */
  get(key): any;

  /**
   * 将字典所包含的所有键名以数组形式返回
   */
  keys(): any[]

  /**
   * 将字典所包含的所有数值以数组形式返回
   */
  values(): any[];

  /**
   * 将这个字典中的所有元素全部删除
   */
  clear(): void;

  /**
   * 返回字典所包含元素的数量。与数组的length属性类似
   */
  size(): number;

  /**
   * 判断是否是空
   */
  isEmpty(): boolean;
}
```

- 实现
```ts

class Dictionary implements IDictionary {

  private items = {}

  public set(key: string, value: any) {
    this.items[key] = value
  }

  public remove(key: string) {
    return (delete this.items[key])
  }

  public has(key: string) {
    return this.items.hasOwnProperty(key)
  }

  public get(key: string) {
    return this.items[key]
  }

  public keys() {
    return Object.keys(this.items)
  }

  public values() {
    return Object.values(this.items)
  }

  public clear() {
    this.items = {}
  }

  public size() {
    return this.keys().length
  }

  public isEmpty() {
    return this.size() === 0
  }

}
```
