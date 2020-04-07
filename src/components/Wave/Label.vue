<template>
  <div class="wavelabel" :style="{'animation-delay':delay+'s'}">{{title}}</div>
</template>
<script>
export default {
  props: {
    delay: {
      type: [String, Number],
      default: 1
    },
    title: {
      type: String,
      default: "A"
    }
  }
};
</script>
<style lang="scss" scoped>
.wavelabel {
  position: relative;
  width: 2em;
  height: 2em;
  line-height: 2em;
  text-align: center;
  margin: 0.8em;
  border-radius: 50%;
  background: #89cff0;
  //   animation-delay: 1s;

  &::before {
    position: absolute;
    left: 0;
    content: "";
    width: 100%;
    height: 100%;
    background: inherit;
    border-radius: inherit;
    animation: wave 2s ease-out infinite;
  }
}

@keyframes wave {
  50%,
  75% {
    transform: scale(2.5);
  }

  80%,
  100% {
    opacity: 0;
  }
}
</style>
