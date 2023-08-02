import { hyRequest2 } from "..";



interface IEntireListData {
	errcode: number,
	list: any[],
	totalCount: number
}

hyRequest2.request<IEntireListData>({
  url:"/entire/list",
  params: {
    offset: 0,
    size: 20
  },
  interceptors: {
    requestSuccessFn: config => {
      console.log("entire/list请求成功拦截");
      return config
    },
    responseSuccessFn: res => {
      console.log("entire/list响应成功拦截");
      return res
    }
  }
}).then(res => {
  console.log(res);
})