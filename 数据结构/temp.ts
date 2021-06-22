
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
  inOrderTraverse(): any[];

  /**
   * 通过先序遍历方式遍历所有节点
   */
  preOrderTraverse(): any[];

  /**
   * 通过后序遍历方式遍历所有节点
   */
  postOrderTraverse(): any[];

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
        BinarySearchTree.insertNode(root.left, node)
      }
    } else {
      if (root.right === null) {
        root.right = node
      } else {
        BinarySearchTree.insertNode(root.right, node)
      }
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



}