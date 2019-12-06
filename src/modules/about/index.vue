<template>
  <div id="base">
    <LoginModel title="about"></LoginModel>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  components: {
    LoginModel: () => import("@/components/Login")
  }
};
</script>

<style scoped>
</style>