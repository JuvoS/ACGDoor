import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./menu";

Vue.use(VueRouter);

export default new VueRouter({
  mode: "hash",
  routes: routes,
});
