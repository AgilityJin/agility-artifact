import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { RespInterceptor, LoggerMiddleware } from '@common';
import { SERVER_PORT } from '~/admin/config';
import * as compression from 'compression';
import * as helmet from 'helmet';
// import * as rateLimit from 'express-rate-limit';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 创建api文档
  const apiDocOptions = new DocumentBuilder()
    .setTitle('Demo Api Docs')
    .setDescription('Api document')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, apiDocOptions);
  SwaggerModule.setup('docs/v1', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      // disableErrorMessages: true, // 禁止返回详细信息
      whitelist: false, // 非DTO属性自动移除
      transform: true, // 自动将类型转换为定义的类型
    }),
  );
  app.useGlobalInterceptors(new RespInterceptor());

  app.use(compression()) // gzip
  app.use(helmet()) // 安全设置
  // app.set('trust proxy', 1) 使用rateLimit前需要先设置express的trust proxy
  // app.use(
  //   rateLimit({
  //     windowMs: 15 * 60 * 1000, // 15 minutes
  //     max: 100, // limit each IP to 100 requests per windowMs
  //   })
  // ) // 速率限制
  app.use(new LoggerMiddleware().use)
  app.setGlobalPrefix('v1');
  await app.listen(SERVER_PORT);
}
bootstrap();
