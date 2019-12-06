import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    component: r => {
      require(["../../components/Login"], r);
    },
    meta: { title: "share 登录" }
  }
];

export default new VueRouter({
  routes: routes
});
