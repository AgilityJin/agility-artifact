import {
  HttpStatus,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IResp } from '@type';

const DEFAULT_MESSAGE = 'operation succeeded';

/**
 * @name 响应拦截器
 */
@Injectable()
export class RespInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(resp => {
        let result: IResp;
        if (Array.isArray(resp)) {
          const [data, message, status] = resp;
          result = {
            data,
            message: message || DEFAULT_MESSAGE,
            statusCode: status || HttpStatus.OK,
          };
        } else {
          result = {
            data: resp,
            statusCode: HttpStatus.OK,
            message: DEFAULT_MESSAGE,
          };
        }
        return result;
      }),
    );
  }
}
