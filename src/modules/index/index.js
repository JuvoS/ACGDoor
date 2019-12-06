import Vue from "vue";
import Base from "./index.vue";
import router from "./router";

Vue.use(require("vue-wechat-title"));

new Vue({
  router,
  render: h => h(Base)
}).$mount("#base");
