
interface IQueue<T> {
  enqueue(...args: T[]): void;
  dequeue(): T;
  front(): T;
  clear(): void;
  isEmpty(): boolean;
  size(): number;
}

class Queue<T extends any> implements IQueue<T> {

  protected items = []

  /**
   * 相对列里面添加元素
   * @param  {...any} items 
   */
  public enqueue(...items) {
    this.items.push(...items)
  }

  /**
   * 从队列移除第一项
   */
  public dequeue() {
    return this.items.shift()
  }
  
  /**
   * 获取队列的头
   */
  public front() {
    return this.items[0]
  }

  /**
   * 清空队列
   */
  public clear() {
    this.items = []
  }

  /**
   * 判断是否为空队列
   */
  public isEmpty() {
    return this.items.length === 0
  }

  /**
   * 获取队列的长度
   */
  public size() {
    return this.items.length
  }

}

interface Item<T> {
  element: T;
  priority: number;
}

interface IPriorityQueue<T> extends Omit<IQueue<Item<T>>, 'enqueue'> {
  enqueue(element: T, priority: number): void;
}


class PriorityQueue<T extends any> extends Queue<T> implements IPriorityQueue<T> {

  public enqueue(element: T, priority: number) {
    const item = { element, priority }
    const length = this.items.length
    let added = false
    let i = 0

    while (i < length) {
      if (this.items[i].priority > item.priority) {
        this.items.splice(i, 0, item)
        added = true
        break
      }
      i++
    }

    if (!added) this.items.push(item)
  }

}