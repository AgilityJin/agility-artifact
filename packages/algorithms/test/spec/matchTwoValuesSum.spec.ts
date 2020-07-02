import { matchTwoValuesSum  } from '../../src/main'

describe('查询数组内两个元素相加为指定值的元素下标', () => {
  it('test timer', async () => {
    expect(matchTwoValuesSum([2,11,7,15], 9)).toEqual([0, 2])
  })
})
