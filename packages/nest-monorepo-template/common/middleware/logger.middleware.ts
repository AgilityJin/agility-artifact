import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { format } from 'date-fns';
import { IS_PROD } from '../';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    if (IS_PROD && req.method === 'GET') {
      next()
    } else {
      // FIXME: 无法获取params及body
      const params = JSON.stringify(req.params) !== '{}' ? `\tParams: ${JSON.stringify(req.params)}` : ''
      const query = JSON.stringify(req.query) !== '{}' ? `\tQuery: ${JSON.stringify(req.query)}` : ''
      const body = req.body ? `\tBody: ${JSON.stringify(req.body)}` : ''
      console.info(
        `[${format(Date.now(), 'yyyy-MM-dd HH:mm:ss')}]\t${req.protocol.toLocaleUpperCase()}/${req.httpVersion}\t${req.method}\t${req.path}\tfrom\t[${req.header('x-forwarded-for') || req.ip || 'unknown ip'}]${params}${query}${body}`);
      next();
    }
  }
}
