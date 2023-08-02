import axios from "axios"
import type {AxiosInstance, AxiosRequestConfig} from "axios"
import type { HYRequestConfig } from "./type"

//定义类, 并导出类
class HYRequest {
  instance: AxiosInstance

  // request实例 =>axios实例
  constructor(config:HYRequestConfig){
    this.instance = axios.create(config)

    // 1. 类的拦截器(每个axios.create()创建的实例添加拦截器)
    this.instance.interceptors.request.use((config)=>{
      // 1.1 开始loading动画/token
      console.log("全局请求成功的拦截器");
      return config
    }, err => {
      console.log("全局请求失败的拦截");
      return err
    })
    
    this.instance.interceptors.response.use(res => {
      // 1.2 结束loading动画
      console.log("全局响应成功的拦截");
      return res.data
    }, err => {
      console.log("全局响应失败的拦截");
      return err
    })

    // 2. 针对单个实例的拦截器 
    // if(config.interceptors){   //类型缩小或者可选链
     this.instance.interceptors.request.use(
      config.interceptors?.requestSuccessFn,
      config.interceptors?.requestFailureFn
      )
      this.instance.interceptors.response.use(
        config.interceptors?.responseSuccessFn,
        config.interceptors?.responseFailureFn
      )
    // }
  }

  //封装网络请求的方法
  request<T = any>(config:HYRequestConfig<T>){
    // 单次请求的成功拦截处理
    if(config.interceptors?.requestSuccessFn){
      config = config.interceptors.requestSuccessFn(config)
    }

    // 返回promise
    return new Promise<T>((resolve,reject)=>{
      this.instance.request<any, T>(config).then(res => {
         // 单次响应的成功拦截处理
         if(config.interceptors?.responseSuccessFn){
          res = config.interceptors.responseSuccessFn(res)
         }
         resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }
  get<T = any>(config: HYRequestConfig<T>){
    return this.request({...config, method: "GET"})
  }
  post<T = any>(config: HYRequestConfig<T>){
    return this.request({...config, method: "POST"})
  }
  delete<T = any>(config: HYRequestConfig<T>){
    return this.request({...config, method: "DELETE"})
  }
  patch<T = any>(config: HYRequestConfig<T>){
    return this.request({...config, method: "PATCH"})
  }

}
export default HYRequest