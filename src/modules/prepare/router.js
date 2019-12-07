import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "prepare"
  }
];

export default new VueRouter({
  routes: routes
});
