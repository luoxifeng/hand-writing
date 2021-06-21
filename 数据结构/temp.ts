
interface ITreeNode {
  key: any;
  left: ITreeNode;
  right: ITreeNode
}

class TreeNode implements ITreeNode {

  key = null
  
  left: ITreeNode = null

  right: ITreeNode = null

  constructor(key) {
    this.key = key
  }

}
class BinarySearchTree {

}