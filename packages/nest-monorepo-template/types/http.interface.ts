// http response
export interface IResp<T = any> {
  statusCode: number;
  data?: T;
  message?: string;
}
