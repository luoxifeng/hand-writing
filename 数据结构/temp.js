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
    if (head === null) {
      head = node
    } else {
      let current = head.next
      while (current.next) {
        current = current.next
      }
      current.next = node
    }
    length++
  }

}