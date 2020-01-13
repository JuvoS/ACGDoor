<template>
  <div class="acg">
    <BoardHeader></BoardHeader>
    <section class="acg-wrapper">
      <slot></slot>
    </section>
    <BoardFooter></BoardFooter>
  </div>
</template>
<script>
export default {
  components: {
    BoardHeader: () => import("./BoardHeader"),
    BoardFooter: () => import("./BoardFooter")
  },
  created() {
    (function() {
      "use strict";
      var devtools = {
        open: false,
        orientation: null
      };
      var threshold = 160;
      var emitEvent = function(state, orientation) {
        window.dispatchEvent(
          new CustomEvent("devtoolschange", {
            detail: {
              open: state,
              orientation: orientation
            }
          })
        );
      };
      setInterval(function() {
        var widthThreshold = window.outerWidth - window.innerWidth > threshold;
        var heightThreshold =
          window.outerHeight - window.innerHeight > threshold;
        var orientation = widthThreshold ? "vertical" : "horizontal";

        if (
          !(heightThreshold && widthThreshold) &&
          ((window.Firebug &&
            window.Firebug.chrome &&
            window.Firebug.chrome.isInitialized) ||
            widthThreshold ||
            heightThreshold)
        ) {
          if (!devtools.open || devtools.orientation !== orientation) {
            emitEvent(true, orientation);
          }
          devtools.open = true;
          devtools.orientation = orientation;
        } else {
          if (devtools.open) {
            emitEvent(false, null);
          }
          devtools.open = false;
          devtools.orientation = null;
        }
      }, 500);
      if (typeof module !== "undefined" && module.exports) {
        module.exports = devtools;
      } else {
        window.devtools = devtools;
      }
    })();
    var isShow = false;
    window.addEventListener("devtoolschange", function(e) {
      if (e.detail.open && !isShow) {
        console.log("*******************");
        isShow = true;
      }
    });
  },
  methods: {}
};
</script>
<style lang="less" scoped>
.acg {
  width: 100%;
  min-height: 100%;
  padding-bottom: 88px;
  &-wrapper {
    min-height: 60vh;
    margin: auto;
    flex: 1 1;
    display: flex;
    padding: 10px 0;
    max-width: 1400px;
    flex-direction: row;
    width: 90%;
  }
}
</style>
