import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as Joi from '@hapi/joi';
import { ApiException } from '@common';

type IEnvConfig = Record<string, any>;

@Injectable()
export class ConfigService {
  private readonly envConfig: IEnvConfig;
  constructor(filePath: string) {
    const config = dotenv.parse(fs.readFileSync(filePath));
    this.envConfig = this.validateEnv(config);
  }

  /**
   * @name 获取指定key的config值
   *
   * @param {string} key 键名
   * @returns {any} 返回配置项
   * @memberof ConfigService
   */
  get(key: string): any {
    return this.envConfig[key];
  }

  /**
   * @name 获取所有环境配置参数
   */
  all(): IEnvConfig {
    return this.envConfig;
  }

  /**
   * @name 校验环境参数合法性
   * @param {IEnvConfig} envConfig 环境配置参数
   */
  private validateEnv(envConfig: IEnvConfig): IEnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      ENV: Joi.string()
        .valid('dev', 'prod')
        .default('prod'),
      DATABASE_TYPE: Joi.string()
        .valid('mysql')
        .default('mysql'),
      DATABASE_HOST: Joi.string(),
      DATABASE_PORT: Joi.number().default(3306),
      DATABASE_NAME: Joi.string(),
      DATABASE_USER: Joi.string(),
      DATABASE_PASSWORD: Joi.string(),
    });

    const { error, value: validateEnvConfig } = envVarsSchema.validate(
      envConfig,
    );

    if (error) {
      throw new ApiException(`Config validation error: ${error.message}`);
    }
    return validateEnvConfig;
  }
}
