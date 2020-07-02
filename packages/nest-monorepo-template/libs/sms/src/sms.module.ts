import { Module, DynamicModule } from '@nestjs/common';
import { SmsService } from './sms.service';
import { ISmsOptions } from './sms.interface';

@Module({
  exports: [SmsService],
})
export class SmsModule {
  static forRoot(options: ISmsOptions): DynamicModule {
    return {
      module: SmsModule,
      providers: [
        {
          provide: SmsService,
          useValue: new SmsService(options),
        },
      ],
      exports: [SmsService],
    };
  }
}
