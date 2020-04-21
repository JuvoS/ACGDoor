<template>
  <div>
    <h3 class="h4 text-primary font-weight-bold mt-md mb-4">{{title}}</h3>
    <div :class="{'card':card, 'shadow':card, 'mb-4':true}">
      <div :class="{'card-body':card}">
        <p class="description" v-for="(item,key) in info" :key="key">{{item}}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: "Description"
    },
    info: {
      type: Array,
      default: () => [
        `Raw denim you probably haven't heard of them jean shorts Austin.
          Nesciunt tofu stumptown aliqua, retro synth master cleanse.
          Mustache cliche tempor, williamsburg carles vegan helvetica.
          Reprehenderit butcher retro keffiyeh dreamcatcher synth.`,
        `Raw denim you probably haven't heard of them jean shorts Austin.
          Nesciunt tofu stumptown aliqua, retro synth master cleanse.`,
        `Cosby sweater eu banh mi, qui irure terry richardson ex squid.
          Aliquip placeat salvia cillum iphone. Seitan aliquip quis cardigan
          american apparel, butcher voluptate nisi qui.`,
        `Raw denim you probably haven't heard of them jean shorts Austin.
          Nesciunt tofu stumptown aliqua, retro synth master cleanse.
          Mustache cliche tempor, williamsburg carles vegan helvetica.
          Reprehenderit butcher retro keffiyeh dreamcatcher synth.`
      ]
    },
    card: {
      type: Boolean,
      default: false
    }
  }
};
</script>