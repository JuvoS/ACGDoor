<template>
  <div class="cg">
    <CardModel
      v-for="(item, key) in cardList"
      :key="key"
      :imgUrl="item.picUrl"
      :title="item.title"
      :downUrl="item.downUrl"
      :downPass="item.downPass"
      class="cg-item"
    ></CardModel>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "this"
    }
  },
  components: {
    CardModel: () => import("./CardModel")
  },
  data() {
    return {
      cardList: []
    };
  },
  mounted() {
    this.fetchAnt();
  },
  methods: {
    fetchAnt() {
      const query = Bmob.Query("ant");
      query.find().then(res => {
        this.cardList = res;
      });
    }
  }
};
</script>
<style lang="less" scoped>
.cg {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  &-item {
    flex: 0 0 25%;
    box-sizing: border-box;
  }
}
</style>

<style scoped></style>
