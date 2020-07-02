import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { format } from 'date-fns';
import { IS_PROD } from '../';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request & { __startTime: Date | string | number }, res: Response, next: Function) {
    if (IS_PROD && req.method === 'GET') {
      next()
    } else {
      req.__startTime = new Date()
      const params = JSON.stringify(req.params) !== '{}' ? `\tParams: ${JSON.stringify(req.params)}` : ''
      const query = JSON.stringify(req.query) !== '{}' ? `\tQuery: ${JSON.stringify(req.query)}` : ''
      const body = JSON.stringify(req.body) !== '{}' ? `\tBody: ${JSON.stringify(req.body)}` : ''
      const reqTime = Date.now()
      res.once('close', () => {
        // @ts-ignore
        const time = new Date() - req.__startTime
        delete req.__startTime
        console.info(
          `[${format(reqTime, 'yyyy-MM-dd HH:mm:ss')}]\t${req.protocol.toLocaleUpperCase()}/${req.httpVersion}\t${req.method}\t${req.path}\tfrom\t[${req.header('x-forwarded-for') || req.ip || 'unknown ip'}]${params}${query}${body}\t处理耗时: ${time}毫秒`);
      })
      next();
    }
  }
}
