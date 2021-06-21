# Tree

## BinarySearchTree 二叉搜索树
- 节点
```ts
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

```

- 树
```ts

```
