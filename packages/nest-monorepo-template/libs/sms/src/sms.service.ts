import { Injectable } from '@nestjs/common';
import AliyunCore = require('@alicloud/pop-core');
import {
  ISmsOptions,
  ISmsAliyunStatus,
  ISmsSendAliyunParams,
} from './sms.interface';
import { ApiException } from '@common';

@Injectable()
export class SmsService {
  client: AliyunCore;

  constructor(private smsOptions: ISmsOptions) {
    switch (smsOptions.type) {
      case 'aliyun':
        this.initAliyunClient();
        break;

      default:
        throw new Error('短信服务类型不正确');
    }
  }

  send(params: ISmsSendAliyunParams) {
    switch (this.smsOptions.type) {
      case 'aliyun':
        return this.sendAliyun(params);

      default:
        throw new Error('短信服务类型不正确');
    }
  }

  private sendAliyun(data: ISmsSendAliyunParams) {
    const params: any = {
      RegionId: 'cn-hangzhou',
      SignName: data.signName,
      PhoneNumbers: data.phone,
      TemplateCode: data.templateCode,
    };
    if (data.templateParam)
      params.TemplateParam = JSON.stringify(data.templateParam); // 例如: `{code: ${code}}`
    return new Promise((resolve, reject) => {
      this.client
        .request('SendSms', params, 'POST')
        .then((result: any) => {
          switch (result.Code) {
            case 'OK':
              resolve({
                statusCode: 200,
                message: ISmsAliyunStatus['OK'],
              });
              break;

            default:
              reject(new ApiException(ISmsAliyunStatus[result.Code] || '短信发送失败'))
              break;
          }
        })
        .catch(err => {
          if (ISmsAliyunStatus[err.code]) {
            reject(new ApiException(ISmsAliyunStatus[err.code]))
          } else {
            reject(new ApiException(err.message || err))
            console.log('未收录的短信异常', err.code, err.message);
          }
        });
    });
  }

  private initAliyunClient() {
    this.client = new AliyunCore({
      accessKeyId: this.smsOptions.initOptions.accessKeyId,
      accessKeySecret: this.smsOptions.initOptions.accessKeySecret,
      endpoint:
        this.smsOptions.initOptions.endpoint || 'https://dysmsapi.aliyuncs.com',
      apiVersion: this.smsOptions.initOptions.apiVersion || '2017-05-25',
    });
  }
}
