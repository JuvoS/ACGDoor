import Vue from "vue";
import Base from "./index.vue";
import router from "./router";
import Register from "@/config/register";

Register.init();

new Vue({
  router,
  render: h => h(Base)
}).$mount("#base");
