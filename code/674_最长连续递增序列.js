// https://leetcode-cn.com/problems/longest-continuous-increasing-subsequence/
/**
 * @param {number[]} nums
 * @return {number}
 */
var findLengthOfLCIS = function (nums) {
    if (nums.length <= 1) return nums.length

    let last = nums[0]
    let count = 0
    let result = []
    for (let i = 1; i < nums.length; i++) {
        const n = nums[i]
        if (n > last) {
            console.log(n)
            console.log(last)
            count++
        } else {
            result.push(count + 1)
            count = 0
        }
        last = n
    }
    result.push(count+1)

    return Math.max(...result)
};

const nums = [1, 3, 5, 4, 2, 3, 4, 5]
findLengthOfLCIS((nums))