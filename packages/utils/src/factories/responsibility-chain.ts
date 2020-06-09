/**
 * @export
 * @class ResponsibilityChain
 * @name 创建责任链
 * @constructor
 */
class ResponsibilityChain {
  private successor?: ResponsibilityChain

  /**
   *Creates an instance of ResponsibilityChain.
   * @param {Function} fn 提供一个处理方法,如果是异步该方法需要返回Promise
   * @param {String} [nextKey='next'] 提供标识key,通过在fn中返回该key进入指定的下一条责任链,默认为'next'
   * @memberof ResponsibilityChain
   */
  constructor (
    private fn: Function,
    private nextKey = 'next'
  ) {}

  /**
   * @name 设置下一个处理事务
   * @param {ResponsibilityChain} successor
   * @memberof ResponsibilityChain
   */
  setNext (successor: ResponsibilityChain) {
    this.successor = successor
  }

  /**
   * @name 从当前链条开始执行事务
   *
   * @template T 返回值的类型
   * @template U 参数类型
   * @param {...U[]} args 参数数组
   * @returns {Promise<T>} 响应的值
   * @memberof ResponsibilityChain
   */
  async handleTask<T = any, U = any> (...args: U[]): Promise<T> {
    const result = await this.fn.apply(this, args)
    if (result === this.nextKey && this.successor) {
      return await this.successor.handleTask.apply(this.successor, args) as T
    } else return result
  }
}

export default ResponsibilityChain
