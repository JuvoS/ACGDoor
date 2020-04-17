<template>
  <div class="container-fluid">
    <div class="row flex-xl-nowrap">
      <div class="col-md-3 col-xl-2 bd-sidebar">
        <!-- <slot name="left"></slot> -->
        <ul>
          <li v-for="(item,key) in menuList" :key="key">
            <a class="dropdown-item" :href="mainPath+item.path">{{item.label}}</a>
          </li>
        </ul>
      </div>

      <nav class="d-none d-xl-block col-xl-2 bd-toc" aria-label="Secondary navigation">
        <slot name="right"></slot>
        <ul class="sidebar-links">
          <li>
            <div class="sidebar-group first">
              <p class="sidebar-heading">
                <span>Getting Started</span>
                <!---->
              </p>
              <ul class="sidebar-group-items">
                <li>
                  <a
                    href="/vue-argon-design-system/documentation/"
                    class="sidebar-link"
                  >Argon - Design System</a>
                </li>
                <li>
                  <a
                    href="/vue-argon-design-system/documentation/quick-start.html"
                    class="sidebar-link"
                  >Quick Start</a>
                </li>
                <li>
                  <a
                    href="/vue-argon-design-system/documentation/licence.html"
                    class="sidebar-link"
                  >License</a>
                </li>
                <li>
                  <a
                    href="/vue-argon-design-system/documentation/contents.html"
                    class="sidebar-link"
                  >Contents</a>
                </li>
                <li>
                  <a
                    href="/vue-argon-design-system/documentation/build-tools.html"
                    class="sidebar-link"
                  >Build Tools</a>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <div class="sidebar-group">
              <p class="sidebar-heading">
                <span>Foundation</span>
                <!---->
              </p>
              <ul class="sidebar-group-items">
                <li>
                  <a
                    href="/vue-argon-design-system/documentation/foundation/colors.html"
                    class="sidebar-link"
                  >Colors</a>
                </li>
                <li>
                  <a
                    href="/vue-argon-design-system/documentation/foundation/grid.html"
                    class="sidebar-link"
                  >Grid System</a>
                </li>
                <li>
                  <a
                    href="/vue-argon-design-system/documentation/foundation/typography.html"
                    class="sidebar-link"
                  >Typography</a>
                </li>
                <li>
                  <a
                    href="/vue-argon-design-system/documentation/foundation/icons.html"
                    class="sidebar-link"
                  >Icons</a>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <div class="sidebar-group">
              <p class="sidebar-heading open">
                <span>Components</span>
                <!---->
              </p>
              <ul class="sidebar-group-items">
                <li>
                  <a
                    href="/vue-argon-design-system/documentation/components/alerts.html"
                    class="sidebar-link"
                  >Alerts</a>
                </li>
                <li>
                  <a
                    href="/vue-argon-design-system/documentation/components/badges.html"
                    class="sidebar-link"
                  >Badge</a>
                </li>
                <li>
                  <a
                    href="/vue-argon-design-system/documentation/components/buttons.html"
                    class="sidebar-link"
                  >Buttons</a>
                </li>
                <li>
                  <a
                    href="/vue-argon-design-system/documentation/components/carousel.html"
                    class="sidebar-link"
                  >Carousel</a>
                </li>
                <li>
                  <a
                    href="/vue-argon-design-system/documentation/components/dropdowns.html"
                    class="sidebar-link"
                  >Dropdowns</a>
                </li>
                <li>
                  <a
                    href="/vue-argon-design-system/documentation/components/forms.html"
                    class="sidebar-link"
                  >Forms</a>
                </li>
                <li>
                  <a
                    href="/vue-argon-design-system/documentation/components/modal.html"
                    class="sidebar-link"
                  >Modal</a>
                </li>
                <li>
                  <a
                    href="/vue-argon-design-system/documentation/components/tabs.html"
                    class="active sidebar-link"
                  >Tabs</a>
                </li>
                <li>
                  <a
                    href="/vue-argon-design-system/documentation/components/navbar.html"
                    class="sidebar-link"
                  >Navbar</a>
                </li>
                <li>
                  <a
                    href="/vue-argon-design-system/documentation/components/pagination.html"
                    class="sidebar-link"
                  >Pagination</a>
                </li>
                <li>
                  <a
                    href="/vue-argon-design-system/documentation/components/popovers.html"
                    class="sidebar-link"
                  >Popovers</a>
                </li>
                <li>
                  <a
                    href="/vue-argon-design-system/documentation/components/progress.html"
                    class="sidebar-link"
                  >Progress</a>
                </li>
                <li>
                  <a
                    href="/vue-argon-design-system/documentation/components/tooltips.html"
                    class="sidebar-link"
                  >Tooltips</a>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <div class="sidebar-group">
              <p class="sidebar-heading">
                <span>Plugins</span>
                <!---->
              </p>
              <ul class="sidebar-group-items">
                <li>
                  <a
                    href="/vue-argon-design-system/documentation/components/plugin_datepicker.html"
                    class="sidebar-link"
                  >Datepicker</a>
                </li>
                <li>
                  <a
                    href="/vue-argon-design-system/documentation/components/plugin_slider.html"
                    class="sidebar-link"
                  >Slider</a>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </nav>

      <main class="col-md-9 col-xl-8 py-md-3 pl-md-5 bd-content" role="main">
        <slot></slot>
      </main>
    </div>
  </div>
</template>
<script>
import routes from "../../menu";
export default {
  data() {
    return {
      mainPath: "/demos.html",
      menuList: []
    };
  },
  mounted() {
    this.menuList = routes;
    console.log("routes ->", routes);
  }
};
</script>
<style lang="less" scoped>
@media (min-width: 1200px) {
  .bd-sidebar {
    -ms-flex: 0 1 320px;
    flex: 0 1 320px;
    border-bottom: none;
  }
}
@media (min-width: 768px) {
  .bd-sidebar {
    z-index: 1000;
    height: calc(100vh - 88px);
  }
}
@media (min-width: 768px) {
  .bd-sidebar {
    border-right: 1px solid rgba(0, 0, 0, 0.1);
  }
  .bd-sidebar {
    order: 0;
  }
}
.bd-sidebar {
  ul {
    padding: 0;
    list-style: none;
  }
}
.bd-toc {
  position: sticky;
  top: 4rem;
  height: 100%;
  overflow-y: auto;
  ul {
    padding: 0;
    list-style: none;
  }
}
.bd-toc {
  -ms-flex-order: 2;
  order: 2;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  font-size: 0.875rem;
}
@media (min-width: 1200px) {
  .d-xl-block {
    display: block !important;
  }
}

.bd-content {
  -ms-flex-order: 1;
  order: 1;
  position: sticky;
  top: 4rem;
}
@media (min-width: 768px) {
  .pl-md-5,
  .px-md-5 {
    padding-left: 3rem !important;
  }
}
@media (min-width: 768px) {
  .pb-md-3,
  .py-md-3 {
    padding-bottom: 1rem !important;
  }
}
@media (min-width: 768px) {
  .pt-md-3,
  .py-md-3 {
    padding-top: 1rem !important;
  }
}
</style>