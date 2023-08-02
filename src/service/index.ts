// 创建实例, 并导出实例
import HYRequest from "./request"
import {BASE_URL, TIME_OUT} from "./config"

const hyRequest = new HYRequest({
  baseURL : BASE_URL,
  timeout : TIME_OUT
})
export const hyRequest2 = new HYRequest({
  baseURL: "http://codercba.com:1888/airbnb/api",
  timeout: 9000,
  interceptors: {
    requestSuccessFn: (config) => {
      console.log("爱彼迎请求成功拦截");
      return config
    },
    requestFailureFn: (err) => {
      console.log("爱彼迎请求失败拦截");
      return err
    },
    responseSuccessFn: (res) => {
      console.log("爱彼迎响应成功拦截");
      return res
    },
    responseFailureFn: (err) => {
      console.log("爱彼迎响应失败拦截");
      return err
    }
  }
})
export default hyRequest