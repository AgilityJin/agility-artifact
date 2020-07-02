import { Repository, EntityManager } from 'typeorm';
import { ApiException, ApiErrorCode } from '@common';
import { IValidateUnique } from './db.interface';

export class DbBaseService<T = any> {
  constructor(public readonly repo: Repository<T>) {}

  /**
   * @name 创建事务处理
   * @param callbackFn 回调manager
   * @description 隐式commit 隐式rollback
   */
  async task (callbackFn: (entityManager: EntityManager) => any) {
    return this.repo.manager.transaction(callbackFn)
  }

  /**
   * @name 检查值的唯一性
   * @param params 需要被检查的参数对象
   */
  async validateUnique(params: IValidateUnique | IValidateUnique[], merchantId?: number) {
    const data = Array.isArray(params) ? params : [params];

    for (let index = 0; index < data.length; index++) {
      const item = data[index];
      const params = {
        [item.key]: item.value,
      }
      if (merchantId) params.merchantId = merchantId
      const result = await this.repo.findOne({
        where: params,
      });
      if (result) {
        throw new ApiException(
          item.msg || `${item.value} 已存在,不可重复添加`,
          ApiErrorCode.ER_DUP_ENTRY,
        );
      }
    }
    return true;
  }
}
