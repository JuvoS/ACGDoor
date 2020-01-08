<template>
  <div class="card">
    <div class="card-img">
      <img :src="imgUrl" />
    </div>
    <div class="card-content">
      <div class="card-content-title">{{ title }}</div>
      <div class="card-content-url">
        <a :href="downUrl">下载</a><span>{{ downPass }}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    imgUrl: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    },
    downUrl: {
      type: String,
      default: ""
    },
    downPass: {
      type: String,
      default: ""
    }
  }
};
</script>

<style lang="less" scoped>
.card {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px;
  &-img {
    width: 100%;
    height: 200px;
    border-radius: 5px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
  &-content {
    flex: 1;
    padding: 0 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    &-title {
      font-size: 16px;
      margin: 10px 0;
    }
    &-url {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      font-size: 12px;
      a {
        color: #0cbabd;
        text-decoration: none;
      }
    }
  }
}
</style>
