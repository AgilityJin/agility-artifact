export interface IAliyunOSSInitOptions {
  bucket: string; // bucket name
  accessKeyId: string;
  accessKeySecret: string;
  region?: string; // default oss-cn-hangzhou
  endpoint?: string; // OSS域名
  secure?: boolean; // true=https false=http
  timeout?: number; // default 60
}

export interface IOSSOptions {
  type: 'aliyun';
  initOptions: IAliyunOSSInitOptions;
}
