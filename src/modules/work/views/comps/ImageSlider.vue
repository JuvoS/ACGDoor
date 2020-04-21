<template>
  <div id="dataCenter">
    <div class="window" @mouseover="stop" @mouseleave="play">
      <ul class="swrapper" :style="swrapperStyle">
        <li>
          <!-- 把最后一张图放在最开始 -->
          <img :style="{width:imgWidth+'px'}" :src="sliders[sliders.length - 1].img" alt />
        </li>
        <li v-for="(item, index) in sliders" :key="index" class="swrapper-pane">
          <div class="swrapper-pane-label">info Wrapper</div>
          <img :style="{width:imgWidth+'px'}" :src="item.img" alt @click="amplification(index)" />
        </li>
        <li>
          <!-- 把第一张图放在最后 -->
          <img :style="{width:imgWidth+'px'}" :src="sliders[0].img" alt />
        </li>
      </ul>// 左右切换按钮
      <ul class="direction">
        <li class="left" @click="move(imgWidth, 1, speed)">
          <svg
            class="icon"
            width="30px"
            height="30.00px"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#ffffff"
              d="M481.233 904c8.189 0 16.379-3.124 22.628-9.372 12.496-12.497 12.496-32.759 0-45.256L166.488 512l337.373-337.373c12.496-12.497 12.496-32.758 0-45.255-12.498-12.497-32.758-12.497-45.256 0l-360 360c-12.496 12.497-12.496 32.758 0 45.255l360 360c6.249 6.249 14.439 9.373 22.628 9.373z"
            />
          </svg>
        </li>
        <li class="right" @click="move(imgWidth, -1, speed)">
          <svg
            class="icon"
            width="30px"
            height="30.00px"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#ffffff"
              d="M557.179 904c-8.189 0-16.379-3.124-22.628-9.372-12.496-12.497-12.496-32.759 0-45.256L871.924 512 534.551 174.627c-12.496-12.497-12.496-32.758 0-45.255 12.498-12.497 32.758-12.497 45.256 0l360 360c12.496 12.497 12.496 32.758 0 45.255l-360 360c-6.249 6.249-14.439 9.373-22.628 9.373z"
            />
          </svg>
        </li>
      </ul>
      <ul class="dots">
        <li
          v-for="(dot, i) in sliders"
          :key="i"
          :class="{dotted: i === (currentIndex-1)}"
          @click="jump(i+1)"
        >
          <img :style="{width:'35px'}" :src="sliders[i].img" alt />
        </li>
      </ul>
      <!-- <ul class="dots">
        <li
          v-for="(dot, i) in sliders"
          :key="i"
          :class="{dotted: i === (currentIndex-1)}"
          @click="jump(i+1)"
        ></li>
      </ul>-->
    </div>
    <div class="mask-div" @click="maskFun()" v-if="maskBol">
      <img :style="{width:imgWidth+'px'}" :src="sliders[imgNumber].img" alt class="mask-img" />
    </div>
  </div>
