<template>
  <div style="width:100%;min-height:300px;">
    <SnowBoard style="width:100%;min-height:300px;"></SnowBoard>
    <!-- <VNavTab></VNavTab> -->
    <!-- <header>
      <h1 class="title slide-bar">I'm alphardex.</h1>
      <p class="subtitle slide-bar">A CSS Wizard</p>
    </header> -->

    <div class="loading">
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
    </div>
  </div>
</template>

<script>
import ContentLoader from "@/components/ContentLoader";
import VNavTab from "@/components/BaseMenu/VNavTab";
import SnowBoard from "@/components/SnowBoard";
export default {
  props: {
    title: {
      type: String,
      default: "this"
    }
  },
  components: {
    ContentLoader,
    VNavTab,
    SnowBoard
  }
};
</script>

<style lang="less" scoped>
.hovcard {
  height: 300px;
  display: grid;
  place-items: center;
}
</style>
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Lato");
@import url("https://fonts.googleapis.com/css?family=Lora:400,400i,700");

.slide-bar {
  position: relative;
  color: transparent;
  animation: fill-text-white 2s 1.6s forwards infinite;

  &::before {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #35b9f1;
    transform: scaleX(0);
    transform-origin: left;
    animation: slide-in-out 2s 3s cubic-bezier(0.75, 0, 0, 1) forwards infinite;
  }
}

@keyframes slide-in-out {
  50% {
    transform: scaleX(1);
    transform-origin: left;
  }

  50.1% {
    transform-origin: right;
  }

  100% {
    transform: scaleX(0);
    transform-origin: right;
  }
}

@keyframes fill-text-white {
  to {
    color: white;
  }
}

header {
  .title,
  .subtitle {
    width: 250px;
    height: 30px;
  }

  .title {
    margin: 0;
    font-family: Lora, serif;
    font-size: 32px;
    line-height: 30px;

    &::before {
      background: #ff4081;
    }
  }

  .subtitle {
    margin: 10px 0 0 0;
    font-family: Lato, sans-serif;
    font-size: 12px;
    line-height: 30px;
    letter-spacing: 5px;
    text-transform: uppercase;
    animation-delay: 3.2s;

    &::before {
      background: #03a9f4;
      animation-delay: 2s;
    }
  }
}
</style>
<style lang="scss" scoped>
.loading {
  $colors: #7ef9ff, #89cff0, #4682b4, #0f52ba, #000080;
  display: flex;
  animation-delay: 1s;

  .dot {
    position: relative;
    width: 2em;
    height: 2em;
    margin: 0.8em;
    border-radius: 50%;

    &::before {
      position: absolute;
      content: "";
      width: 100%;
      height: 100%;
      background: inherit;
      border-radius: inherit;
      animation: wave 2s ease-out infinite;
    }

    @for $i from 1 through 5 {
      &:nth-child(#{$i}) {
        background: nth($colors, $i);

        &::before {
          animation-delay: $i * 0.2s;
        }
      }
    }
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
