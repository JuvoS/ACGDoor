<template>
  <footer>
    <div class="inner">
      <a class="source" href="https://github.com/JuvoS/ACGDoor">源码地址</a>
      <div class="desc">
        ACGDoor 致力于 ACG 技术学习与研究。
      </div>
      <div class="sponsor">目前还没有赞助商。</div>
      <!-- <div class="sponsor">目前还没有赞助商，服务器建在阿里云。</div> -->
    </div>
  </footer>
</template>
<script>
export default {};
</script>
<style lang="less" scoped>
footer {
  position: absolute;
  bottom: 0;
  background: #181818;
  width: 100%;
}
footer .inner {
  max-width: 1400px;
  width: 90%;
  margin: auto;
  padding: 15px 0;
}
footer .inner .source {
  font-size: 14px;
  text-decoration: none;
  color: #eee;
}
footer .inner .desc {
  font-size: 13px;
  color: #bbb;
}
footer .inner .sponsor {
  font-size: 13px;
  color: #bbb;
}
</style>
