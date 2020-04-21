<template>
  <div>
    <h3 class="h4 text-primary font-weight-bold mt-md mb-4">{{title}}</h3>
    <div :class="{'card':card, 'shadow':card, 'mb-4':true}">
      <div :class="{'card-body':card}">
        <div class="row">
          <div class="col-sm-3 col-6 mt-5 mt-sm-0 mb-4" v-for="(item,key) in info" :key="key">
            <small class="d-block text-uppercase font-weight-bold mb-4">{{item.label}}</small>
            <img
              alt="Raised circle image"
              class="img-fluid rounded-circle shadow-lg"
              :data-src="item.url"
              :src="item.url"
              lazy="loaded"
              style="width: 150px;"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: "IMAGE"
    },
    info: {
      type: Array,
      default: () => [
        {
          label: "Circle Raised",
          url: "img/theme/team-4-800x800.jpg"
        },
        {
          label: "Circle Raised",
          url: "img/theme/team-4-800x800.jpg"
        }
      ]
    },
    card: {
      type: Boolean,
      default: false
    }
  }
};
</script>