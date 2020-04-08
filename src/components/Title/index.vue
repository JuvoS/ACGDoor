<template>
  <div class="title">
    <div class="title-wrap">
      <a @click="$emit('on-click')">{{ title }}</a>
    </div>
    <div class="title-secondary">
      <span>{{ info }}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: "claudiu hanga",
    },
    info: {
      type: String,
      default: "CGI artist",
    },
  },
};
</script>
<style lang="less" scoped>
.title {
  &-wrap {
    font-family: vcsm;
    font-size: 30px;
    font-style: normal;
    font-weight: 100;
    line-height: 22px;
    padding-bottom: 5px;
    padding-left: 3%;
    padding-right: 0%;
    padding-top: 70px;
    text-transform: uppercase;
    a {
      color: #111;
      text-decoration: none;
    }
  }
  &-secondary {
    font-family: vcsm;
    font-size: 22px;
    font-style: normal;
    font-weight: 100;
    line-height: 22px;
    padding-bottom: 0px;
    padding-left: 3%;
    padding-right: 0%;
    padding-top: 0px;
    text-transform: uppercase;
    span {
      color: #ccc;
    }
  }
}
</style>
