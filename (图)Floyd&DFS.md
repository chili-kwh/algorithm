[399. 除法求值](https://leetcode-cn.com/problems/evaluate-division/)

#### 题目
给你一个变量对数组 equations 和一个实数值数组 values 作为已知条件，其中 equations[i] = [Ai, Bi] 和 values[i] 共同表示等式 Ai / Bi = values[i] 。每个 Ai 或 Bi 是一个表示单个变量的字符串。
另有一些以数组 queries 表示的问题，其中 queries[j] = [Cj, Dj] 表示第 j 个问题，请你根据已知条件找出 Cj / Dj = ? 的结果作为答案。
返回 所有问题的答案 。如果存在某个无法确定的答案，则用 -1.0 替代这个答案。如果问题中出现了给定的已知条件中没有出现的字符串，也需要用 -1.0 替代这个答案。
注意：输入总是有效的。你可以假设除法运算中不会出现除数为 0 的情况，且不存在任何矛盾的结果。

> 示例 1：
输入：equations = [["a","b"],["b","c"]], values = [2.0,3.0], queries = [["a","c"],["b","a"],["a","e"],["a","a"],["x","x"]]  
输出：[6.00000,0.50000,-1.00000,1.00000,-1.00000]  
解释：  
条件：a / b = 2.0, b / c = 3.0  
问题：a / c = ?, b / a = ?, a / e = ?, a / a = ?, x / x = ?  
结果：[6.0, 0.5, -1.0, 1.0, -1.0 ]  
> ...
> 
### 思路

#### DFS
我们可以将整个问题建模成一张图：给定图中的一些点（变量），以及某些边的权值（两个变量的比值），试对任意两点（两个变量）求出其路径长（两个变量的比值）。
因此，我们首先需要遍历 equations 数组，找出其中所有不同的字符串，并通过哈希表将每个不同的字符串映射成整数。
在构建完图之后，对于任何一个查询，就可以从起点出发，通深度/广度优先搜索的方式，不断更新起点与当前点之间的路径长度，直到搜索到终点为止。
#### CODE
```javascript
var calcEquation = function (equations, values, queries) {
     let paths = {}
     let nodes = new Set()
    
     // DFS
     function dfs(start, dest) {
          visit[start] = true;

          if (!paths[start] || !paths[dest]) return -1;
          if (!!paths[start][dest]) {
               return paths[start][dest]
          }

          for (let w in paths[start]) {
               if (!visit[w] && !!paths[start][w]) {
                    let res = dfs(w, dest)
                    if (res !== -1) {
                         return res * paths[start][w]
                    }
               }
          }
          return -1
     }
     
     // 建图
     for (let i = 0; i < equations.length; i++) {
          const [left, right] = equations[i]
          if (!paths[left]) paths[left] = {}
          if (!paths[right]) paths[right] = {}

          paths[left][right] = values[i]
          paths[right][left] = 1 / values[i]
          nodes.add(left)
          nodes.add(right)
     }
    
     // 查找
     const result = queries.map((item, i) => {
          const [l, r] = item
          if (l === r && nodes.has(l)) return 1.0
          visit = []
          return dfs(l, r)
     })

     return result;
};
```

#### [Floyd 算法](https://zhuanlan.zhihu.com/p/72248451)
对于查询数量很多的情形，如果为每次查询都独立搜索一次，则效率会变低。为此，我们不妨对图先做一定的预处理，随后就可以在较短的时间内回答每个查询。
在本题中，我们可以使用Floyd 算法，预先计算出任意两点之间的距离。
```javascript
var calcEquation2 = function (equations, values, queries) {
    let paths = {}
    let nodes = new Set()

     // 建图
    for (let i = 0; i < equations.length; i++) {
        const [left, right] = equations[i]
        if (!paths[left]) paths[left] = {}
        if (!paths[right]) paths[right] = {}

        paths[left][right] = values[i]
        paths[right][left] = 1 / values[i]
        nodes.add(left)
        nodes.add(right)
    }

    // Floyd 预先计算
    for(let k of nodes){ //中转站0~k
        for(let i of nodes){ //i为起点
            for(let j of nodes){ //j为终点
                if(paths[i][k] && paths[k][j]){
                    paths[i][j] = paths[i][k] * paths[k][j]
                }
            }
        }
    }

    const result = queries.map((item, i) => {
        const [l, r] = item
        if (l === r && nodes.has(l)) return 1.0
        if(!paths[l] || !paths[r]) return -1.0
        return paths[l][r]
    })

    return result;
};
```