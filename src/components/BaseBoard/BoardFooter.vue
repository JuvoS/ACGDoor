<template>
  <footer>
    <div class="inner">
      <div class="inner-content">
        <a class="source" href="https://github.com/JuvoS/ACGDoor">源码地址</a>
      </div>
      <div class="inner-power">
        <span class="desc">powered by {{powerInfo}} {{versionInfo}}</span>
      </div>
      <!-- <div class="sponsor">目前还没有赞助商，服务器建在阿里云。</div> -->
    </div>
  </footer>
</template>
<script>
export default {
  computed: {
    powerInfo() {
      return this.$config.powered;
    },
    versionInfo() {
      return this.$config.version;
    }
  }
};
</script>
<style lang="less" scoped>
footer {
  position: absolute;
  bottom: 0;
  background: #ffffff;
  // background: #181818;
  width: 100%;
}
footer .inner {
  max-width: 1400px;
  width: 90%;
  margin: auto;
  padding: 15px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  &-content {
    flex: 1;
  }
}
footer .inner .source {
  font-size: 14px;
  text-decoration: none;
  color: #aaaaaa;
}
footer .inner .desc {
  font-size: 13px;
  color: #777;
}
footer .inner .sponsor {
  font-size: 13px;
  color: #999;
}
</style>
