import Vue from "vue";
import Base from "./index.vue";
import router from "./router";
import config from "@/config/";

Vue.prototype.$config = config;

new Vue({
  router,
  render: h => h(Base)
}).$mount("#base");