</template>
<script>
export default {
  name: "dataCenter",
  props: {
    initialSpeed: {
      type: Number,
      default: 20
    }, // 图片移动速度
    initialInterval: {
      type: Number,
      default: 1
    } // 如果是一个组件 接受外部传入的切换周期
  },
  data() {
    return {
      sliders: [
        {
          img:
            "http://img.hb.aicdn.com/adbde61e4343dedd21e97ea7f22666825a8db7d077ffe-qn8Pjn_fw658"
        },
        {
          img:
            "http://img.hb.aicdn.com/adeed7d28df6e776c2fa6032579c697381d1a82b7fe00-fwRqgn_fw658"
        },
        {
          img:
            "http://img.hb.aicdn.com/ab7f48509b3c0353017d9a85ef1d12400c9b2724540d4-p3zouo_fw658"
        },
        {
          img:
            "http://img.hb.aicdn.com/60f788fc2a846192f224b9e6d4904b30e54926211d3d67-ACFJ9G_fw658"
        },
        {
          img:
            "http://img.hb.aicdn.com/22ded455284aab361b8d2056e82f74a891a019704296a-PSraEB_fw658"
        },
        {
          img:
            "http://img.hb.aicdn.com/22ded455284aab361b8d2056e82f74a891a019704296a-PSraEB_fw658"
        },
        {
          img:
            "http://img.hb.aicdn.com/22ded455284aab361b8d2056e82f74a891a019704296a-PSraEB_fw658"
        }
      ], // 放图片的数组
      imgWidth: 600, // 图片宽度
      currentIndex: 1, // 原点起始位置
      distance: -600, // 外层嵌套的初始移动距离
      transitionEnd: true, // 防止多次快速点击切换出现问题的闸门
      speed: this.initialSpeed,
      timer: null, // 定时器
      imgNumber: 0, // 点击放大的图片
      maskBol: false
    };
  },
  computed: {
    swrapperStyle() {
      return {
        transform: `translate3d(${this.distance}px, 0, 0)`
      };
    },
    interval() {
      return this.initialInterval * 1000;
    }
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.play();
    },
    move(offset, direction, speed) {
      // 移动一次的距离， 向左还是向右移动， 图片移动速度
      if (!this.transitionEnd) return;
      this.transitionEnd = false;
      direction === -1
        ? (this.currentIndex += offset / this.imgWidth)
        : (this.currentIndex -= offset / this.imgWidth);
      if (this.currentIndex > this.sliders.length) this.currentIndex = 1;
      if (this.currentIndex < 1) this.currentIndex = this.sliders.length;

      const destination = this.distance + offset * direction;
      this.animate(destination, direction, speed);
    },
    animate(des, direc, speed) {
      // 实际移动距离 想左还是向右 移动速度 负右正左
      if (this.temp) {
        window.clearInterval(this.temp);
        this.temp = null;
      }
      this.temp = window.setInterval(() => {
        if (
          (direc === -1 && des < this.distance) ||
          (direc === 1 && des > this.distance)
        ) {
          this.distance += speed * direc;
        } else {
          this.transitionEnd = true;
          window.clearInterval(this.temp);
          this.distance = des;
          let allWidth = this.sliders.length * this.imgWidth;
          if (des < -allWidth) this.distance = -this.imgWidth;
          if (des > -this.imgWidth) this.distance = -allWidth;
        }
      }, 10);
    },
    jump(index) {
      const direction = index - this.currentIndex >= 0 ? -1 : 1;
      const offset = Math.abs(index - this.currentIndex) * this.imgWidth;
      const jumpSpeed =
        Math.abs(index - this.currentIndex) === 0
          ? this.speed
          : Math.abs(index - this.currentIndex) * this.speed;
      this.move(offset, direction, jumpSpeed);
    },
    // 自动播放函数
    play() {
      if (!this.maskBol) {
        if (this.timer) {
          window.clearInterval(this.timer);
          this.timer = null;
        }
        this.timer = window.setInterval(() => {
          this.move(this.imgWidth, -1, this.speed);
        }, this.interval);
      }
    },
    stop() {
      window.clearInterval(this.timer);
      this.timer = null;
    },
    amplification(index) {
      this.imgNumber = index;
      this.maskBol = true;
      this.stop();
    },
    maskFun() {
      this.maskBol = false;
      this.play();
    }
  }
};
</script>
<style lang="scss">
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
ol,
ul {
  list-style: none;
}
#dataCenter {
  text-align: center;
  .window {
    position: relative;
    width: 600px;
    height: 400px;
    margin: 0 auto;
    overflow: hidden;
    .swrapper {
      display: flex;
      position: absolute;
      .swrapper-pane {
        position: relative;

        .swrapper-pane-label {
          position: absolute;
          top: 50px;
          left: 60px;
        }
      }
    }
    .left,
    .right {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 50px;
      height: 50px;
      background-color: rgba(0, 0, 0, 0.3);
      border-radius: 50%;
      cursor: pointer;
    }
    .left {
      left: 3%;
      padding-left: 12px;
      padding-top: 10px;
    }
    .right {
      right: 3%;
      padding-right: 12px;
      padding-top: 10px;
    }
    img {
      user-select: none;
    }
  }
  .dots {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
  }
  .dots li {
    display: inline-block;
    width: 35px;
    height: 35px;
    line-height: 30px;
    margin: 0 3px;
    border: 1px solid white;
    // border-radius: 5px;
    background-color: #333;
    overflow: hidden;
    cursor: pointer;
  }
  .dots .dotted {
    background-color: orange;
    border-color: orange;
  }
  .mask-div {
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.4);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 5000;
    .mask-img {
      margin-top: calc(50vh - 200px);
    }
  }
}
</style>