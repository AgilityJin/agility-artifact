import { Injectable } from '@nestjs/common';
import AliOSS = require('ali-oss');
import { IOSSOptions } from './oss.interface';

@Injectable()
export class OSSService {
  client: AliOSS;

  constructor(private OSSOptions: IOSSOptions) {
    switch (OSSOptions.type) {
      case 'aliyun':
        this.initAliyunClient();
        break;

      default:
        throw new Error('对象存储服务类型不正确');
    }
  }

  initAliyunClient() {
    this.client = new AliOSS({
      bucket: this.OSSOptions.initOptions.bucket,
      accessKeyId: this.OSSOptions.initOptions.accessKeyId,
      accessKeySecret: this.OSSOptions.initOptions.accessKeySecret,
      region: this.OSSOptions.initOptions.region,
      endpoint: this.OSSOptions.initOptions.endpoint,
      secure: this.OSSOptions.initOptions.secure,
      timeout: this.OSSOptions.initOptions.timeout,
    });
  }
}
