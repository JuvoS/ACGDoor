import Vue from "vue";
import Base from "./index.vue";
import router from "./router";
import config from "@/config/";
import axios from "axios";

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.prototype.$config = config;

new Vue({
  router,
  render: h => h(Base)
}).$mount("#base");
