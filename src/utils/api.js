import axios from "axios";
import { Message } from "element-ui";
import router from "../router";

//+axios响应拦截器
axios.interceptors.response.use(
  (success) => {
    //业务逻辑错误
    const codes = [500, 401, 403];
    if (success.status && success.status === 200) {
      if (codes.includes(success.data.code)) {
        Message.error({ message: success.data.message });
        return;
      }
      if (success.data.message) {
        Message.success({ message: success.data.message });
      }
    }
    return success.data;
  },
  (error) => {
    if (error.response.code === 504 || error.response.code === 404) {
      Message.error({ message: "啊，要死了，服务器不知道去哪了" });
    } else if (error.response.code === 403) {
      Message.error({ message: "权限不足，请找找大宝" });
    } else if (error.response.code === 401) {
      Message.error({ message: "尚未登录，请登录" });
      router.replace("/");
    } else {
      if (error.response.data.message) {
        Message.error({ message: error.response.data.message });
      } else {
        Message.error({ message: "未知错误" });
      }
    }
    return;
  }
);

const baseUrl = "";

//post请求
export const postRequest = (url, params) => {
  return axios({
    method: "post",
    url: `${baseUrl}${url}`,
    data: params,
    headers: {
      "Content-Type": "application/json", // 指定json类型
    },
  });
};