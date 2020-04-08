<template>
  <Drawer
    v-model="isShow"
    :title="title + ' - 实例绑定'"
    inner
    scrollable
    draggable
    :transfer="false"
    :mask-closable="true"
    placement="right"
    :width="showNav ? 350 : 300"
  >
    <div slot="header" style="display:flex; align-items: center;">
      <h3>{{ title }} - 实例绑定</h3>
      <Button
        v-if="reuseClasss && reuseClasss.length > 3"
        @click="toggleNav"
        size="small"
        type="primary"
        style="margin-left: 12px;"
      >垂直导航</Button>
    </div>
    <div style="display:flex; width:100%;">
      <div v-if="showNav" style="margin-right: 8px; min-width: 50px;">
        <div
          class="nav-item"
          :class="{ 'nav-item-selected': rc.keyName === curTab }"
          @click="onNavSelected(rc)"
          v-for="rc in reuseClasss"
          :key="rc.id"
        >{{ rc.objectName }}</div>
      </div>
      <Tabs v-model="curTab" @on-click="onTabChanged" size="small" style="width:100%;">
        <TabPane v-for="rc in reuseClasss" :key="rc.id" :name="rc.keyName" :label="rc.objectName">
          <div
            class="bind-item"
            :class="{ 'bind-item-select': isSelected(item) }"
            v-for="item in rc.instances"
            :key="item.id"
          >
            {{ item.serial || item.name || item.label }}
            <Button size="small" @click="doBind(item)">{{ isSelected(item) ? "解绑" : "绑定" }}</Button>
          </div>
          <div>
            <Button
              icon="md-add"
              @click="create(rc)"
              type="primary"
              style="width: 100%; margin-top: 12px;"
            >添加实例并绑定</Button>
          </div>
        </TabPane>
      </Tabs>
    </div>
  </Drawer>
</template>

