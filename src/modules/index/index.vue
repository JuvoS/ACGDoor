<template>
  <BaseBoard>
    <router-view></router-view>
  </BaseBoard>
</template>

<script>
export default {
  components: {
    BaseBoard: () => import("@/components/BaseBoard")
  }
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
