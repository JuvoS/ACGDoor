<template>
  <div style="width: 100vw;height: 100vh;">
    <!-- <BoardPane> -->
    <router-view></router-view>
    <!-- </BoardPane> -->
  </div>
</template>

<script>
export default {
  components: {
    BoardPane: () => import("@/components/BaseBoard/BoardPane"),
  },
  mounted() {
    //全局字体设定
    // let offsetWidth = parseInt(document.documentElement.clientWidth) / 60;
    // document.documentElement.style.fontSize = offsetWidth + "px";
    document.documentElement.style.fontSize = 12 + "px";
  },
};
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
}
body {
  position: relative;
  background: #f0f2f5;
  min-height: 100vh;
  width: 100%;
  color: #333;
  /* height: auto !important; */
}
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  outline: none;
}
</style>
