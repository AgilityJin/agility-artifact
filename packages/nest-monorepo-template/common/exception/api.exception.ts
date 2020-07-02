import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiErrorCode } from './api-error-code';

/**
 * @name 业务异常响应
 */
export class ApiException extends HttpException {
  /**
   * @param errorMsg 异常消息
   * @param errorStatus 业务异常状态码
   * @param respStatus 请求异常状态码 业务异常默认请求状态200
   */
  constructor(
    errorMsg: string,
    errorStatus: ApiErrorCode = ApiErrorCode.DEFAULT,
    respStatus = HttpStatus.OK,
  ) {
    super(
      {
        statusCode: errorStatus,
        message: errorMsg,
      },
      respStatus,
    );
  }
}
