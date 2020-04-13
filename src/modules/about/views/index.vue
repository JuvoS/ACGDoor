<template>
  <div class="profile-page">
    <section class="section-profile-cover section-shaped my-0">
      <div class="shape shape-style-2 shape-default shape-skew alpha-4">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </section>
    <section class="section section-skew">
      <div class="container">
        <card shadow class="card-profile mt--300" no-body>
          <div class="px-4">
            <div class="row justify-content-center">
              <div class="col-lg-3 order-lg-2">
                <div class="card-profile-image">
                  <a href="#">
                    <img
                      v-lazy="'img/theme/team-4-800x800.jpg'"
                      class="rounded-circle"
                    />
                  </a>
                </div>
              </div>
              <div
                class="col-lg-4 order-lg-3 text-lg-right align-self-lg-center"
              >
                <div class="card-profile-actions py-4 mt-lg-0">
                  <base-button type="info" size="sm" class="mr-4"
                    ><i class="fa fa-github mr-2"></i>Github</base-button
                  >
                  <base-button type="default" size="sm" class="float-right"
                    ><i class="fa fa-cloud-download mr-2"></i
                    >Download</base-button
                  >
                </div>
              </div>
              <div class="col-lg-4 order-lg-1">
                <div class="card-profile-stats d-flex justify-content-center">
                  <div>
                    <span class="heading">Email</span>
                    <span class="description">704921698@qq.com</span>
                  </div>
                  <div>
                    <span class="heading">Telphone</span>
                    <span class="description">18108197129</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="text-center mt-5">
              <h3>
                JuvoS Shen
                <span class="font-weight-light">, 25</span>
              </h3>
              <div class="h6 font-weight-300">
                <i class="ni location_pin mr-2"></i>DaZhou, SiChuan, China
              </div>
              <div class="h6 mt-4">
                <i class="ni business_briefcase-24 mr-2"></i>Weber - Designer -
                Painter
              </div>
              <div>
                <i class="ni education_hat mr-2"></i>University of Computer
                Science
              </div>
            </div>
            <div class="mt-5 py-5 border-top text-center">
              <div class="row justify-content-center">
                <div class="col-lg-9">
                  <p>
                    An artist of considerable range, Ryan — the name taken by
                    Melbourne-raised, Brooklyn-based Nick Murphy — writes,
                    performs and records all of his own music, giving it a warm,
                    intimate feel with a solid groove structure. An artist of
                    considerable range.
                  </p>
                  <a href="/" v-urltrans
                    >Show more <i class="ni ni-air-baloon"></i
                  ></a>
                </div>
              </div>
            </div>

            <CreativeModel></CreativeModel>
            <!-- <div class="mt-2 py-5 border-top text-center">
              <div class="row">
                <div class="col">11</div>
                <div class="col">11</div>
                <div class="col">11</div>
              </div>
            </div> -->
            <FeaturesModel></FeaturesModel>
            <SystemNodel></SystemNodel>
            <BuildingNodel></BuildingNodel>
            <CardModel></CardModel>
            <SoftwareModel></SoftwareModel>
            <FooterModel></FooterModel>
          </div>
        </card>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  components: {
    CreativeModel: () => import("./comps/creative"),
    FeaturesModel: () => import("./comps/features"),
    SystemNodel: () => import("./comps/system"),
    BuildingNodel: () => import("./comps/building"),
    CardModel: () => import("./comps/card"),
    SoftwareModel: () => import("./comps/software"),
    FooterModel: () => import("./comps/footer")
  }
};
</script>
<style></style>
