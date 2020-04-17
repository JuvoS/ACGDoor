<template>
  <ContainerModel class="demo-container">
    <template slot="left">左边</template>
    <template slot="right">右边</template>
    <b-carousel id="carousel1" v-model="slide" controls indicators>
      <b-carousel-slide
        img-src="/img/theme/img-1-1200x1000.jpg"
      ></b-carousel-slide>
      <b-carousel-slide
        img-src="/img/theme/img-2-1200x1000.jpg"
      ></b-carousel-slide>
    </b-carousel>
    <TestModel></TestModel>
    <TestModel></TestModel>
    <TestModel></TestModel>
    <TestModel></TestModel>
  </ContainerModel>
</template>
<script>
export default {
  components: {
    ContainerModel: () => import("./comps/container"),
    TestModel: () => import("./comps/test"),
  },
};
</script>
<style lang="less" scoped>
.demo-container {
  // height: calc(100vh - 88px);
  margin-top: 88px;
}
</style>
