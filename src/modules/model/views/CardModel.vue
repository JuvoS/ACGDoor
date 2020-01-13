<template>
  <div class="card" @click="$emit('on-do')">
    <!-- <div class="card-img">
      <img :src="imgUrl">
    </div>-->
    <div class="card-content">
      <div class="card-content-title">{{ title }}</div>
      <div class="card-content-other"></div>
      <div class="card-content-category">
        <div
          class="card-content-category-item"
          v-for="(item, key) in category"
          :key="key"
        >
          {{ item }}
        </div>
      </div>
      <div class="card-content-footer">
        <div class="card-content-footer-time">{{ updatedAt }}</div>
        <div class="card-content-footer-url">
          <!-- <a :href="downUrl">下载</a> -->
          <a>查看</a>
          <span>{{ downPass }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    imgUrl: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    },
    downUrl: {
      type: String,
      default: ""
    },
    downPass: {
      type: String,
      default: ""
    },
    category: {
      type: Array,
      default: () => []
    },
    updatedAt: {
      type: String,
      default: ""
    }
  }
};
</script>

<style lang="less" scoped>
.card {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  &-img {
    width: 120px;
    height: 80px;
    border-radius: 5px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
  &-content {
    flex: 1;
    padding: 0 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    &-title {
      font-size: 16px;
      margin: 10px 0;
      margin-top: 5px;
    }
    &-category {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      flex-wrap: wrap;
      align-content: flex-start;
      &-item {
        font-size: 10px;
        padding: 2px 4px;
        background: #ccc;
        border-radius: 2px;
        margin-right: 5px;
        margin-bottom: 5px;
      }
    }
    &-other {
      flex: 1;
    }
    &-footer {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-end;
      &-time {
        font-size: 10px;
        color: #aaa;
      }
      &-url {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        font-size: 12px;
        a {
          color: #0cbabd;
          text-decoration: none;
        }
      }
    }
  }
}
</style>
