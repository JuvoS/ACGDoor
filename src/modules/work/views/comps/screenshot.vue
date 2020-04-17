<template>
  <div class=" container container-lg mt--100 mb-5">
    <div class="row">
      <div class="col-md-6 mb-5" v-for="(item, key) in shotArr" :key="key">
        <div class="card card-lift--hover shadow border-0">
          <router-link to="item.link" title="Landing Page">
            <img v-lazy="item.img" class="card-img" />
          </router-link>
        </div>
      </div>
      <div class="col-md-6 mb-5 mb-lg-0">
        <div class="card card-lift--hover shadow border-0">
          <router-link to="/profile" title="Profile Page">
            <img v-lazy="'img/theme/profile.jpg'" class="card-img" />
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    shotArr: {
      type: Array,
      default: () => [
        {
          link: "/",
          img: "img/theme/landing.jpg"
        },
        {
          link: "/about",
          img: "img/theme/profile.jpg"
        }
      ]
    }
  }
};
</script>
