### 最小生成树
### [Kruskal 算法](https://oi-wiki.org/graph/mst/)
Kruskal 算法是一种常见并且好写的最小生成树算法，由 Kruskal 发明。该算法的基本思想是从小到大加入边，是个贪心算法。

算法虽简单，但需要相应的数据结构来支持……具体来说，维护一个森林，查询两个结点是否在同一棵树中，连接两棵树。

抽象一点地说，维护一堆 集合 ，查询两个元素是否属于同一集合，合并两个集合。

其中，查询两点是否连通和连接两点可以使用「并查集」维护。


### 题目 
[1584. 连接所有点的最小费用](https://leetcode-cn.com/problems/min-cost-to-connect-all-points/)

给你一个points 数组，表示 2D 平面上的一些点，其中 points[i] = [xi, yi] 。

连接点 [xi, yi] 和点 [xj, yj] 的费用为它们之间的 曼哈顿距离 ：|xi - xj| + |yi - yj| ，其中 |val| 表示 val 的绝对值。

请你返回将所有点连接的最小总费用。只有任意两点之间 有且仅有 一条简单路径时，才认为所有点都已连接。

> 输入：points = [[0,0],[2,2],[3,10],[5,2],[7,0]]  
> 
> 输出：20
> 
> 解释：
我们可以按照上图所示连接所有点得到最小总费用，总费用为 20 。
注意到任意两个点之间只有唯一一条路径互相到达。
> 
> 提示：
1 <= points.length <= 1000;   
-106 <= xi, yi <= 106;  
所有点 (xi, yi) 两两不同。

- 思路

将这张完全图中的边全部提取到边集数组中，然后对所有边进行排序，从小到大进行枚举，每次贪心选边加入答案。使用并查集维护连通性，若当前边两端不连通即可选择这条边。

#### CODE  

```javascript
/**
 * @param {number[][]} points
 * @return {number}
 */
var minCostConnectPoints = function(points) {
    const n = points.length;
    if(n<=1) return 0
    
    let sum = 0
    let graph = []
    let roots = Array.from(Array(n), (e, idx)=>idx)

    function find(n){
        return roots[n] === n ? n : roots[n] = find(roots[n])
    }

    function union(a, b){
        roots[find(a)] = find(b)
    }

    // 提取全部边
    for(let i=0; i<n; i++){
        let pointA = points[i]
        for(let j=i+1; j<n; j++){
            let pointB = points[j]
            const distance = Math.abs(pointA[0]-pointB[0]) + Math.abs(pointA[1]-pointB[1])
            graph.push([distance, i, j])
        }
    }

    // 按权重升序排列
    graph.sort((a, b)=>a[0] - b[0])
        
    // 遍历合并
    for(line of graph){
        const [distance, a, b] = line
        if(roots[find(a)] !== roots[find(b)]){ // 未连通
            sum += distance;
            union(a, b)
        }
    }

    return sum
};

```