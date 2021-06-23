# Tree

## BinarySearchTree 二叉搜索树
- 节点
  - 类型约束
  ```ts
  interface ITreeNode {
    key: any;
    left: ITreeNode;
    right: ITreeNode
  }
  ```
  - 实现
  ```ts
  class TreeNode implements ITreeNode {

    key = null
    
    left: ITreeNode = null

    right: ITreeNode = null

    constructor(key) {
      this.key = key
    }

  }
  ```

- 二叉搜索树
  - 类型约束
  ```ts
  interface IBinarySearchTree {
    root: ITreeNode;
    /**
     * 插入新键
     * @param key 
     */
    insert(key): void;

    /**
     * 通过中序遍历方式遍历所有节点
     */
    inOrderTraverse(cb: () => any): void;

    /**
     * 通过先序遍历方式遍历所有节点
     */
    preOrderTraverse(cb: () => any): void;

    /**
     * 通过后序遍历方式遍历所有节点
     */
    postOrderTraverse(cb: () => any): void;

    /**
     * 返回树中最小的值/键
     */
    min(): any;

    /**
     * 返回树中最大的值/键
     */
    max(): any;

    /**
     * 搜索键
     * @param key 
     */
    search(key): boolean;

    /**
     * 从树中移除某个键
     * @param key 
     */
    remove(key): void;

  }
  ```
  - 实现
  ```ts
  class BinarySearchTree implements IBinarySearchTree {

    root: ITreeNode = null

    static insertNode(root: ITreeNode, node: ITreeNode) {
      if (node.key < root.key) {
        if (root.left === null) {
          root.left = node
        } else {
          this.insertNode(root.left, node)
        }
      } else {
        if (root.right === null) {
          root.right = node
        } else {
          this.insertNode(root.right, node)
        }
      }
    }

    static inOrderTraverse(node: ITreeNode, callback: Function) {
      if (node !== null) {
        this.inOrderTraverse(node.left, callback)
        callback(node.key)
        this.inOrderTraverse(node.right, callback)
      }
    }

    static preOrderTraverse(node: ITreeNode, callback: Function) {
      if (node !== null) {
        callback(node.key)
        this.preOrderTraverse(node.left, callback)
        this.preOrderTraverse(node.right, callback)
      }
    }

    static postOrderTraverse(node: ITreeNode, callback: Function) {
      if (node !== null) {
        this.postOrderTraverse(node.left, callback)
        this.postOrderTraverse(node.right, callback)
        callback(node.key)
      }
    }

    static search(node: ITreeNode, key) {
      if (node === null) return false
      if (key < node.key) {
        return this.search(node.left, key)
      } else if (key > node.key) {
        return this.search(node.right, key)
      }
      return true
    }

    static min(node: ITreeNode) {
      let current = {
        left: node,
        key: null,
      }
      while (current && current.left) {
        current = current.left
      }
      return current.key
    }

    static remove(node: ITreeNode, key) {
      if (node === null) return null
      if (key < node.key) {
        node.left = this.remove(node.left, key)
      } else if (key > node.key) {
        node.right = this.remove(node.right, key)
      } else {
        if (node.left === null && node.right === null) {
          node = null
        } else if (node.left === null) {
          node = node.right
        } else if (node.right === null) {
          node = node.left
        } else {
          const aux = this.min(node.right)
          node.key = aux
          node.right = this.remove(node.right, node.key)
        }
      }
      return node;
    }

    public insert(key) {
      const node = new TreeNode(key)
      if (this.root === null) {
        this.root = node
      } else {
        BinarySearchTree.insertNode(this.root, node)
      }
    }

    public inOrderTraverse(callback = console.log) {
      BinarySearchTree.inOrderTraverse(this.root, callback)
    }

    public preOrderTraverse(callback = console.log) {
      BinarySearchTree.preOrderTraverse(this.root, callback)
    }

    public postOrderTraverse(callback = console.log) {
      BinarySearchTree.postOrderTraverse(this.root, callback)
    }

    public min() {
      return BinarySearchTree.min(this.root)
    }

    public max() {
      let current = {
        right: this.root,
        key: null,
      }
      while (current && current.right) {
        current = current.right
      }
      return current.key
    }

    public search(key) {
      return BinarySearchTree.search(this.root, key)
    }

    public remove(key) {
      this.root = BinarySearchTree.remove(this.root, key)
    }
  }
  ```

- 测试
  ```ts
  var tree = new BinarySearchTree(); 
  tree.insert(11);
  tree.insert(7); 
  tree.insert(15); 
  tree.insert(5); 
  tree.insert(3);
  tree.insert(9); 
  tree.insert(8); 
  tree.insert(10); 
  tree.insert(13); 
  tree.insert(12); 
  tree.insert(14); 
  tree.insert(20); 
  tree.insert(18); 
  tree.insert(25);
  tree.insert(6);
  console.log('\n')
  tree.inOrderTraverse()
  console.log('\n')
  tree.preOrderTraverse()
  console.log('\n')
  tree.postOrderTraverse()
  console.log('\n')
  console.log(tree.min())
  console.log('\n')
  console.log(tree.max())
  console.log('\n')
  console.log(tree.search(105))

  console.log('\n')
  tree.remove(7)
  tree.inOrderTraverse()
  console.log('\n')
  tree.preOrderTraverse()
  console.log('\n')
  tree.postOrderTraverse()

  ```