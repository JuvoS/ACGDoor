<template>
  <div class="wrapper">
    <div class="cg">
      <CardModel
        v-for="(item, key) in cardList"
        :key="key"
        :imgUrl="item.picUrl"
        :title="item.title"
        :downUrl="item.downUrl || ''"
        :downPass="item.downPass || ''"
        :category="item.category || []"
        :updatedAt="item.updatedAt"
        class="cg-item"
      ></CardModel>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
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
        console.log(res);
        let tmp = _.filter(res, o => {
          return o.isShow != "no";
        });
        tmp = _.orderBy(tmp, "updatedAt", "desc");
        tmp.forEach(ele => {
          if (ele.category) ele.category = ele.category.split("#");
          ele.updatedAt = dayjs(ele.updatedAt).format("YYYY-MM-DD");
        });

        this.cardList = tmp;
      });
    }
  }
};
</script>
<style lang="less" scoped>
.wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  &-filter {
    margin-bottom: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    &-left {
      display: flex;
      justify-content: flex-start;
    }
    &-right {
      display: flex;
      justify-content: flex-end;
    }
  }
}
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
@media screen and (max-width: 900px) and (min-width: 600px) {
  .cg {
    &-item {
      flex: 0 0 50%;
    }
  }
}
@media screen and (max-width: 600px) {
  .cg {
    &-item {
      flex: 0 0 100%;
    }
  }
}
</style>

<style scoped></style>
