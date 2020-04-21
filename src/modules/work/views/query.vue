<template>
  <section class="section section-components">
    <div class="container">
      <h3 class="h4 text-success font-weight-bold mt-md mb-4">Datepicker</h3>
      <div class="row">
        <div class="col-sm-3 col-6">
          <small class="d-block text-uppercase font-weight-bold mb-4">Image</small>
          <img
            alt="Rounded image"
            class="img-fluid rounded shadow"
            data-src="img/theme/team-1-800x800.jpg"
            src="img/theme/team-1-800x800.jpg"
            lazy="loaded"
            style="width: 150px;"
          />
        </div>
        <div class="col-sm-3 col-6">
          <small class="d-block text-uppercase font-weight-bold mb-4">Circle Image</small>
          <img
            alt="Circle image"
            class="img-fluid rounded-circle shadow"
            data-src="img/theme/team-2-800x800.jpg"
            src="img/theme/team-2-800x800.jpg"
            lazy="loaded"
            style="width: 150px;"
          />
        </div>
        <div class="col-sm-3 col-6 mt-5 mt-sm-0">
          <small class="d-block text-uppercase font-weight-bold mb-4">Raised</small>
          <img
            alt="Raised image"
            class="img-fluid rounded shadow-lg"
            data-src="img/theme/team-3-800x800.jpg"
            src="img/theme/team-3-800x800.jpg"
            lazy="loaded"
            style="width: 150px;"
          />
        </div>
        <div class="col-sm-3 col-6 mt-5 mt-sm-0">
          <small class="d-block text-uppercase font-weight-bold mb-4">Circle Raised</small>
          <img
            alt="Raised circle image"
            class="img-fluid rounded-circle shadow-lg"
            data-src="img/theme/team-4-800x800.jpg"
            src="img/theme/team-4-800x800.jpg"
            lazy="loaded"
            style="width: 150px;"
          />
        </div>
      </div>

      <CardInfo></CardInfo>
      <CardInfo card></CardInfo>
      <CardDescription></CardDescription>
      <CardDescription card></CardDescription>
      <CardImage></CardImage>
      <CardImage card></CardImage>
      <ImageSlider></ImageSlider>
      <SliderBlur></SliderBlur>
    </div>
  </section>
</template>

<script>
export default {
  components: {
    StartModel: () => import("./comps/start"),
    ScreenshotModel: () => import("./comps/screenshot"),
    BasicCard: () => import("./comps/BasicCard"),
    CardInfo: () => import("./comps/CardInfo"),
    CardDescription: () => import("./comps/CardDescription"),
    CardImage: () => import("./comps/CardImage"),
    ImageSlider: () => import("./comps/ImageSlider"),
    SliderBlur: () => import("./comps/SliderBlur")
  },
  computed: {
    queryId() {
      return this.$route.query.userId;
    }
  },
  watch: {
    queryId(v) {
      console.log("this.$route.query ->", v);
    }
  },

  mounted() {
    console.log("this.$route.query ->", this.$route, this.$route.query);
  },
  methods: {
    routerTo() {
      this.$router.push({
        path: "/query",
        query: { userId: _.random(1000, 9999) }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.work-card {
  box-shadow: 0 10px 20px -8px rgba(0, 0, 0, 0.15);
}
</style>
