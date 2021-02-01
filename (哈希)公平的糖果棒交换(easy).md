[888. 公平的糖果棒交换](https://leetcode-cn.com/problems/fair-candy-swap/)

爱丽丝和鲍勃有不同大小的糖果棒：A[i] 是爱丽丝拥有的第 i 根糖果棒的大小，B[j] 是鲍勃拥有的第 j 根糖果棒的大小。

因为他们是朋友，所以他们想交换一根糖果棒，这样交换后，他们都有相同的糖果总量。（一个人拥有的糖果总量是他们拥有的糖果棒大小的总和。）

返回一个整数数组 ans，其中 ans[0] 是爱丽丝必须交换的糖果棒的大小，ans[1] 是 Bob 必须交换的糖果棒的大小。

如果有多个答案，你可以返回其中任何一个。保证答案存在。

示例 1：

>输入：A = [1,1], B = [2,2]  
输出：[1,2]

示例 2：

> 输入：A = [1,2], B = [2,3]  
输出：[1,2]

示例 3：

> 输入：A = [2], B = [1,3]  
输出：[2,3]

示例 4：

> 输入：A = [1,2,5], B = [2,4]  
输出：[5,4]

### 思路

记爱丽丝的糖果棒的总大小为 sumA，鲍勃的糖果棒的总大小为 sumB。  
设答案为 {x,y}，即爱丽丝的大小为 x 的糖果棒与鲍勃的大小为 y 的糖果棒交换，则有如下等式：   
sumA − x + y = sumB + x − y  
化简，得：  
x = y + (sumA−sumB) / 2

为了快速查询  A 中是否存在某个数，我们可以先将  A 中的数字存入哈希表中。  
然后遍历 B 序列中的数 y' 在**哈希表**中查询是否有对应的 x'

JS中 使用Set来维护哈希表 性能优于Array

### CODE 
```javascript
/**
 * @param {number[]} A
 * @param {number[]} B
 * @return {number[]}
 */
var fairCandySwap = function (A, B) {
    const sumA = A.reduce((acc, e) => acc + e, 0)
    const sumB = B.reduce((acc, e) => acc + e, 0)
    const setB = new Set(B)

    for (let x of A) {
        const y = (sumB - sumA) / 2 + x;
        if (setB.has(y)) {
            return [x, y]
        }
    }
};

```