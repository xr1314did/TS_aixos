// home模块发送网络请求

import hyRequest from "..";

interface IHomeData {
	data: any
	return: string
	success: boolean
}

hyRequest.request<IHomeData>({
  url: "/home/multidata"
}).then(res => {
  console.log(res)
}).catch(err => err.message)