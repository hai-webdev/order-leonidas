import "./mock";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "./styles/reset.css";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

import BaiduMap from "vue-baidu-map";

Vue.use(BaiduMap,{
  ak: 'xL6cMDfAP1LWxavjRBMlbtG2XwNbAhlW'
});

// 引入api
import api from "@/api";
Vue.prototype.$api = api;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
