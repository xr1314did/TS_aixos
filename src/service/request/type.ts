import type {AxiosRequestConfig,AxiosResponse, InternalAxiosRequestConfig} from "axios"
// 正对AxiosRequestConfig配置进行扩展
export interface HYInterceptors<T = AxiosResponse> {
  // requestSuccessFn?: (config:  AxiosRequestConfig) =>  AxiosRequestConfig,
  requestSuccessFn?: (config: any) => InternalAxiosRequestConfig,
  requestFailureFn?: (err: any) => any,
  // responseSuccessFn?: (res:AxiosResponse) => AxiosResponse,
  responseSuccessFn?: (res: T) => T,
  responseFailureFn?: (err: any) => any
}
export interface HYRequestConfig<T = AxiosResponse> extends AxiosRequestConfig{
  interceptors? : HYInterceptors<T>
}