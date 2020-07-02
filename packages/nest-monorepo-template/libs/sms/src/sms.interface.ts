export enum ISmsAliyunStatus {
  'OK' = '短信发送成功',
  'isv.MOBILE_NUMBER_ILLEGAL' = '无效号码',
  'isv.DAY_LIMIT_CONTROL' = '今日可收短信已达上限',
  'isv.INVALID_JSON_PARAM' = '参数不合法',
  'isv.SMS_TEMPLATE_ILLEGAL' = '模板不合法',
  'isv.SMS_SIGNATURE_SCENE_ILLEGAL' = '短信所使用签名场景非法',
  'isv.PARAM_LENGTH_LIMIT' = '参数长度不可超过20',
  'isv.SMS_SIGNATURE_ILLEGAL' = '短信签名不合法'
}

export interface IAliyunInitOptions {
  accessKeyId: string;
  accessKeySecret: string;
  endpoint?: string;
  apiVersion?: string;
}

export interface ISmsOptions {
  type: 'aliyun';
  initOptions: IAliyunInitOptions;
}

export interface ISmsSendAliyunParams {
  phone: string;
  signName: string;
  templateCode: string;
  templateParam?: Record<string, any>;
}
