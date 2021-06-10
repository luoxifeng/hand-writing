# 数据结构

## 单链表

- 定义

```js
class Link {
  constructor(value) {
    this.value = value;
    this.next = null;
  }

  // 插入
  insert(link) {
    if (!this.next) {
      this.next = link;
    } else {
      let curr = this.next;
      while (curr.next != null) {
        curr = curr.next;
      }
      curr.next = link;
    }
  }

  // 翻转
  reverse() {
    function reverse(curr, next = null) {
      const _next = curr.next;
      curr.next = next;
      if (_next == null) return curr;
      return reverse(_next, curr);
    }
    return reverse(this);
  }
}

const first = new Link(1);
first.insert(new Link(2));
first.insert(new Link(3));
first.insert(new Link(4));

first.reverse();
```
