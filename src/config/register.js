import Vue from "vue";
import config from "@/config/";
import axios from "axios";
import "@/utils/directives/urlTrans";
import lottie from "vue-lottie";
Vue.component("lottie", lottie);
window._ = require("lodash");

import Argon from "../plugins/argon-kit";
Vue.use(Argon);

const init = () => {
  Vue.config.productionTip = false;
  Vue.prototype.$axios = axios;
  Vue.prototype.$config = config;
};

export default { init };
