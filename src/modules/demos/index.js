import Vue from "vue";
import Base from "./index.vue";
import router from "./router";
import Register from "@/config/register";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

// Install BootstrapVue
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

Register.init();
Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(Base),
}).$mount("#base");
