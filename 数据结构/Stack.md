# Stack 栈

## 类型约束
```ts
interface IStack<T> {
  items: T[];
  push(...ags: T[]): void;
  pop(): T;
  peek(): T;
  clear(): void;
  isEmpty(): boolean;
  size(): number;
}
```

## 实现
```ts
class Stack<T extends  any> implements IStack<T> {

  items: T[] = []

  /**
   * 添加一个或者多个元素到栈顶
   */
  push(...els) {
    this.items.push(...els)
  }

  /**
   * 移除栈顶元素
   */
  pop() {
    return this.items.pop()
  }

  /**
   * 返回栈顶的元素，不做修改
   */
  peek() {
    return this.items[this.items.length - 1]
  }

  /**
   * 移除所有元素
   */
  clear() {
    this.items = []
  }

  /**
   * 判断栈是否为空
   */
  isEmpty() {
    return this.items.length === 0
  }

  /**
   * 栈的长度
   */
  size() {
    return this.items.length
  } 
}

```