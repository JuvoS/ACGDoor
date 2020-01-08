import Vue from "vue";
import config from "@/config/";
import axios from "axios";
import "@/utils/directives/urlTrans";
import Bmob from "hydrogen-js-sdk";

Bmob.initialize("4509c12b05a95f1c", "taisha");
Vue.prototype.Bmob = Bmob;
Bmob.debug(true);

const init = () => {
  Vue.config.productionTip = false;
  Vue.prototype.$axios = axios;
  Vue.prototype.$config = config;
};

export default { init };
