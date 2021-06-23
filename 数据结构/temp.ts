
interface ITreeNode {
  key: any;
  left: ITreeNode;
  right: ITreeNode;
}

class TreeNode implements ITreeNode {

  key = null
  
  left: ITreeNode = null

  right: ITreeNode = null

  constructor(key) {
    this.key = key
  }

}

interface IBinarySearchTree {
  root: ITreeNode;
  /**
   * 插入新键
   * @param key 
   */
  insert(key): void;

  /**
   * 从树中移除某个键
   * @param key 
   */
  remove(key): void;

  /**
   * 搜索键
   * @param key 
   */
  search(key): boolean;

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

}

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
    let current = {
      left: this.root,
      key: null,
    }
    while (current && current.left) {
      current = current.left
    }
    return current.key
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
}

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

