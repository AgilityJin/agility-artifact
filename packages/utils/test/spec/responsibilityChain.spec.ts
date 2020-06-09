import { ResponsibilityChain } from '../../src/main'

describe('责任链测试', () => {
  it('同步责任链测试', async () => {
    const handleEt = new ResponsibilityChain((age: number) => {
      if (age < 12) {
        return '他是儿童'
      } else { return 'next' }
    })
    const handleQsn = new ResponsibilityChain((age: number) => {
      if (age >= 12 && age < 18) {
        return '他是青少年'
      } else { return 'next' }
    })
    const handleCr = new ResponsibilityChain((age: number) => {
      if (age >= 18) {
        return '他是成人'
      }
    })
    handleEt.setNext(handleQsn)
    handleQsn.setNext(handleCr)
    const result1 = await handleEt.handleTask(1)
    const result2 = await handleEt.handleTask(12)
    const result3 = await handleEt.handleTask(15)
    const result4 = await handleEt.handleTask(18)
    expect(result1).toBe('他是儿童')
    expect(result2).toBe('他是青少年')
    expect(result3).toBe('他是青少年')
    expect(result4).toBe('他是成人')
  })
  it('异步责任链测试', async () => {
    const handleEt = new ResponsibilityChain((age: number) => {
      return new Promise((resolve) => {
        if (age < 12) {
          resolve('他是儿童')
        } else { resolve('next') }
      })
    })
    const handleQsn = new ResponsibilityChain((age: number) => {
      return new Promise((resolve) => {
        if (age >= 12 && age < 18) {
          resolve('他是青少年')
        } else { resolve('next') }
      })
    })
    const handleCr = new ResponsibilityChain((age: number) => {
      if (age >= 18 && age <= 100) {
        return '他是成人'
      } else return 'next'
    })
    const handleErr = new ResponsibilityChain((age: number) => {
      if (age > 100) {
        throw new Error('它的年纪实在是太大了')
      }
    })
    handleEt.setNext(handleQsn)
    handleQsn.setNext(handleCr)
    handleCr.setNext(handleErr)
    const result1 = await handleEt.handleTask(1)
    const result2 = await handleEt.handleTask(12)
    const result3 = await handleEt.handleTask(15)
    const result4 = await handleEt.handleTask(18).catch(err => console.log('Error: ', err))
    expect(result1).toBe('他是儿童')
    expect(result2).toBe('他是青少年')
    expect(result3).toBe('他是青少年')
    expect(result4).toBe('他是成人')
    await expect(handleEt.handleTask(110)).rejects.toThrowError()
  })
})
