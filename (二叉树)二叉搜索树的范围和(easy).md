[938. 二叉搜索树的范围和](https://leetcode-cn.com/problems/range-sum-of-bst/)

给定二叉搜索树的根结点 root，返回值位于范围 [low, high] 之间的所有结点的值的和。

 

示例 1：
![](https://assets.leetcode.com/uploads/2020/11/05/bst1.jpg)

输入：root = [10,5,15,3,7,null,18], low = 7, high = 15
输出：32
 
示例 2：
![](https://assets.leetcode.com/uploads/2020/11/05/bst2.jpg)

输入：root = [10,5,15,3,7,13,18,1,null,6], low = 6, high = 10
输出：23


提示：

树中节点数目在范围 [1, 2 * 104] 内
1 <= Node.val <= 105
1 <= low <= high <= 105
所有 Node.val 互不相同

### 思路

按深度优先搜索的顺序计算范围和。记当前子树根节点为 root，分以下四种情况讨论：

- root 节点为空

返回 0。

- root 节点的值大于 high

由于二叉搜索树右子树上所有节点的值均大于根节点的值，即均大于 high，故无需考虑右子树，返回左子树的范围和。

- root 节点的值小于 low

由于二叉搜索树左子树上所有节点的值均小于根节点的值，即均小于 low，故无需考虑左子树，返回右子树的范围和。

- root 节点的值在 [low,high] 范围内

此时应返回 root 节点的值、左子树的范围和、右子树的范围和这三者之和。

### CODE 
```javascript

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} low
 * @param {number} high
 * @return {number}
 */

var rangeSumBST = function(root, low, high) {
    let val = 0

    function dfs(root){
        if(!root) return 0;
        root.val >= low && dfs(root.left) // 剪枝
        root.val >= low && root.val <= high && (val += root.val)
        root.val <= high && dfs(root.right) // 剪枝
    }

    dfs(root)
    return val
}
```