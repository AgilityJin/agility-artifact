import { Module } from '@nestjs/common';
import { SessionModule } from 'nestjs-session';
import { APP_KEY } from '@common';
import { COOKIE_TIMEOUT } from './config';

@Module({
  imports: [
    SessionModule.forRoot({
      session: {
        secret: APP_KEY,
        cookie: {
          maxAge: COOKIE_TIMEOUT,
        },
        rolling: true,
      },
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
