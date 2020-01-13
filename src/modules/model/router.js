import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "model",
    component: () => import("./views/")
  }
];

export default new VueRouter({
  routes: routes
});
