class Stack {

  items = []

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

  isEmpty() {
    return this.items.length === 0
  }

  size() {
    return this.items.length
  } 
}
