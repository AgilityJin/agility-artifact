import qs from 'qs';
import {
	AxiosInstance,
	AxiosRequestConfig,
	AxiosResponse,
	AxiosError
} from "axios";

export default class RootRequest {
	protected constructor() {
		// 不允许非继承使用
	}
	protected axios: AxiosInstance | null = null // axios根实例挂载点
  protected axiosConfig: AxiosRequestConfig = {
    timeout: 1000 * 60 * 5,
    paramsSerializer(params: any) {
      return qs.stringify(params);
    },
		responseType: "json",
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
    withCredentials: true, // 跨域token,如果是服务端做则需要关闭该项
  } // 实例配置挂载点
  protected getTokenFn?: () => string // 获取token值得方法
	protected tokenKey = 'Authorization' // token的key值
	// 请求前统一设置config的钩子
	protected requestInterceptorFn?: (config: AxiosRequestConfig) => AxiosRequestConfig
	// 请求前异常拦截器方法 (暂不开放挂载)
	// requestErrorInterceptorFn = null
	// 响应前拦截钩子
	protected responseInterceptorFn?: (resp: AxiosResponse) => any
	// 请求后异常拦截器
	protected responseErrorInterceptorFn?: (error: AxiosError) => any
	// api 实例上下文
	protected apiContext: Record<string, any> = {}

	/**
   * @name 返回token的方法
   */
  get tokenFn() {
		if (!this.getTokenFn) return null;
		const token: AxiosRequestConfig = {
			headers: {
				[this.tokenKey]: this.getTokenFn() || ''
			}
		}
		return token
	}

	/**
	 * @name 请求拦截器
	 */
  protected request() {
		if (this.axios === null) throw new Error("请求尚未执行实例化");

		this.axios.interceptors.request.use(
			(config: AxiosRequestConfig) => {
				if (this.requestInterceptorFn) {
					return this.requestInterceptorFn(config)
				}
				return config;
			},
			(error: Error | AxiosError) => {
				return Promise.reject(error);
			},
		);
	}

	/**
	 * @name 响应拦截器
	 */
	protected response() {
		if (this.axios === null) throw new Error("请求尚未执行实例化");

		this.axios.interceptors.response.use(
			(response: AxiosResponse) => {
				if (this.responseInterceptorFn) {
					return this.responseInterceptorFn(response)
				}
				return response;
			},
			(error: AxiosError) => {
				if(this.responseErrorInterceptorFn) {
					return Promise.reject(this.responseErrorInterceptorFn(error))
				}
				return Promise.reject(error);
			},
		);
	}
}
