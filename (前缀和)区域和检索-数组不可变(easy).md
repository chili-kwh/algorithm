[303. 区域和检索 - 数组不可变](https://leetcode-cn.com/problems/range-sum-query-immutable/)

给定一个整数数组 nums，求出数组从索引 i 到 j（i ≤ j）范围内元素的总和，包含 i、j 两点。

实现 NumArray 类：

NumArray(int[] nums) 使用数组 nums 初始化对象 int sumRange(int i, int j) 返回数组 nums 从索引 i 到 j（i ≤ j）范围内元素的总和，包含 i、j 两点（也就是 sum(
nums[i], nums[i + 1], ... , nums[j])）

- 示例：

> 输入：  
[[[-2, 0, 3, -5, 2, -1]], [0, 2], [2, 5], [0, 5]]
>
> 输出：  
[null, 1, -1, -3]

解释：  
NumArray numArray = new NumArray([-2, 0, 3, -5, 2, -1]); numArray.sumRange(0, 2); // return 1 ((-2) + 0 + 3)
numArray.sumRange(2, 5); // return -1 (3 + (-5) + 2 + (-1))
numArray.sumRange(0, 5); // return -3 ((-2) + 0 + 3 + (-5) + 2 + (-1))

### [思路](https://leetcode-cn.com/problems/range-sum-query-immutable/solution/sha-shi-qian-zhui-he-ya-tu-jie-qian-zhui-0rla/)

这是一道前缀和的裸题。

当需要我们求「某一段」区域的和的时候，我们要很自然的想到「前缀和」。

前缀和的作用就是为了帮助我们快速求某一段的和，是「差分」的逆运算。

前缀和数组 sum 的每一位记录的是当前位置距离起点位置，这连续一段的和区间和。

因此当我们要求特定的一段 [i,j] 的区域和的时候，可以直接利用前缀和数组快速求解：ans = sum[j] - sum[i - 1]。

![](https://pic.leetcode-cn.com/1614563503-eNCXNU-image.png)

- 时间复杂度：预处理前缀和数组需要对原数组进行线性扫描，复杂度为 O(n)，计算结果复杂度为 O(1)。整体复杂度为 O(n)
- 空间复杂度：O(n)

最后我们看看「前缀和」与其他知识点的联系。

### 为啥「前缀和」能大幅度的降低区间求和的复杂度？

其实本质是利用数学进行求值：某一段的区间和 = 起点到区间右端点的和（含右端点）- 起点到区间左端点的和（不含左端点）

而求解前缀和数组的过程，则是基于**动态规划思想**：

由于前缀和的每一位都是求「当前位置到起点位置区间的和」。 因此当求解某一位的前缀和时，
需要「前一位置的前缀和」和「当前位置的原数组值」（而与前一位置的前缀和是如何计算出来无关）。


### CODE

```javascript
/**
 * @param {number[]} nums
 */
var NumArray = function (nums) {
        this.sumArr = preSum(nums)
    };

function preSum(nums) {
    let sumArr = []
    for (let i = 0; i < nums.length; i++) {
        sumArr.push((sumArr[i - 1] || 0) + nums[i])
    }
    return sumArr
}

/**
 * @param {number} i
 * @param {number} j
 * @return {number}
 */
NumArray.prototype.sumRange = function (i, j) {
    return this.sumArr[j] - (this.sumArr[i - 1] || 0)
};

/**
 * Your NumArray object will be instantiated and called as such:
 * var obj = new NumArray(nums)
 * var param_1 = obj.sumRange(i,j)
 */
```