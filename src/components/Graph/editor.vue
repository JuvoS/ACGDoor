<template>
  <div class="editor">
    <div class="wrapper">
      <div class="toolbar">
        <Toolbar
          ref="toolbar"
          @back="$emit('back')"
          @up="onUp"
          @expand-changed="onExpandChanged"
          @toggle-layer="onToggleLayer"
          @on-draw-area="onDrawArea"
        />
      </div>
      <div class="content">
        <div class="left">
          <CompNav ref="nav" :enableParking="enableParking" />
        </div>
        <div class="right">
          <Workspace
            ref="workspace"
            :item="item"
            @back="$emit('back')"
            @up="onUp"
            @drill="onDrill"
            @on-save="onTopoFileSaved"
            @on-finish-draw="onFinishDrawArea"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Toolbar from "./comps/Toolbar";
import CompNav from "./comps/CompNav";
import Workspace from "./comps/Workspace";
export default {
  name: "HyzGraphEditor",
  props: ["item"],
  components: { CompNav, Workspace, Toolbar },
  data() {
    return {
      splitRatio: "280px",
      data: {},
      //下钻后保存的父级Id队列。虽然topo文件本身有Parentid，
      //但如果某个设备在两个组态图里都有，那么返回的话都会返回到有parentId的那个组态图。
      //所以需要维护一个父级id队列，
      parentIds: []
    };
  },
  mounted() {
    this.init();
  },
  computed: {
    resClasses() {
      return this.$store.state.resClass.list;
    },
    enableParking() {
      //如果是地下空间，则把停车场相关类放出来
      return this.item.parent_key_name === "baseroom";
    }
  },
  methods: {
    init() {
      this.$nextTick(() => {
        const graph = this.$refs.workspace.getGraph();
        this.$refs.toolbar.initGraph(graph);
        this.$refs.nav.initGraph(graph);
      });
    },
    initData(data, initResNav = true) {
      this.data = data;
      if (data) {
        this.$refs.workspace.initData(this.data);

        if (initResNav) {
          if (data.resourceClassId && data.parentId) {
            this.fetchDrillRelateResClass({
              resource_class_id: data.resourceClassId
            });
          } else {
            this.$refs.nav.initRes(null, true); //放开左侧全部图标
          }
        }
      }
    },
    onTopoFileSaved(v) {
      this.data = v;
    },
    onDrill(cell) {
      this.fetchDrillRelateResClass(cell, true);
    },
    //获取下钻节点有组成关系的扩展类
    fetchDrillRelateResClass(cell, needFetchTopoFile) {
      this.$http({
        method: "get",
        url: `resource/v1/resource/resourceClasss/getMakeupClassList/${cell.resource_class_id}`
      }).then(result => {
        const extendsClasses = _.get(result, "extends", []);
        // if (extendsClasses.length > 0) {
        this.$refs.workspace.markAndSave(); //保存上层拓扑并标志可下钻
        //   this.$refs.nav.initRes(extendsClasses, true); //重置左侧导航菜单
        this.$refs.workspace.setReuseClasss(result.reuses); //绑定实例时从有关系的复用类里选
        if (needFetchTopoFile) {
          //假如有端子资源类，则需要根据设备获取端子列表数据
          const hasPort = _.find(extendsClasses, { keyName: "terminals" });

          this.fetchTopoFile(cell, hasPort); //获取节点拓扑文件
        }
        // } else {
        //   this.$Message.warning("该节点下未有组成关系的资源类数据！");
        // }
      });
    },
    fetchTopoFile(cell, needFetchSubInstances) {
      this.$http({
        method: "post",
        url: "resource/v1/topoFiles/list",
        data: {
          searchParas: {
            conditions: [
              // {
              //   name: "type",
              //   op: "eq",
              //   value: this.data.type
              // },
              // {
              //   name: "parentId",
              //   op: "eq",
              //   value: this.data.id + ""
              // },
              {
                name: "resourceId",
                op: "eq",
                value: cell.id
              }
            ]
          }
        },
        showSpin: true
      }).then(result => {
        this.parentIds.push(this.data.id);
        const topData = _.get(result, "list[0]", null);
        if (topData) {
          this.initData(topData, false);
        } else {
          //没有则新增拓扑
          const newItem = {
            commonGroupId: this.data.commonGroupId,
            name: cell.name + "组态图",
            keyName: cell.name + "_keyName",
            resourceId: cell.id,
            resourceClassId: cell.resource_class_id,
            resourceName: cell.name,
            resourceTableName: this.getTableName(cell.resource_class_id),
            type: this.data.type,
            parentId: this.data.id
          };
          this.initData(newItem, false);

          //没有拓扑图，并且还需要获取下联设备。
          if (needFetchSubInstances) {
            this.$refs.workspace.fetchPortByDevice(cell);
          }
        }
      });
    },
    getTableName(id) {
      const resClass = _.find(this.resClasses, { id });
      return _.get(resClass, "storageTableName", "");
    },
    fetchTopoFileById(id) {
      this.$http({
        method: "get",
        url: `resource/v1/topoFiles/${id}`,
        showSpin: true
      }).then(result => {
        if (result) {
          this.parentIds = _.dropRight(this.parentIds);
          this.initData(result);
        }
      });
    },

    //返回上一级
    onUp() {
      if (this.parentIds.length > 0) {
        this.$refs.workspace.hideDraws();
        this.fetchTopoFileById(this.parentIds[this.parentIds.length - 1]);
      } else {
        this.$emit("back");
      }
    },
    onExpandChanged(v) {
      this.$refs.workspace.expandAttributePanel(v);
    },
    onToggleLayer() {
      this.$refs.workspace.toggleLayer();
    },
    onFinishDrawArea() {
      this.$refs.toolbar.areaDraw();
    },
    onDrawArea(v) {
      this.$refs.workspace.onDrawAreaState(v);
    }
  }
};
</script>

<style lang="less" scoped>
@import "./styles/index.less";
</style>

