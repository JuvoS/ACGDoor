<template>
  <div>this is {{ title }} login</div>
</template>

<script>
export default {
  name: "login",
  props: {
    title: {
      type: String,
      default: "this"
    }
  }
};
</script>

<style scoped></style>
