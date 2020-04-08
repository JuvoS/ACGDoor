<template>
  <Drawer
    inner
    :transfer="false"
    :mask="false"
    :mast-closable="false"
    :closable="false"
    v-model="show"
  >
    <div v-if="defaultLayerIsShow">
      <attritem required title="视图名称">
        <Input v-model="item.name" />
      </attritem>
      <attritem title="视图标识">
        <Cascader
          v-if="navItem.classType === 'tempGraph'"
          filterable
          @on-change="onResClassChanged"
          :data="resClassesTree"
          v-model="resClassIds"
        ></Cascader>
        <Input v-else v-model="item.keyName" />
      </attritem>
      <attritem layout="h" title="栅格启用">
        <i-switch v-model="enableGrid" @on-change="toggleGridShow" />
      </attritem>
      <attritem title="背景">
        <div style="display:flex; align-items:center;">
          <ColorPicker
            size="small"
            style="width: 60px;"
            transfer
            v-model="bgColor"
            recommend
            editable
            @on-active-change="onColorChanged"
          />&nbsp;&nbsp;
          <Upload
            ref="upload"
            :show-upload-list="false"
            accept="image/*, *.svg"
            :format="['jpg', 'jpeg', 'svg', 'png']"
            :max-size="20480"
            :headers="headers"
            name="files"
            :data="params"
            :before-upload="onBeforeUpload"
            :on-success="onIconUploadSuccess"
            :action="uploadUrl"
          >
            <Button size="small" type="primary" ghost>选择图片</Button>
          </Upload>&nbsp;&nbsp;
          <Button @click="onClearBackground" size="small" type="primary" ghost>清空背景</Button>
        </div>
      </attritem>
      <attritem title="说明">
        <Input type="textarea" v-model="item.remark" />
      </attritem>
    </div>
    <ButtonGroup v-if="defaultLayerIsShow" style="width: 100%;">
      <Button style="width: 30%; margin: 12px 0;" type="primary" ghost @click="$emit('up')">取消</Button>
      <Button style="width: 40%; margin: 12px 0;" type="primary" @click="save()">保存</Button>
      <Button
        :disabled="!item.id"
        style="width: 30%; margin: 12px 0;"
        type="error"
        @click="() => (showDeleteModal = true)"
      >{{ item.id ? "删除" : "未保存" }}</Button>
    </ButtonGroup>
    <div v-else>
      <h4 style="margin: 12px;">端子关系连接</h4>
      <ButtonGroup style="width: 100%">
        <Button style="width: 50%;" type="primary" ghost @click="onBackDefaultLayer">返回</Button>
        <Button style="width: 50%;" type="primary" @click="savePortRelation">保存关系</Button>
      </ButtonGroup>
    </div>
    <Modal title="删除警告" v-model="showDeleteModal" class-name="vertical-center-modal">
      <Alert type="error">是否真的删除该组态【{{ item ? item.name : "" }}】？</Alert>
      <div slot="footer" style="text-align: center">
        <Button @click="showDeleteModal = false" style="margin-left: 8px">取消</Button>
        <Button type="error" @click="doDel">确定删除</Button>
      </div>
    </Modal>
  </Drawer>
</template>

