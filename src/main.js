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

require("./mock.js");

Vue.use(ElementUI);

//?vue中使用插件,页面中直接this.即可使用
Vue.prototype.postRequest = postRequest;
Vue.prototype.getRequest = getRequest;
Vue.prototype.putRequest = putRequest;
Vue.prototype.deleteRequest = deleteRequest;
new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
