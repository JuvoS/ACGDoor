import Vue from "vue";
import VueRouter from "vue-router";
import AppHeader from "@/layout/AppHeader";
import AppFooter from "@/layout/AppFooter";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    components: {
      header: AppHeader,
      default: () => import("./views/"),
      footer: AppFooter,
    },
  },
];

export default new VueRouter({
  routes: routes,
});
