import Vue from "vue";
import Base from "./index.vue";
import router from "./router";
import Register from "@/config/register";
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

Register.init();
Vue.config.productionTip = false;
Vue.use(Antd);

new Vue({
  router,
  render: h => h(Base)
}).$mount("#base");
