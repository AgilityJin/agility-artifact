/**
给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。

你可以假设每种输入只会对应一个答案。但是，数组中同一个元素不能使用两遍。

示例:
给定 nums = [2, 7, 11, 15], target = 9

因为 nums[0] + nums[1] = 2 + 7 = 9
所以返回 [0, 1]

 */
import { math } from '../utils/base'
/**
 * @name 查询数组内两个元素相加为指定值的元素下标
 *
 * @keyword [leetcoode-1, 两数之和]
 * @export
 * @param {number[]} nums 待查询的数组
 * @param {number} target 目标值
 * @returns {([number, number] | null)} 返回两个元素的下标,无匹配值则为null
 */
export function matchTwoValuesSum (nums: number[], target: number): [number, number] | null {
  if (nums.length < 2) { return null }

  const hasMap = new Map()
  for (let i = 0; i < nums.length; i++) {
    // 插入前查询内部是否已经存在该值
    const matchIndex = hasMap.get(Number(math.chain && math.chain(target).subtract(nums[i]).format(14).done()))
    if (matchIndex !== undefined) {
      return i <= matchIndex ? [i, matchIndex] : [matchIndex, i]
    } else {
      hasMap.set(nums[i], i)
    }
  }
  return null
}
