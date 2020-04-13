<template>
  <section>
    <StartModel></StartModel>
    <ScreenshotModel></ScreenshotModel>
  </section>
</template>

<script>
export default {
  components: {
    StartModel: () => import("./comps/start"),
    ScreenshotModel: () => import("./comps/screenshot")
  }
};
</script>

<style lang="less" scoped></style>
