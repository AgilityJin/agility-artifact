import {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError
} from "axios";

export interface IapiParams {
  method: string;
  url: string;
  options?: IaxiosRequestOptions;
}

export interface IaxiosRequestOptions extends AxiosRequestConfig {
	payload?: string; // 拼接在请求地址后的参数
}

export interface IRequestOptions {
  config?: AxiosRequestConfig;
  token?: {
    key?: string;
    getToken: () => string;
  };
  requestList?: Record<string, IapiParams>;
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  responseInterceptor?: (resp: AxiosResponse<any>) => any;
  responseErrorInterceptor?: (error: AxiosError<any>) => any;
}

export type IApiContextType = Record<string, (params?: Record<string, any>, options?: IaxiosRequestOptions) => any>
