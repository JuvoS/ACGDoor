<template>
  <div class="tip" :style="{'align-items':center?'center':''}">
    <div class="tip-title">{{title}}</div>
    <div class="tip-cur" :style="{background:bgColor}"></div>
    <div class="tip-pane">
      <slot name="pane"></slot>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: "标题"
    },
    bgColor: {
      type: String,
      default: "#f7691c"
    },
    center: {
      type: Boolean,
      default: false
    }
  }
};
</script>
<style lang="less" scoped>
.tip {
  width: 100%;
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  &-title {
    margin-bottom: 10px;
    font-size: 1.5rem;
    color: #b3b4c5;
  }
  &-cur {
    width: 40px;
    height: 2px;
    margin-bottom: 15px;
  }
  &-pane {
    width: 100%;
    font-size: 1rem;
    color: #333;
  }
}
</style>