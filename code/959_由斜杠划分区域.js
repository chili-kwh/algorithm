// https://leetcode-cn.com/problems/regions-cut-by-slashes/
/**
 * @param {string[]} grid
 * @return {number}
 */
var regionsBySlashes = function (grid) {
    const n = grid.length;

    /* 并查集模版 */
    let roots = Array.from(new Array(4 * n * n), (e, i) => i)

    function find(n) {
        return roots[n] === n ? n : roots[n] = find(roots[n])
    }

    function union(a, b) {
        // console.log(`union: ${a} + ${b}`)
        roots[find(a)] = find(b)
    }
    /* 并查集模版 */

    // 获取每个三角的位置
    function getPosition(row, col) {
        return (i) => (row * n + col) * 4 + i
    }

    // 合并
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            const sign = grid[i][j]
            const getPos = getPosition(i, j)
            switch (sign) {
                case ' ': {
                    union(getPos(0), getPos(1))
                    union(getPos(0), getPos(2))
                    union(getPos(0), getPos(3))
                }
                    break;

                case '/': {
                    union(getPos(0), getPos(1))
                    union(getPos(2), getPos(3))
                }
                    break;

                case '\\': {
                    union(getPos(0), getPos(3))
                    union(getPos(1), getPos(2))
                }
                    break;
            }

            if (j < n - 1) { // 向右
                union(getPos(3), getPosition(i, j + 1)(1))
            }

            if (i < n - 1) { // 向下
                union(getPos(2), getPosition(i + 1, j)(0))
            }
        }
    }

    // 连通分量数量
    let set = new Set()
    for (let k of roots.keys()) {
        set.add(find(k))
    }
    return set.size

    // 另一种统计连通分量方法
    // let count = 0
    // for (let [k, v] of roots.entries()) {
    //     if(k === v) count++
    // }
    // return count
};

const res = regionsBySlashes([" /", "/ "])
console.log(res)