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
        @on-do="onClickCard(item)"
      ></CardModel>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
    <MaskModel v-model="maskState">
      <div id="starBox" style="height: 100%;width: 100%;"></div>
    </MaskModel>
  </div>
</template>

<script>
import dayjs from "dayjs";
import * as THREE from "three";
import MODOX from "@/utils/modox";
export default {
  props: {
    title: {
      type: String,
      default: "this"
    }
  },
  components: {
    CardModel: () => import("./CardModel"),
    MaskModel: () => import("@/components/BaseModel/MaskModel")
  },
  data() {
    return {
      cardList: [],
      maskState: false
    };
  },
  mounted() {
    console.log("start");
    this.fetchModel();
  },
  methods: {
    fetchModel() {
      const query = Bmob.Query("model");
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
    },
    onClickCard(v) {
      this.maskState = true;
      this.$nextTick(() => {
        this.Init();
      });
    },
    Init() {
      let star = new MODOX();
      star.APP("starBox", false);

      //立方体
      var cubeGeometry = new THREE.CubeGeometry(30, 30, 30);

      var cubeMaterial = new THREE.MeshLambertMaterial({ color: 0x00ff00 });

      let cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
      cube.position.x = 100;
      cube.position.y = 0;
      cube.position.z = -5;

      //告诉立方体需要投射阴影
      cube.castShadow = true;

      // star.createBox(cube);
      // star.createGround();
      // star.CreatePointLight(500, 500, 0, "#ffffff", 0.8);
      // star.CreatePointLight(-500, -500, 0, "#ffffff", 0.8);
      let a = 500;
      star.CreatePointLight(-500, -500, -500, "#ffffff", 0.8);
      star.CreatePointLight(-500, a, -500, "#ff0000", 0.8);
      star.CreatePointLight(
        (Math.sqrt(3) * a) / 2,
        a / 2,
        -500,
        "#0000ff",
        0.8
      );
      star.CreatePointLight(
        (Math.sqrt(3) * a) / 6,
        a / 2,
        (Math.sqrt(6) * a) / 3,
        "#00ff00",
        0.8
      );
      star.createObj("static/model/test", 0.05, { x: 0, y: 0, z: 0 });
      star.createObj("static/model/test", 0.05, { x: 0, y: a, z: 0 });
      star.createObj("static/model/test", 0.05, {
        x: (Math.sqrt(3) * a) / 2,
        y: a / 2,
        z: 0
      });
      star.createObj("static/model/test", 0.05, {
        x: (Math.sqrt(3) * a) / 6,
        y: a / 2,
        z: (Math.sqrt(6) * a) / 3
      });
      // star.createObj("obj/PlayerShip_002", 0.03, { x: 0, y: 10, z: 0 });
      // star.createPointObj(
      //   "static/model/test",
      //   { x: -40, y: 10, z: -40 },
      //   { x: 1, y: 1, z: 1 },
      //   { x: -0.5, y: 0, z: -0.5 }
      // );
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
