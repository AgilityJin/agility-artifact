import { Module, DynamicModule } from '@nestjs/common';
import { OSSService } from './oss.service';
import { IOSSOptions } from './oss.interface';

@Module({})
export class OSSModule {
  static forRoot(ossOptions: IOSSOptions): DynamicModule {
    return {
      module: OSSModule,
      providers: [
        {
          provide: OSSService,
          useValue: new OSSService(ossOptions),
        },
      ],
      exports: [OSSService],
    };
  }
}
