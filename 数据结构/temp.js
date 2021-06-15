class Node {
  constructor(element) {
    this.element = element
    this.next = null
  }
}

class LinkedList {
  head = null

  length = 0

  // 向链表尾部添加一个元素
  append(element) {
    const node = new Node(element)
    if (this.head === null) {
      this.head = node
    } else {
      let current = this.head
      while (current.next) {
        current = current.next
      }
      current.next = node
    }
    this.length++
  }

  // 向指定位置插入一个元素
  insert(position, element) {
    if (position < 0 || position >= this.length) return false
    const node = new Node(element)
    let current = this.head
    let index = 0
    let prev = null
    if (position === 0) {
      node.next = current
      this.head = node
    } else {
      while (position++ < this.length) {
        prev = current
        current = current.next
      }
      node.next = current
      prev.next = node
    }
    this.length++
    return true
  }

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

}

var list = new LinkedList()

list.append(0)
list.append(1)
