// https://leetcode-cn.com/problems/longest-repeating-character-replacement/
// 给你一个仅由大写英文字母组成的字符串，你可以将任意位置上的字符替换成另外的字符，总共可最多替换 k 次。在执行上述操作后，找到包含重复字母的最长子串的长度。
//
// 注意：字符串长度 和 k 不会超过 104。
//
// 输入：s = "ABAB", k = 2
// 输出：4
// 解释：用两个'A'替换为两个'B',反之亦然。

/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */

// 窗口扩张 right++
// 窗口平移 left++ right++

var characterReplacement = function (s, k) {
    let n = s.length
    let left = 0
    let right = 0
    let historyMaxNum = 0
    let strMap = new Array(26).fill(0)
    const getIndex = str => str.charCodeAt() - 'A'.charCodeAt()

    while (right < n) {
        let strNum = ++(strMap[getIndex(s[right])])
        historyMaxNum = Math.max(historyMaxNum, strNum)

        // 窗口宽度 > 最长子串
        if (right - left + 1 > historyMaxNum + k) { // 窗口平移
            strMap[getIndex(s[left])]--
            left++
        }
        right++
    }

    return n - left
};

// const res = characterReplacement('ABAB', 2) // 4
// const res = characterReplacement('AABABBA', 1) // 4
// const res = characterReplacement('ABAA', 0) // 2
// const res = characterReplacement('ABCDE', 1) // 2
const res = characterReplacement('AABAA', 2) // 5
console.log(res)