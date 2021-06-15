class Node {
  constructor(element) {
    this.element = element
    this.next = null
  }
}

class LinkedList {
  head = null

  length = 0

  /**
   * 添加
   * @param {*} position 
   * @param {*} element 
   */
  // 向指定位置插入一个元素
  insert(position, element) {
    if (position < 0 || position > this.length) return false
    const node = new Node(element)
    let current = this.head
    let index = 0
    let prev = null
    if (position === 0) {
      node.next = current
      this.head = node
    } else {
      while (index++ < position) {
        prev = current
        current = current.next
      }
      node.next = current
      prev.next = node
    }
    this.length++
    return true
  }

  // 向链表尾部添加一个元素
  append(element) {
    this.insert(this.length, element)
  }

  // 向链表头部添加一个元素
  prepend(element) {
    this.insert(0, element)
  }

  /**
   * 根据元素获取位置
   * @param {*} element 
   */
  // 查找指定元素第一次出现的位置
  indexOf(element) {
    let current = this.head
    let index = 0

    while (current) {
      if (current.element === element) return index
      index++
      current = current.next
    }
    return -1
  }

  // 查找指定元素出现的所有位置
  indexOfAll(element) {
    const indexs = []
    let current = this.head
    let index = 0

    while (current) {
      if (current.element === element) indexs.push(index)
      index++
      current = current.next
    }
    return indexs
  }

  /**
   * 根据位置或者元素取节点
   * @param {*} position 
   */
  // 取指定位置的节点
  get(position) {
    if (position < 0 || position >= this.length) return null
    let current = this.head
    let index = 0

    while (current) {
      if (index === position) return current
      index++
      current = current.next
    }
  }

  // 获取头部
  getHead() {
    return this.get(0)
  }

  // 获取尾巴
  getTail() {
    return this.get(this.length - 1)
  }

  /**
   * 根据位置或者元素删除元素
   * @param {*} element 
   */
  // 删除指定位置元素
  removeAt(position) {
    if (position < 0 || position >= this.length || this.head === null) return null
    let current = this.head
    if (position === 0) {
      this.head = current.next
    } else {
      let index = 0;
      let prev = null
      while (index++ < position) {
        prev = current
        current = current.next
      }
      prev.next = current.next
    }
    this.length--
    return current.element
  }

  // 删除第一个
  removeHead() {
    return this.removeAt(0)
  }

  // 删除最后一个
  removeTail() {
    return this.removeAt(this.length - 1)
  }

  // 删除指定元素第一次出现的节点
  remove(element) {
    const index = this.indexOf(element)
    return this.removeAt(index)
  }

  // 删除指定元素最后一次出现的节点
  removeLast(element) {
    const indexes = this.indexOfAll(element)
    const index = indexes.length ? indexes.pop() : -1
    return this.removeAt(index)
  }

  // 删除指定元素出现的所有位置
  removeAll(element) {
    return this.indexAllOf(element)
      .reverse()
      .map(index => this.removeAt(index))
      .reverse()
  }

  /**
   * 其他Api
   */

  // 长度
  size() {
    return this.length
  }


}

var list = new LinkedList()

list.append(0)
list.append(1)
list.append(2)
list.append(3)
list.append(4)
list.append(5)
