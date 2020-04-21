<template>
  <div>
    <h3 class="h4 text-primary font-weight-bold mt-md mb-4">{{title}}</h3>
    <div :class="{'card':card, 'shadow':card, 'mb-4':true}" v-if="card">
      <div :class="{'card-body':card}">
        <p class="description" v-for="(item,key) in info" :key="key">{{item}}</p>
      </div>
    </div>
    <p v-else class="lead text-muted" v-for="(item,key) in info" :key="key">{{item}}</p>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: "INFO"
    },
    info: {
      type: Array,
      default: () => [
        // "Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Duis mollis, est non commodo luctus.",
        "Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Duis mollis, est non commodo luctus."
      ]
    },
    card: {
      type: Boolean,
      default: false
    }
  }
};
</script>