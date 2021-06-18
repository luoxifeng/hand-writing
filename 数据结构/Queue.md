# Queue 队列
```js
class Queue {

  items = []

  /**
   * 相对列里面添加元素
   * @param  {...any} items 
   */
  enqueue(...items) {
    this.items.push(...items)
  }

  /**
   * 从队列移除第一项
   */
  dequeue() {
    return this.items.shift()
  }

  /**
   * 清空队列
   */
  clear() {
    this.items = []
  }

  /**
   * 获取队列的头
   */
  front() {
    return this.items[0]
  }

  /**
   * 判断是否为空队列
   */
  isEmpty() {
    return this.items.length === 0
  }

  /**
   * 获取队列的长度
   */
  size() {
    return this.items.length
  }

}

```

## 优先队列
```js
class PriorityQueue extends Queue {

  enqueue(element, priority) {
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

var priorityQueue = new PriorityQueue(); 
priorityQueue.enqueue("John", 2); 
priorityQueue.enqueue("Jack", 1); 
priorityQueue.enqueue("Camila", 1); 

```