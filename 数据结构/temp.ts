
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
  remove(key): void;

  /**
   * 如果某个键值存在于这个字典中，则返回true，反之则返回false
   * @param key 
   */
  has(key: string): boolean;
}

class Dictionary implements IDictionary {

  private items = {}

  public set(key: string, value: any) {
    this.items[key] = value
  }

  public remove(key: string) {
    delete this.items[key]
  }

  public has(key: string) {
    return this.items.hasOwnProperty(key)
  }



}