<script>
export default {
  props: ["show", "graph", "navItem", "parkingLot"],
  data() {
    return {
      item: {
        name: "",
        keyName: "",
        commonGroupId: 0,
        type: "拓扑",
        parentId: "0",
        resourceId: "0",
        remark: ""
      },
      enableGrid: true,
      bgColor: "",
      showDeleteModal: false,
      defaultLayerIsShow: true,

      initRelations: [], //从xml中解析出初始关系，最后保存时跟最终关系做对比用来删除关系
      //icon上传参数
      params: {},

      resClassIds: []
    };
  },
  computed: {
    headers() {
      return {
        Authorization: "Bearer " + this.$ls.get("TOKEN")
      };
    },
    uploadUrl() {
      return `${this.$config.http.baseURL}fileSystem/upload`;
    },
    resClasses() {
      return this.$store.state.resClass.list;
    },
    resClassesTree() {
      const cloneTree = _.cloneDeep(this.$store.getters["resClass/tree"]);
      //只留下复用类
      const result = _.filter(cloneTree, lv1 => {
        lv1.children = _.filter(lv1.children, lv2 => {
          return lv2.children.length > 0;
        });
        return lv1.children.length > 0;
      });
      return result;
    }
  },
  methods: {
    init(v) {
      this.item = v;

      //假如是模板组态并且有keyName，回显级联选择组件
      if (this.navItem.classType === "tempGraph" && this.item.keyName) {
        const lv3 = _.find(this.resClasses, {
          keyName: this.item.keyName,
          rank: 3
        });
        if (!lv3) {
          this.$Message.error(`该资源类【${this.item.keyName}】已删！`);
          this.resClassIds = [];
          return;
        }
        const lv2 = _.find(this.resClasses, { id: lv3.parentId, rank: 2 });
        if (!lv2) {
          this.$Message.error(
            `该资源类【${this.item.keyName}】所在扩展类已删！`
          );
          this.resClassIds = [];
          return;
        }
        const lv1 = _.find(this.resClasses, { id: lv2.parentId, rank: 1 });
        if (!lv1) {
          this.$Message.error(`该资源类【${this.item.keyName}】所在基类已删！`);
          this.resClassIds = [];
          return;
        }
        this.resClassIds = [lv1.id, lv2.id, lv3.id];
      } else {
        this.resClassIds = [];
      }
      this.$nextTick(() => {
        this.bgColor = this.graph.container.style.backgroundColor;
        this.initRelations = this.getRelations();
      });

      //假如从地下空间来，需要获取楼层下面的停车场信息
      if (this.navItem.parent_key_name === "baseroom") {
        this.$http({
          method: "post",
          url: "execution/v1/execution/businessSqls/execBusinessSql",
          data: {
            keyName: "queryParkingLotByFloorId",
            params: {
              floorId: this.navItem.id
            }
          }
        }).then(result => {
          if (result) {
            this.$emit("transfer-parking-lot", result);
          } else {
            this.addParkingLot();
          }
        });
      }
    },

    onResClassChanged(v) {
      console.log("TCL: onResClassChanged -> v", v);
    },

    onColorChanged(v) {
      this.graph.container.style.backgroundColor = v;
    },

    onClearBackground() {
      this.bgColor = "";
      this.graph.clearBackground();
    },

    handleBeforeUpload(v) {
      this.graph.import(v);
      return false;
    },

    onBeforeUpload(file) {
      this.params.name = file.name;
    },
    onIconUploadSuccess(v) {
      if (v.hyz_result) {
        const path = v.hyz_result.split("|")[1];
        this.graph.setBgImg(path, 800, 600);
      }
    },

    hideDefaultLayer() {
      this.defaultLayerIsShow = false;
    },

    //返回默认图层
    onBackDefaultLayer() {
      this.defaultLayerIsShow = true;
      this.graph.backDefaultLayer();
    },

    //对下钻的元素进行标记，并保存当前视图
    markAndSave() {
      this.graph.markDrill();
      this.save(true);
    },

    toggleGridShow(v) {
      console.log("TCL: toggleGridShow -> v", v);
      this.graph.setGridEnabled(v);
      this.graph.refresh();
    },

    save(dontReset) {
      if (this.item.name.trim() === "") {
        this.$Message.error("请输入名称！");
        return;
      }

      if (
        this.navItem.classType === "tempGraph" &&
        this.resClassIds.length === 0
      ) {
        this.$Message.error("请选择复用类！");
        return;
      }

      const cells = Object.values(this.graph.model.cells);

      const cellIds = _.map(cells, "id");
      console.log("TCL: save -> cellIds", cellIds);
      let duplication = new Set();
      cellIds.map((item, index) => {
        let lastIndexOfItem = cellIds.lastIndexOf(item);
        while (index !== lastIndexOfItem) {
          duplication.add(item);
          cellIds.splice(lastIndexOfItem, 1);
          lastIndexOfItem = cellIds.lastIndexOf(item);
        }
      });

      if (duplication.size > 0) {
        let str = "";
        duplication.forEach(v => (str += v + " "));
        console.log("重复实例ID为", str);
        this.$Message.error(`存在重复的实例，请看控制台！`);
        return;
      }

      //模板组态处理keyName
      if (this.navItem.classType === "tempGraph") {
        const id = _.last(this.resClassIds);
        const res = _.find(this.resClasses, { id, rank: 3 });
        if (res) {
          this.item.keyName = res.keyName;
        } else {
          this.$Message.error("被联类请选择复用类(三级资源类))！");
          return;
        }
      }

      // if (!this.item.keyName) {
      //   this.$Message.error("请输入标识！");
      //   return;
      // }
      //保存前重置下视图
      this.graph.resetView();
      this.item.fileData = this.graph.getXML();
      this.$http({
        method: this.item.id ? "put" : "post",
        url: "resource/v1/topoFiles",
        data: this.item,
        showMsg: true
      }).then(result => {
        if (result) {
          this.saveSpotEdgeRelate();
          if (!dontReset) {
            this.item = result;
            this.$emit("on-save", result);
          }
          const finalRelations = this.getRelations();
          this.judge(this.initRelations, finalRelations);
        }
      });
    },

    addParkingLot() {
      const pid = _.get(this.parkingLot, "id", "");
      if (!pid) {
        //如果是新增并且是地下空间，则新增一个停车场

        const resClass = _.find(this.resClasses, { keyName: "parking_spot_v" });
        this.$http({
          method: "post",
          url: "resource/v1/resource/dynamicTables",
          data: {
            resourceClassId: resClass.id,
            data: [
              {
                name: this.navItem.name + "停车场",
                floor: this.navItem.id,
                floor_name: this.navItem.name,
                floor_full_id: this.navItem.parent_id,
                floor_full_name: this.navItem.parent_name,
                plane_graph: this.navItem.base_svg
              }
            ]
          }
        }).then(result => {
          this.$emit("transfer-parking-lot", result);
        });
      }
    },

    //通过新老关系进行判断哪些关系需要删除，哪些需要新增
    judge(oldRelations, finalRelations) {
      const needSaveRelations = _.filter(finalRelations, v => {
        const findItem = _.find(oldRelations, fr => {
          return (
            fr.mainResourceId == v.mainResourceId &&
            fr.passiveResourceId == v.passiveResourceId &&
            fr.relationType == v.relationType
          );
        });
        return findItem ? false : true;
      });
      this.saveRelate(needSaveRelations);

      const needDelRelations = _.filter(oldRelations, v => {
        const findItem = _.find(finalRelations, fr => {
          return (
            fr.mainResourceId == v.mainResourceId &&
            fr.passiveResourceId == v.passiveResourceId &&
            fr.relationType == v.relationType
          );
        });
        return findItem ? false : true;
      });
      this.deleteRelate(needDelRelations);
    },

    doDel() {
      this.$http({
        method: "delete",
        url: "resource/v1/topoFiles",
        data: [this.item.id],
        showMsg: true
      }).then(result => {
        //删除所有的关系
        this.deleteRelate(this.getRelations());
        this.$emit("up");
        this.showDeleteModal = false;

        //如果地下空间，则把对应的停车场也要删掉
        if (this.navItem.parent_key_name === "baseroom") {
          this.$http({
            method: "delete",
            url: "resource/v1/resource/dynamicTables",
            data: {
              resourceClassId: this.parkingLot.resource_class_id,
              ids: [this.parkingLot.id]
            }
          }).then(result => {});
        }
      });
    },

    //获取拓扑内所有的关系
    getRelations() {
      const cells = this.graph.getModel().cells;
      let relations = [];
      _.forEach(cells, v => {
        if (v.edge && v.data && v.data.relation && v.source && v.target) {
          relations.push({
            mainResourceId: v.source.id,
            mainResourceName: v.source.value,
            mainResourceTableName: v.source.data.tableName,
            passiveResourceId: v.target.id,
            passiveResourceName: v.target.value,
            passiveResourceTableName: v.target.data.tableName,
            relationType: v.data.relation.relationType
          });
        }

        //如果有父级
        if (this.item.parentId) {
          if (v.vertex && v.data && v.data.bindData) {
            relations.push({
              mainResourceId: v.id,
              mainResourceName: v.value,
              mainResourceTableName: v.data.tableName,
              passiveResourceId: this.item.resourceId,
              passiveResourceName: this.item.resourceName,
              passiveResourceTableName: this.item.resourceTableName,
              relationType: "组成"
            });
          }
        }
      });
      return relations;
    },

    deleteRelate(relations) {
      if (relations.length === 0) return;
      // 避免因组态误操作，导致关系丢失，现在关掉删除逻辑
      // this.$http({
      //   method: "post",
      //   url: "resource/v1/resource/resourceRelations/batchdelete",
      //   data: relations
      // }).then(result => {});
    },

    saveRelate(relations) {
      if (relations.length === 0) return;
      this.$http({
        method: "post",
        url: "resource/v1/resource/resourceRelations/batchadd",
        data: relations
      }).then(result => {});
    },

    //保存端口关系
    savePortRelation() {
      //老关系
      const oldRelations = this.graph.devicePortLayerRelations;

      const cells = _.get(this.graph, "devicePortLayer.children", []);
      let relations = [];
      cells.forEach(cell => {
        const sourceData = _.get(cell, "source.data.bindData", null);
        const targetData = _.get(cell, "target.data.bindData", null);
        if (cell.edge && sourceData && targetData) {
          const mainResClass = _.find(this.resClasses, {
            keyName: sourceData.resource_class_keyname
          });
          const passiveResClass = _.find(this.resClasses, {
            keyName: sourceData.resource_class_keyname
          });
          relations.push({
            mainResourceId: sourceData.id,
            mainResourceName: sourceData.name,
            mainResourceTableName: mainResClass
              ? mainResClass.storageTableName
              : "",
            passiveResourceId: targetData.id,
            passiveResourceName: targetData.name,
            passiveResourceTableName: passiveResClass
              ? passiveResClass.storageTableName
              : "",
            relationType: "连接"
          });
        }
      });

      this.judge(oldRelations, relations);

      this.graph.devicePortLayerRelations = relations;
    },

    //保存定位点连接关系
    saveSpotEdgeRelate() {
      let cells = _.values(this.graph.model.cells);
      let edgeCells = [];
      cells.forEach(cell => {
        let itemType = _.get(cell, "data.itemType", "");
        if (itemType == "parking-spot") edgeCells.push(cell);
      });
      let parent = this.graph.getDefaultParent();
      let edgeCellInfos = [];
      let connects = [];
      edgeCells.forEach(cell => {
        let connectEdges = this.graph.getOutgoingEdges(cell, parent);

        connectEdges.forEach(ele => {
          connects.push({
            adjacentId: _.get(cell, "data.bindData.id", ""),
            twoDimensionCodeId: _.get(ele, "target.data.bindData.id", "")
          });
          connects.push({
            adjacentId: _.get(ele, "target.data.bindData.id", ""),
            twoDimensionCodeId: _.get(cell, "data.bindData.id", "")
          });
        });
      });
      if (connects.length > 0)
        this.$http({
          method: "POST",
          url: "lpgs//twoDimensionCode/addAdjacence",
          data: connects
        })
          .then(res => {
            // console.log(res);
            return this.$Message.success("操作成功");
          })
          .catch(() => {
            this.$Message.error("操作失败");
          });
    }
  }
};
</script>

<style></style>
