import Vue from "vue";

Vue.directive("urltrans", {
  bind: function(el) {
    let routerLabel = el.href.split("/");
    if (!routerLabel[3]) el.href += "index";

    return (el.href = el.href + ".html");
  }
});
