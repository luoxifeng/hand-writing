interface IStack<T> {
  push(...ags: T[]): void;
  pop(): T;
  peek(): T;
  clear(): void;
  isEmpty(): boolean;
  size(): number;
}

class Stack<T extends any> implements IStack<T> {

  private items: T[] = []

  /**
   * 添加一个或者多个元素到栈顶
   */
  public push(...els) {
    this.items.push(...els)
  }

  /**
   * 移除栈顶元素
   */
  public pop() {
    return this.items.pop()
  }

  /**
   * 返回栈顶的元素，不做修改
   */
  public peek() {
    return this.items[this.items.length - 1]
  }

  /**
   * 移除所有元素
   */
  public clear() {
    this.items = []
  }

  /**
   * 判断栈是否为空
   */
  public isEmpty() {
    return this.items.length === 0
  }

  /**
   * 栈的长度
   */
  public size() {
    return this.items.length
  } 
}
