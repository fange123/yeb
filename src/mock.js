// 引入mockjs
const Mock = require("mockjs");
import img from "./assets/code.png";

//获取验证码
const getCaptcha = function() {
  return {
    code: 200,
    data: img,
  };
};

//登录
const login = function(params) {
  const { username, password } = JSON.parse(params.body);
  let isLogin = false;
  if (username === "admin" && password === "123") {
    isLogin = true;
    return {
      data: {
        isLogin,
      },
      code: 200,
      success: true,
      message: "登录成功",
    };
  }
  return {
    code: 403,
    success: false,
    message: "用户名活密码错误",
  };
};

// 请求该url，就可以返回内容
Mock.mock("/api/captcha", getCaptcha);
Mock.mock("/api/login", "post", login);
