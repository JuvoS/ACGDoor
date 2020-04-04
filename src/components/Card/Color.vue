<template>
  <div class="color">
    <div class="color-title">
      <div class="color-title-item">1</div>
    </div>
    <div class="color-pane">
      <div class="color-pane-item" v-for="(item, key) in colorArr" :key="key">
        <div class="color-pane-item-title">
          {{ item.color }}
        </div>
        <div
          class="color-pane-item-org"
          :style="{ background: item.color }"
        ></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      colorArr: [
        { color: "#D2C5BA" },
        { color: "#FFFFFF" },
        { color: "#F6EEE6" },
        { color: "#C5B2B2" }
      ]
    };
  }
};
</script>
<style lang="less" scoped>
.color {
  padding: 10px;
  position: relative;
  &-title {
    top: -20px;
    position: absolute;
    width: 100%;
    display: flex;
    justify-content: center;
    &-item {
      background: #ffffff;
      border-radius: 50%;
      // padding: 20px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
      width: 48px;
      height: 48px;
      line-height: 48px;
      text-align: center;
      font-size: 20px;
    }
  }
  &-pane {
    background: #ffffff;
    box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
    border-radius: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    &-item {
      width: 100%;
      &-title {
        margin: 50px auto;
        margin-bottom: 30px;
        text-align: center;
      }
      &-org {
        min-height: 200px;
      }
    }
    &-item:first-child {
      .color-pane-item-org {
        border-bottom-left-radius: 10px;
      }
    }
    &-item:last-child {
      .color-pane-item-org {
        border-bottom-right-radius: 10px;
      }
    }
  }
}
</style>
