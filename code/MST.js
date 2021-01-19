// https://leetcode-cn.com/problems/min-cost-to-connect-all-points/
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

    for(let i=0; i<n; i++){
        let pointA = points[i]
        for(let j=i+1; j<n; j++){
            let pointB = points[j]
            const distance = Math.abs(pointA[0]-pointB[0]) + Math.abs(pointA[1]-pointB[1])
            graph.push([distance, i, j])
        }
    }

    graph.sort((a, b)=>a[0] - b[0])

    for(line of graph){
        const [distance, a, b] = line
        if(roots[find(a)] !== roots[find(b)]){
            sum += distance;
            union(a, b)
        }
    }

    return sum
};