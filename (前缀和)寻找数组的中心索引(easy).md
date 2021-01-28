[724. 寻找数组的中心索引](https://leetcode-cn.com/problems/find-pivot-index/)

给定一个整数类型的数组 nums，请编写一个能够返回数组 “中心索引” 的方法。

我们是这样定义数组 中心索引 的：数组中心索引的左侧所有元素相加的和等于右侧所有元素相加的和。

如果数组不存在中心索引，那么我们应该返回 -1。如果数组有多个中心索引，那么我们应该返回最靠近左边的那一个。

- 示例 1：  
> 输入：  
nums = [1, 7, 3, 6, 5, 6]  
输出：3  
解释：  
索引 3 (nums[3] = 6) 的左侧数之和 (1 + 7 + 3 = 11)，与右侧数之和 (5 + 6 = 11) 相等。  
同时, 3 也是第一个符合要求的中心索引。

- 示例 2：
> 输入：  
nums = [1, 2, 3]  
输出：-1  
解释：  
数组中不存在满足此条件的中心索引。
> 

### 思路
记数组的全部元素之和为 total，当遍历到第 ii 个元素时，设其左侧元素之和为 sum，则其右侧元素之和为 total−nums[i]−sum。  
左右侧元素相等即为 sum=total−nums[i]−sum，
当中心索引左侧或右侧没有元素时，即为零个项相加，这在数学上称作「空和」(empty sum)
在程序设计中我们约定「空和是零」。

### CODE
```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var pivotIndex = function(nums) {
    const sum = nums.reduce((acc, curr)=> acc+curr, 0)
    let sumLeft = 0

    for(let [i, num] of nums.entries()){
        const sumRight = sum - sumLeft - num
        if(sumLeft === sumRight){
            return i
        }
        sumLeft += num
    }

    return -1
};
```