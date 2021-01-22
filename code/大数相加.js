/**
 * @param {number[]} A
 * @param {number} K
 * @return {number[]}
 */
var addToArrayForm = function (A, K) {
    if (K === 0) return A

    let a = [...A]
    let b = String(K).split('')

    let result = []
    let flag = 0

    while (a.length || b.length || flag) {
        const temp = (a.pop() || 0) + (+(b.pop()) || 0) + flag
        flag = Math.floor(temp / 10)
        result.push(temp % 10)
    }

    return result.reverse()
};

A = [1, 3, 4, 6]
K = 122
console.log(addToArrayForm(A, K))
console.log(A)
console.log(K)