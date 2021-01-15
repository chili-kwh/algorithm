// https://leetcode-cn.com/problems/most-stones-removed-with-same-row-or-column/
/**
 * @param {number[][]} stones
 * @return {number}
 */
var removeStones = function(stones) {
    const n = stones.length
    if(n <= 1) return 0;
    let graph = {}
    let visited = {}
    let sum = 0

    function dfs(n){
        if(visited[n]) return;
        if(!graph[n]) return;
        visited[n] = true;

        const adj = [...graph[n]]
        for(node of adj){
            if(!visited[node]) dfs(node)
        }
    }

    function isConnect([x1, y1], [x2, y2]){
        return x1 === x2 || y1 === y2
    }

    for(let i=0; i<n; i++){
        for(let j=i+1; j<n; j++){
            const nodeA = stones[i];
            const nodeB = stones[j];
            if(isConnect(nodeA, nodeB)){
                (graph[i] || (graph[i] = new Set())).add(j);
                (graph[j] || (graph[j] = new Set())).add(i)
            }

        }
    }

    for(let i=0; i<n; i++){
        if(!visited[i]){
            dfs(i)
            sum++ // 连通分量num
        }
    }

    return n - sum
}


