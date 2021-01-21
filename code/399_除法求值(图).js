/**
 * https://leetcode-cn.com/problems/evaluate-division/
 * @param {string[][]} equations
 * @param {number[]} values
 * @param {string[][]} queries
 * @return {number[]}
 */

// DFS
var calcEquation = function (equations, values, queries) {
    let paths = {}
    let nodes = new Set()

    for (let i = 0; i < equations.length; i++) {
        const [left, right] = equations[i]
        if (!paths[left]) paths[left] = {}
        if (!paths[right]) paths[right] = {}

        paths[left][right] = values[i]
        paths[right][left] = 1 / values[i]
        nodes.add(left)
        nodes.add(right)
    }
    console.log(paths)

    function dfs(start, dest) {
        visit[start] = true;

        if (!paths[start] || !paths[dest]) return -1;
        if (!!paths[start][dest]) {
            console.log(paths[start][dest])
            return paths[start][dest]
        }


        for (let w in paths[start]) {
            if (!visit[w] && !!paths[start][w]) {
                let res = dfs(w, dest)

                if (res !== -1) {
                    console.log(paths[start][w])
                    return res * paths[start][w]
                }
            }
        }
        return -1
    }


    const result = queries.map((item, i) => {
        const [l, r] = item
        if (l === r && nodes.has(l)) return 1.0
        visit = []
        return dfs(l, r)
    })

console.log(result)
    return result;
};

// Floyd算法
// https://zhuanlan.zhihu.com/p/72248451
var calcEquation2 = function (equations, values, queries) {
    let paths = {}
    let nodes = new Set()

    for (let i = 0; i < equations.length; i++) {
        const [left, right] = equations[i]
        if (!paths[left]) paths[left] = {}
        if (!paths[right]) paths[right] = {}

        paths[left][right] = values[i]
        paths[right][left] = 1 / values[i]
        nodes.add(left)
        nodes.add(right)
    }
    console.log(paths)

    for(let k of nodes){ //中转站0~k
        for(let i of nodes){ //i为起点
            for(let j of nodes){ //j为终点
                if(paths[i][k] && paths[k][j]){
                    paths[i][j] = paths[i][k] * paths[k][j]
                }
            }
        }
    }
    // console.log(paths)

    const result = queries.map((item, i) => {
        const [l, r] = item
        if (l === r && nodes.has(l)) return 1.0
        if(!paths[l] || !paths[r]) return -1.0
        return paths[l][r]
    })

    console.log(result)
    return result;
};
//
// let eq = [["a","c"],["b","e"],["c","d"],["e","d"]]
// let va = [2.0,3.0,0.5,5.0]
// let queries = [["a","b"]]

let eq = [["a", "b"], ["a", "c"], ["a", "d"], ["a", "e"], ["a", "f"], ["a", "g"], ["a", "h"], ["a", "i"], ["a", "j"], ["a", "k"], ["a", "l"], ["a", "aa"], ["a", "aaa"], ["a", "aaaa"], ["a", "aaaaa"], ["a", "bb"], ["a", "bbb"], ["a", "ff"]]
let va = [1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 1.0, 1.0, 1.0, 1.0, 1.0, 3.0, 5.0]
let queries = [["d", "f"], ["e", "g"], ["e", "k"], ["h", "a"], ["aaa", "k"], ["aaa", "i"], ["aa", "e"], ["aaa", "aa"], ["aaa", "ff"], ["bbb", "bb"], ["bb", "h"], ["bb", "i"], ["bb", "k"], ["aaa", "k"], ["k", "l"], ["x", "k"], ["l", "ll"]]

calcEquation2(eq, va, queries)

// [1.66667,1.50000,2.50000,0.14286,10.00000,8.00000,4.00000,1.00000,5.00000,0.33333,7.00000,8.00000,10.00000,10.00000,1.10000,-1.00000,-1.00000]


// calcEquation([["x1","x2"],["x2","x3"],["x3","x4"],["x4","x5"]],
//     [3.0,4.0,5.0,6.0],
//     [["x1","x5"],["x5","x2"],["x2","x4"],["x2","x2"],["x2","x9"],["x9","x9"]])


a = {
    a:
        {
            b: 1,
            c: 2,
            d: 3,
            e: 4,
            f: 5,
            g: 6,
            h: 7,
            i: 8,
            j: 9,
            k: 10,
            l: 11,
            aa: 1,
            aaa: 1,
            aaaa: 1,
            aaaaa: 1,
            bb: 1,
            bbb: 3,
            ff: 5
        },
    b: {a: 1},
    c: {a: 0.5},
    d: {a: 0.3333333333333333},
    e: {a: 0.25},
    f: {a: 0.2},
    g: {a: 0.16666666666666666},
    h: {a: 0.14285714285714285},
    i: {a: 0.125},
    j: {a: 0.1111111111111111},
    k: {a: 0.1},
    l: {a: 0.09090909090909091},
    aa: {a: 1},
    aaa: {a: 1},
    aaaa: {a: 1},
    aaaaa: {a: 1},
    bb: {a: 1},
    bbb: {a: 0.3333333333333333},
    ff: {a: 0.2}
}

/*
输入：
[["x1","x2"],["x2","x3"],["x3","x4"],["x4","x5"]]
    [3.0,4.0,5.0,6.0]
    [["x1","x5"],["x5","x2"],["x2","x4"],["x2","x2"],["x2","x9"],["x9","x9"]]
输出：
[360.00000,0.00833,NaN,1.00000,-1.00000,-1.00000]
预期结果：
[360.0,0.00833,20.0,1.0,-1.0,-1.0]
*/
