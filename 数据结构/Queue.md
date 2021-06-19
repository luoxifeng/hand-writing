# Queue

## 普通队列
- 类型约束
```ts
interface IQueue<T> {
  enqueue(...args: T[]): void;
  dequeue(): T;
  front(): T;
  clear(): void;
  isEmpty(): boolean;
  size(): number;
}
```
- 实现
```ts

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
```

## 优先队列

- 类型约束
```ts
interface Item<T> {
  element: T;
  priority: number;
}

interface IPriorityQueue<T> extends Omit<IQueue<Item<T>>, 'enqueue'> {
  enqueue(element: T, priority: number): void;
}
```

- 实现
```js
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
```

- demo
```js
var priorityQueue = new PriorityQueue(); 
priorityQueue.enqueue("John", 2); 
priorityQueue.enqueue("Jack", 1); 
priorityQueue.enqueue("Camila", 1); 
```

## 应用
- 击鼓传花
> 在这个游戏中，孩子们围成一个圆圈，把花尽快地传递给旁边的人。某一时刻传花停止，
这个时候花在谁手里，谁就退出圆圈结束游戏。重复这个过程，直到只剩一个孩子（胜者）

```js
function hotPotato(nameList, num) {
  const queue = new Queue()
  queue.enqueue(...nameList)
  let eliminated

  while (queue.size() > 1) {
    for (let i = 0; i < num; i++) {
      queue.enqueue(queue.dequeue())
    }
    eliminated = queue.dequeue()
    console.log(`当前被淘汰的是：${eliminated}`)
  }
  return queue.front()
}

let winner = hotPotato(['John','Jack','Camila','Ingrid','Carl'], 7); 
console.log('胜利者：' + winner);
```
