<template>
  <ContainerModel class="demo-container">
    <template slot="left">左边</template>
    <template slot="right">右边</template>
    <div class="row flex-xl-nowrap mt-5">
      <div class="col-md-3 col-xl-2 bd-sidebar">siderbar</div>

      <div class="col-xl-2 bd-toc">toc</div>
    </div>
  </ContainerModel>
</template>
<script>
export default {
  components: {
    ContainerModel: () => import("./comps/container"),
    TestModel: () => import("./comps/test")
  }
};
</script>
<style lang="less" scoped>
.demo-container {
  // height: calc(100vh - 88px);
  margin-top: 88px;
}
</style>