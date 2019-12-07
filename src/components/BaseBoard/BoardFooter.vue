<template>
  <footer>
    <div class="inner">
      <a class="source" href="https://github.com/deno-china/website"
        >源码地址</a
      >
      <div class="desc">
        DENOCN 社区为国内最专业的 Deno 开源技术社区，致力于 Deno
        技术学习与研究。
      </div>
      <div class="sponsor">目前还没有赞助商，服务器建在香港阿里云。</div>
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
