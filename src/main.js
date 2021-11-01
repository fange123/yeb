import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import {
  postRequest,
  getRequest,
  putRequest,
  deleteRequest,
} from "./utils/api";
import store from "./store";
import { initMenu } from "./utils/menus";
require("./mock.js");

Vue.use(ElementUI);

//?vue中使用插件,页面中直接this.即可使用
Vue.prototype.postRequest = postRequest;
Vue.prototype.getRequest = getRequest;
Vue.prototype.putRequest = putRequest;
Vue.prototype.deleteRequest = deleteRequest;

router.beforeEach((to, __, next) => {
  if (sessionStorage.getItem("token")) {
    initMenu(router, store);

    //!判断用户信息是否存在
    if (!sessionStorage.getItem("user")) {
      //~ return 一个请求，没搞懂为啥要return，但不return就拿不到值。。。
      return getRequest("/api/admin/info").then((res) => {
        if (res.data) {
          //存入用户信息
          sessionStorage.setItem("user", JSON.stringify(res.data));
          next();
        }
      });
    }
    next();
  } else {
    if (to.path === "/") {
      next();
    } else {
      //~没有登录直接输入url的情况
      next("/?redirect=" + to.path);
    }
  }
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
