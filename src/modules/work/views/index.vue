<template>
  <section class="section section-components">
    <div class="container">
      <h3 class="h4 text-success font-weight-bold mt-md mb-4">Datepicker</h3>
      <div class="row">
        <div class="col-sm-3 col-6">
          <small class="d-block text-uppercase font-weight-bold mb-4"
            >Image</small
          ><img
            alt="Rounded image"
            class="img-fluid rounded shadow"
            data-src="img/theme/team-1-800x800.jpg"
            src="img/theme/team-1-800x800.jpg"
            lazy="loaded"
            style="width: 150px;"
          />
        </div>
        <div class="col-sm-3 col-6">
          <small class="d-block text-uppercase font-weight-bold mb-4"
            >Circle Image</small
          ><img
            alt="Circle image"
            class="img-fluid rounded-circle shadow"
            data-src="img/theme/team-2-800x800.jpg"
            src="img/theme/team-2-800x800.jpg"
            lazy="loaded"
            style="width: 150px;"
          />
        </div>
        <div class="col-sm-3 col-6 mt-5 mt-sm-0">
          <small class="d-block text-uppercase font-weight-bold mb-4"
            >Raised</small
          ><img
            alt="Raised image"
            class="img-fluid rounded shadow-lg"
            data-src="img/theme/team-3-800x800.jpg"
            src="img/theme/team-3-800x800.jpg"
            lazy="loaded"
            style="width: 150px;"
          />
        </div>
        <div class="col-sm-3 col-6 mt-5 mt-sm-0">
          <small class="d-block text-uppercase font-weight-bold mb-4"
            >Circle Raised</small
          ><img
            alt="Raised circle image"
            class="img-fluid rounded-circle shadow-lg"
            data-src="img/theme/team-4-800x800.jpg"
            src="img/theme/team-4-800x800.jpg"
            lazy="loaded"
            style="width: 150px;"
          />
        </div>
      </div>
      <h3 class="h4 text-success font-weight-bold mt-md mb-4">Datepicker</h3>
      <div class="card shadow mb-4">
        <div class="card-body">
          <div class="tab-pane fade" style="display: none;">
            <p class="description">
              Raw denim you probably haven't heard of them jean shorts Austin.
              Nesciunt tofu stumptown aliqua, retro synth master cleanse.
              Mustache cliche tempor, williamsburg carles vegan helvetica.
              Reprehenderit butcher retro keffiyeh dreamcatcher synth.
            </p>
            <p class="description">
              Raw denim you probably haven't heard of them jean shorts Austin.
              Nesciunt tofu stumptown aliqua, retro synth master cleanse.
            </p>
          </div>
          <div class="tab-pane fade active show" style="" aria-expanded="true">
            <p class="description">
              Cosby sweater eu banh mi, qui irure terry richardson ex squid.
              Aliquip placeat salvia cillum iphone. Seitan aliquip quis cardigan
              american apparel, butcher voluptate nisi qui.
            </p>
          </div>
          <div class="tab-pane fade" style="display: none;">
            <p class="description">
              Raw denim you probably haven't heard of them jean shorts Austin.
              Nesciunt tofu stumptown aliqua, retro synth master cleanse.
              Mustache cliche tempor, williamsburg carles vegan helvetica.
              Reprehenderit butcher retro keffiyeh dreamcatcher synth.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  components: {
    StartModel: () => import("./comps/start"),
    ScreenshotModel: () => import("./comps/screenshot"),
  },
};
</script>

<style lang="less" scoped>
.work-card {
  box-shadow: 0 10px 20px -8px rgba(0, 0, 0, 0.15);
}
</style>