<script>
import UID from "@tools/util/lib/uid";
export default {
  props: ["graph", "hasParent", "item"],
  data() {
    return {
      isShow: false,
      title: "",
      bindCell: {},
      reuseClasss: [], //复用类
      list: [],
      curTab: "",
      showNav: false,
      initData: {} //列表数据是过滤后的
    };
  },
  computed: {
    resClasses() {
      return _.cloneDeep(this.$store.state.resClass.list);
    }
  },
  methods: {
    show(cellData) {
      this.title = cellData.label;
      this.bindCell = cellData;
      this.queryInstances(cellData);
    },
    hide() {
      this.isShow = false;
    },
    setReuseClasss(relateReuses) {
      this.relateReuses = relateReuses;
    },

    create(resClass) {
      // this.hide();
      this.$emit("create-instance", resClass);
    },

    isSelected(item) {
      return item.id === _.get(this.bindCell, "bindData.id", "");
    },

    //复用类切换查询其下的资源实例
    onTabChanged(v) {
      this.curTab = v;
      const resClass = _.find(this.reuseClasss, { keyName: v });
      // if (resClass.instances) return; //如果已获取则不请求

      const itemType = _.get(this.item, "type", "");
      let conditions = [];
      if (itemType === "floor") {
        //如果是楼层，则需按楼层进行过滤

        //如果是停车位需要调单独接口，停车位需要屏蔽车辆图片信息
        const url =
          resClass.keyName === "parking_space_v"
            ? "resource/v1/resource/dynamicTables/listOfParkingSpace"
            : "resource/v1/resource/dynamicTables/list";

        this.$http({
          method: "POST",
          url,
          data: {
            resourceClassId: resClass.id,
            searchParas: {
              conditions: [
                { name: "region_full_id", op: "like", value: this.item.id }
              ]
            }
          },
          showSpin: false
        }).then(result => {
          if (result) {
            this.processResult(result, resClass);
          }
        });
      } else {
        this.$http({
          method: "POST",
          url: "resource/v1/resource/dynamicTables/list",
          data: {
            resourceClassId: resClass.id,
            searchParas: {
              conditions
            }
          },
          showSpin: false
        }).then(result => {
          if (result) {
            this.processResult(result, resClass);
          }
        });
      }
    },

    processResult(result, resClass) {
      const existCells = Object.values(this.graph.model.cells);
      const filters = _.filter(result.list, v => {
        return existCells.find(
          cell => _.get(cell, "data.bindData.id", "") === v.id
        )
          ? false
          : true;
      });

      const sort = _.orderBy(filters, ["name", "label"]);
      this.$set(resClass, "instances", sort);
    },

    //查询扩展类下所有的复用类
    queryInstances(cellData) {
      const resourceClassId = cellData.resourceClassId;
      //根据资源类id获取资源实例
      if (resourceClassId) {
        const id = parseInt(resourceClassId);

        //假如是扩展类节点，需要获取下面复用类分类情况
        if (cellData.isExtendClass) {
          if (this.hasParent) {
            this.reuseClasss = _.filter(this.resClasses, rc => {
              return rc.parentId === id;
            });
          } else {
            this.reuseClasss = _.filter(this.resClasses, { parentId: id });
          }

          //默认加载第一个复用类的实例
          if (this.reuseClasss.length > 0) {
            this.onTabChanged(this.reuseClasss[0].keyName);
            this.isShow = true;
          }
        } else {
          this.reuseClasss = _.filter(this.resClasses, {
            keyName: cellData.keyName
          });
          this.onTabChanged(cellData.keyName);
          this.isShow = true;
        }
        this.showNav = this.reuseClasss && this.reuseClasss.length > 3;
      } else {
        // this.$Message.info("未建资源类！");
      }
    },

    toggleNav() {
      this.showNav = !this.showNav;
    },

    onNavSelected(v) {
      this.onTabChanged(v.keyName);
    },

    doBind(item, forceBind) {
      const cell = this.graph.getSelectionCell();
      if (!forceBind && this.isSelected(item)) {
        this.$set(cell.data, "bindData", null);
        cell.setId(this.graph.model.createId(cell));
        this.graph.model.setValue(cell, cell.data.label);
      } else {
        this.$set(cell.data, "bindData", item);
        cell.setId(item.id);

        const showName = item.serial || item.code || item.name || item.label;
        this.graph.model.setValue(cell, showName);
      }
      this.hide();
      this.$emit("bind-success", cell);
    },

    unBind() {
      const cell = this.graph.getSelectionCell();
      if (!cell.data.bindData) return;

      //解绑保留编码和地域数据
      cell.data.serial = cell.data.bindData.serial || cell.data.bindData.code;
      const {
        region,
        region_name,
        region_full_id,
        region_full_name
      } = cell.data.bindData;
      cell.data.region = {
        region,
        regionName: region_name,
        regionFullId: region_full_id,
        regionFullName: region_full_name
      };

      this.$set(cell.data, "bindData", null);
      cell.setId(UID(1));
      this.graph.model.setValue(cell, cell.data.label);
      this.$emit("bind-success", cell);
    },

    //保存实例后并绑定
    saveAndBind(item) {
      if (!item) return;
      const resClass = _.find(this.reuseClasss, {
        keyName: item.resource_class_keyname
      });
      if (resClass) {
        // if (resClass.instances) {
        //   let findItemIndex = _.findIndex(resClass.instances, { id: item.id });
        //   if (findItemIndex > -1) {
        //     resClass.instances.splice(findItemIndex, 1, item);
        //   } else {
        //     resClass.instances.unshift(item);
        //   }
        // } else {
        //   resClass.instances = [item];
        // }
        this.doBind(item, true);
      } else {
        //不查数据直接编辑保存的情况
        this.doBind(item, true);
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import "~@/styles/theme";

.bind-item {
  padding: 5px 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &-select {
    background: @primary-color;
    color: white;
  }
}

.nav-item {
  border: 1px solid #efefef;
  cursor: pointer;
  margin-bottom: -1px;
  padding: 2px 4px;
  &:hover {
    background: fade(#0cbabd, 40%);
  }
  &-selected {
    background: fade(#0cbabd, 90%);
  }
}
</style>
