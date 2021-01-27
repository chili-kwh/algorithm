// https://leetcode-cn.com/problems/remove-max-number-of-edges-to-keep-graph-fully-traversable/
/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number}
 */

var maxNumEdgesToRemove = function (n, edges) {

    // 并查集类
    class UnionFindSet{
        constructor(roots) {
            this.roots = roots
        }

        find(n) {
            return this.roots[n] === n ? n : this.roots[n] = this.find(this.roots[n])
        }

        unite(a, b) {
            this.roots[this.find(a)] = this.find(b)
        }

        isConnected(a, b){
            return this.find(a) === this.find(b)
        }
    }


    // 初始化
    let connectNum = n // 连通分量
    let deleteNum = 0
    let roots = {}
    for (let i = 1; i <= n; i++) roots[i] = i
    const setShare = new UnionFindSet(roots)

    // 添加公共边
    for (const [type, a, b] of edges) {
        if (type === 3) {
            if (!setShare.isConnected(a, b)) {
                setShare.unite(a, b, roots);
                connectNum--;
            } else {
                deleteNum++
            }
        }
    }

    // 添加独立边
    let connectNumA = connectNumB = connectNum
    let setA = new UnionFindSet({...roots})
    let setB = new UnionFindSet({...roots})

    for (const [type, a, b] of edges) {
        switch (type) {
            case 1: {
                if (!setA.isConnected(a, b)) {
                    setA.unite(a, b);
                    connectNumA--;
                } else {
                    deleteNum++
                }
            }
                break;

            case 2: {
                if (!setB.isConnected(a, b)) {
                    setB.unite(a, b);
                    connectNumB--;
                } else {
                    deleteNum++
                }
            }
                break

            default:
                break
        }
    }

    // 判断连通分量数量
    if (connectNumA !== 1 || connectNumB !== 1) return -1
    return deleteNum

};

const n = 13
const edges = [[1, 1, 2], [2, 2, 3], [2, 3, 4], [1, 3, 5], [3, 2, 6], [2, 3, 7], [3, 7, 8], [3, 2, 9], [2, 4, 10], [2, 9, 11], [1, 2, 12], [3, 4, 13], [2, 2, 7], [1, 1, 9], [1, 2, 13], [2, 7, 13], [3, 2, 3], [1, 7, 10], [2, 8, 11], [1, 2, 7], [2, 1, 9], [2, 2, 9], [1, 5, 6], [2, 4, 9], [1, 7, 8], [1, 4, 6], [1, 4, 9], [3, 7, 13], [2, 2, 8], [2, 2, 6], [1, 1, 10], [1, 1, 11], [2, 5, 10], [1, 2, 9], [2, 1, 2], [1, 3, 4], [3, 6, 8], [3, 6, 13], [1, 3, 8], [1, 1, 6], [3, 3, 9], [1, 2, 3], [1, 11, 13]]
//预期结果： -1
const result = maxNumEdgesToRemove(n, edges)
console.log(result)
