import RootRequest from './request.root';
import Axios, {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";
import isEmpty from 'lodash/isEmpty'

import { IaxiosRequestOptions, IapiParams, IRequestOptions } from '../../interface';

/**
 * @name 创建axios异步请求实例类
 * @example
 * // 示例
 * // service file
 * export const test = {
 * 	url: '/test/list',
 * 	method: 'get',
 * 	options: {
 * 		timeout: 2000,
 * 		baseURL: 'https://www.test.top',
 * 		payload: '?test=test' // 这部分会直接附加在url后面, 调用api实例时,第二个配置选择一样也可以设置此项
 * 	}
 * };
 *
 * // api plugin file
 * import { IApiContextType } from "@helper-gdp/utils";
 * import * as Svc from './serviceFile'
 * // 如果是挂载在vue原型上,可以通过以下方式声明api的context来提供智能提示及TS检测
 * declare module 'vue/types/vue' {
 *  interface Vue {
 *    $api: typeof $api & IApiContextType
 *  }
 * }
 * const $api = new Request({
 *   config: AxiosRequestConfig,
 *   token: {
 *     key: string,
 *     getToken: () => string
 *   },
 *   requestList: Svc, // 往实例挂载某批具体的请求,
 *   requestInterceptor: (config: AxiosRequestConfig) => AxiosRequestConfig
 *   responseInterceptor: (resp: AxiosResponse<any>) => any
 *   responseErrorInterceptor: (error: AxiosError<any>) => any
 * })
 */
export default class Request<RequestType extends Record<string, any> = {}> extends RootRequest {
  constructor(opts?: IRequestOptions) {
    super();
    if (opts && opts.config) this.setConfig(opts.config)
    if (opts && opts.token && opts.token.getToken) this.registerGetTokenFunc(opts.token.getToken, opts.token.key);
    if (opts && opts.requestInterceptor) this.addRequestInterceptor(opts.requestInterceptor);
    if (opts && opts.responseInterceptor) this.addResponseInterceptor(opts.responseInterceptor)
    if (opts && opts.responseErrorInterceptor) this.addResponseErrorHandle(opts.responseErrorInterceptor)
    if (opts && opts.requestList) this.registerApiContext(opts.requestList)
    this.createInstance()
  }

	private invokeApi(name: string, params: any, options?: IaxiosRequestOptions) {
		if (!(name in this.apiContext)) throw new Error(`请求实例上不存在${name}方法`);
		const method = this.apiContext[name].method;
    const opts = Object.assign({}, this.tokenFn, this.apiContext[name].options, options);
		switch (method) {
			case 'get':
				return this.get(this.apiContext[name].url, params, opts)
			case 'post':
				return this.post(this.apiContext[name].url, params, opts)
			case 'put':
				return this.put(this.apiContext[name].url, params, opts)
			case 'delete':
				return this.delete(this.apiContext[name].url, params, opts)
			default:
				throw new Error(`${method} 是不受支持的请求方法`)
		}
  }
  /**
   * 
   * @param name 挂载的key
   * @param url 该key方法所请求的url地址
   * @param options IaxiosRequestOptions配置对象
   */
  private registerApi<Name extends string>(this: Request<RequestType>, name: Name, url: string, options: IaxiosRequestOptions = {}) {
    if(name in this.apiContext) throw new Error(`${name} key 已在请求实例上下文中存在`);
    // 上下文存储配置信息
    this.apiContext[name] = {
      url,
      ...options
    }
    if(name in this) throw new Error(`${name} key 已在请求实例中存在`);
    const self = this as any;
    // 定义实际调用异步方法
    self[name] = (params: any, opts: IaxiosRequestOptions) => {
      return this.invokeApi(name, params, opts).catch((e: AxiosError) => {throw e});
    }
  }

  /**
   * @name 注册请求上下文接口
   * @param service {key: IapiParams}[]
   */
  private registerApiContext(service: Record<string, IapiParams>) {
    const svc = Object.entries(service) as [string, any][]
    for (const item of svc) {
      this.registerApi(item[0], item[1].url, item[1])
    }

    return this;
  }
  /**
   * @name 设置请求配置项
   * @param axiosConfig 
   */
  private setConfig(axiosConfig: AxiosRequestConfig) {
    this.axiosConfig = Object.assign({}, this.axiosConfig, axiosConfig);
    
    return this;
  }

  /**
   * @name 注册获取token的方法
   * @param getTokenFunc 
   * @param tokenKey 
   */
  private registerGetTokenFunc(getTokenFunc: () => string, tokenKey?: string) {
    this.getTokenFn = getTokenFunc;
    if(tokenKey) this.tokenKey = tokenKey;

    return this;
  }

  /**
   * @name 请求前拦截器回调方法
   * @param interceptorFunc 请求拦截器回调方法,该方法必须接受AxiosRequestConfig参数且返回AxiosRequestConfig参数
   */
  private addRequestInterceptor(interceptorFunc: (config: AxiosRequestConfig) => AxiosRequestConfig) {
    this.requestInterceptorFn = interceptorFunc

    return this;
  }

  /**
   * @name 响应前拦截器
   * @param interceptorFunc 响应拦截器回调方法,该方法必须接受AxiosResponse,响应任意值
   */
  private addResponseInterceptor(interceptorFunc: (resp: AxiosResponse) => any) {
    this.responseInterceptorFn = interceptorFunc

    return this;
  }

  /**
   * @name 添加响应异常处理方法
   * @param handleErrorFunc 处理请求后异常的回调方法
   */
  private addResponseErrorHandle(handleErrorFunc: (error: AxiosError) => any) {
    this.responseErrorInterceptorFn = handleErrorFunc;

    return this;
  }

  /**
   * @name 创建实例方法
   * @returns apiInstance 返回请求实例
   */
  private createInstance() {
    this.axios = Axios.create(this.axiosConfig)
    this.request();
    this.response();

    return this;
  }

  /**
   * @name this is request get function
   * @param apiUrl 请求地址
   * @param query 查询参数对象
   * @param option 请求可选配置项
   */
  async get(apiUrl: string, query?: Record<string, any>, option?: IaxiosRequestOptions) {
    if (this.axios === null) throw new Error("请求尚未执行实例化");
    if (!option || isEmpty(option)) option = Object.assign({}, this.axiosConfig, this.tokenFn)
    const config = Object.assign({}, option, {
			params: query,
    });

    const url = option.payload ? apiUrl + option.payload : apiUrl;
		const resp = await this.axios.get(url, config);
    return resp
  }
  /**
   * @name this is request post function
   * @param apiUrl 请求地址
   * @param body 请求参数体
   * @param query 查询参数对象
   * @param option 请求可选配置项
   */
  async post(apiUrl: string, body?: Record<string, any>, option: IaxiosRequestOptions = {}) {
    if (this.axios === null) throw new Error("请求尚未执行实例化");
    if (!option || isEmpty(option)) option = Object.assign({}, this.axiosConfig, this.tokenFn)
		const url = option.payload ? apiUrl + option.payload : apiUrl;
		const resp = await this.axios.post(url, body, option);
		return resp
	}
  /**
   * @name this is request put function
   * @param apiUrl 请求地址
   * @param body 请求参数体
   * @param query 查询参数对象
   * @param option 请求可选配置项
   */
  async put(apiUrl: string, body?: Record<string, any>, option: IaxiosRequestOptions = {}) {
    if (this.axios === null) throw new Error("请求尚未执行初始化");
    if (!option || isEmpty(option)) option = Object.assign({}, this.axiosConfig, this.tokenFn)
		const url = option.payload ? apiUrl + option.payload : apiUrl;
		const resp = await this.axios.put(url, body, option);
		return resp
	}
  /**
   * @name this is request delete function
   * @param apiUrl 请求地址
   * @param body 请求参数体
   * @param query 查询参数对象
   * @param option 请求可选配置项
   */
  async delete(apiUrl: string, body?: Record<string, any>, option: IaxiosRequestOptions = {}) {
    if (this.axios === null) throw new Error("请求尚未执行初始化");
    if (!option || isEmpty(option)) option = Object.assign({}, this.axiosConfig, this.tokenFn)
		const config = Object.assign({}, option, {
      data: body
		});
		const url = option.payload ? apiUrl + option.payload : apiUrl;
		const resp = await this.axios.delete(url, config);
		return resp
	}
}
