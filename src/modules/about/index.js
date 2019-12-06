import Vue from "vue";
import Base from "./index.vue";
import router from "./router";

new Vue({
  router,
  render: h => h(Base)
}).$mount("#base");
