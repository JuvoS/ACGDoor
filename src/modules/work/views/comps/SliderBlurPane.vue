<template>
  <div class="sliderb-mask">
    <div :id="paneId" class="sliderb"></div>
  </div>
</template>
<script>
export default {
  name: "SliderBlur",
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
      paneId: "slider" + _.random(1000, 9999),
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
<style lang="less" scoped>
.sliderb {
  width: 100vh;
  &-mask {
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.4);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 5000;
  }
}
</style>