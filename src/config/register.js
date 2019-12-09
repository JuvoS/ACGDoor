import Vue from "vue";
import config from "@/config/";
import axios from "axios";
import "@/utils/directives/urlTrans";

const init = () => {
  Vue.config.productionTip = false;
  Vue.prototype.$axios = axios;
  Vue.prototype.$config = config;
};

export default { init };
