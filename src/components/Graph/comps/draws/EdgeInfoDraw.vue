<template>
  <Drawer
    inner
    :transfer="false"
    :mask="false"
    :mast-closable="false"
    :closable="false"
    width="280"
    v-model="isShow"
  >
    <Tabs>
      <TabPane name="style" label="样式">
        <EdgeStyleCmp ref="edgeStyleCmp" :graph="graph" />
        <TextStyleCmp ref="textStyleCmp" :graph="graph" />
      </TabPane>
      <TabPane name="data" label="数据">
        <div v-if="isBind">
          <field-view ref="fieldView" :data="fields" border></field-view>
          <ButtonGroup style="width: 100%;">
            <Button
              icon="ios-create"
              @click="$emit('on-edit', item, resClass)"
              type="primary"
              style="width: 33%; margin-top: 12px;"
              >编辑</Button
            >
            <Button
              icon="md-link"
              @click="$emit('on-bind', item)"
              type="primary"
              ghost
              style="width: 42%; margin-top: 12px;"
              >更改绑定</Button
            >
            <Button
              @click="$emit('on-unbind', item)"
              type="error"
              ghost
              v-if="!item.data.dontSet"
              style="width: 25%; margin-top: 12px;"
              >解绑</Button
            >
          </ButtonGroup>
        </div>
        <div v-else>
          <div v-if="hasResClass">
            <h4 style="margin-bottom: 8px; text-align: center;">
              {{ curResLabel }}
            </h4>
            <Divider style="font-size: 12px;">手动输入编码</Divider>
            <div>
              <hyz-h-box label="楼层" labelWidth="40">
                <span>{{ group.parent_name }} / {{ group.name }}</span>
              </hyz-h-box>
              <hyz-h-box label="编码" labelWidth="40">
                <Input v-model="serial" @on-change="onSerialChanged"></Input>
              </hyz-h-box>
              <hyz-h-box
                v-if="group.type === 'floor'"
                label="区域"
                labelWidth="40"
              >
                <Select v-model="areaId" @on-change="onAreaChanged">
                  <Option
                    v-for="area in areas"
                    :key="area.id"
                    :value="area.id"
                    >{{ area.name }}</Option
                  >
                </Select>
              </hyz-h-box>
            </div>
            <Divider style="font-size: 12px;">或者</Divider>

            <Button
              icon="md-link"
              @click="$emit('on-bind', item)"
              type="primary"
              style="width: 100%; margin-top: 12px;"
              >绑定实例</Button
            >
          </div>
          <div v-else>
            <div v-if="relations.length > 0">
              <attritem title="可选关系">
                <Select
                  v-model="relation"
                  @on-change="onRelationChanged"
                  closeable
                >
                  <Option
                    v-for="relation in relations"
                    :key="relation"
                    :value="relation"
                    >{{ relation }}</Option
                  >
                </Select>
              </attritem>
            </div>
            <div v-else>
              选择资源类
              <Select
                filterable
                v-model="selectResClassId"
                @on-change="onResClassSelected"
              >
                <Option
                  v-for="res in edgeResClasses"
                  :key="res.id"
                  :value="res.id"
                  >{{ res.objectName }}</Option
                >
              </Select>

              <h4 style="margin-bottom: 8px; text-align: center;">
                {{ curResLabel }}
              </h4>
              <Divider style="font-size: 12px;">手动输入编码</Divider>
              <div>
                <hyz-h-box label="楼层" labelWidth="40">
                  <span>{{ group.parent_name }} / {{ group.name }}</span>
                </hyz-h-box>
                <hyz-h-box label="编码" labelWidth="40">
                  <Input v-model="serial" @on-change="onSerialChanged"></Input>
                </hyz-h-box>
                <hyz-h-box
                  v-if="group.type === 'floor'"
                  label="区域"
                  labelWidth="40"
                >
                  <Select v-model="areaId" @on-change="onAreaChanged">
                    <Option
                      v-for="area in areas"
                      :key="area.id"
                      :value="area.id"
                      >{{ area.name }}</Option
                    >
                  </Select>
                </hyz-h-box>
              </div>
              <Divider style="font-size: 12px;">或者</Divider>

              <Button
                icon="md-link"
                @click="goBind"
                type="primary"
                style="width: 100%; margin-top: 12px;"
                >绑定实例</Button
              >
            </div>

            <Button
              style="margin: 5%;width: 90%;"
              v-if="hasTwoInstance"
              type="primary"
              @click="createRelation"
              >关系管理</Button
            >
          </div>
        </div>
      </TabPane>
    </Tabs>
  </Drawer>
</template>

<script>
import {
  FIELD_STATE,
  DISPLAY_TYPE
} from "@components/formdesigner/lib/defines.js";
import { setFieldValue } from "@components/formdesigner/lib/helper.js";
import mxgraph from "../core/index";
import EdgeStyleCmp from "./stylecmp/EdgeStyleCmp";
import TextStyleCmp from "./stylecmp/TextStyleCmp";
const { mxConstants, mxUtils } = mxgraph;

export default {
  props: ["graph", "group"],
  components: { EdgeStyleCmp, TextStyleCmp },
  data() {
    return {
      isShow: false,
      hasResClass: false,
      item: {},
      isBind: false,
      fields: [],
      relations: [],
      relation: "",

      serial: "", //编码
      areaId: "", //区域id

      resClass: {},
      selectResClassId: 0
    };
  },
  computed: {
    areas() {
      const rt = this.$store.state.region.list;
      return _.filter(rt, { parent_id: this.group.id });
    },
    resClasses() {
      return _.cloneDeep(this.$store.state.resClass.list);
    },
    edgeResClasses() {
      return _.filter(this.resClasses, { topoType: "edge" });
    },
    hasTwoInstance() {
      const { source, target } = this.item;
      const sourceData = _.get(source, "data.bindData", null);
      const targetData = _.get(target, "data.bindData", null);

      return sourceData && targetData;
    },
    curResLabel() {
      return _.get(this.item, "data.label", "");
    }
  },
  methods: {
    hide() {
      this.isShow = false;
    },
    setItem(v) {
      this.item = v;
      this.isShow = true;

      this.serial = _.get(v, "data.serial", "");
      this.areaId = _.get(v, "data.region.region", "");

      this.$refs.edgeStyleCmp.init(v);
      this.$refs.textStyleCmp.init(v);

      if (!this.graph.isCellSelected(v)) {
        this.graph.setSelectionCell(v);
      }

      this.relations = [];
      this.relation = _.get(v, "data.relation.relationType", "");
      this.judgeRelate(v);

      //如果是普通连线，则不需要绑定实例
      this.hasResClass = _.get(v, "data.resourceClassId", null);
      const hasBindData = _.get(v, "data.bindData", null);
      if (hasBindData) {
        this.isBind = true;
        const resId = parseInt(v.data.resourceClassId);
        const resClass = _.find(this.resClasses, { id: resId });
        this.initFields(resClass);
        this.graph.setEdgeFlow(v);
      } else {
        this.isBind = false;
      }
    },

    //判断边的两端是否有关系
    judgeRelate(cell) {
      const { source, target } = cell;
      const sourceData = _.get(source, "data.bindData", null);
      const targetData = _.get(target, "data.bindData", null);
      if (sourceData && targetData) {
        const sourceResClassId = sourceData.resource_class_id;
        const targetResClassId = targetData.resource_class_id;
        this.$http({
          method: "get",
          url: `resource/v1/resource/resourceClassRelations/getRelationTypes/${sourceResClassId}/${targetResClassId}`,
          showSpin: false
        }).then(result => {
          this.relations = result;
        });
      }
    },

    onRelationChanged(v) {
      this.item.data = {
        relation: {
          relationType: v
        }
      };
      this.graph.model.setValue(this.item, v);
    },

    onResClassSelected(v) {
      const resClass = _.find(this.resClasses, { id: v });
      const data = {
        label: resClass.objectName,
        keyName: resClass.keyName,
        tableName: resClass.storageTableName,
        type: "edge",
        resourceClassId: v,
        isExtendClass: true
      };
      this.item.data = data;
    },

    goBind() {
      if (!this.selectResClassId) {
        this.$Message.warning("请选择资源类");
        return;
      }
      this.$emit("on-bind", this.item);
    },

    //建立端子关系
    createRelation() {
      const { source, target } = this.item;
      const sourceData = _.get(source, "data.bindData", null);
      const targetData = _.get(target, "data.bindData", null);
      if (sourceData && targetData) {
        this.$http({
          method: "post",
          url: `resource/v1/resource/resourceRelations/batchGetMakeupResourceList`,
          data: [sourceData.id, targetData.id],
          showSpin: true
        }).then(result => {
          if (result) {
            this.hide();
            const from = { cell: sourceData, values: result[sourceData.id] };
            const to = { cell: targetData, values: result[targetData.id] };
            this.graph.openPortLayer(from, to);
            this.$emit("open-portlayer");
          }
        });
      }
    },

    onSerialChanged(evt) {
      if (this.item.data) {
        this.item.data.serial = this.serial.replace(/ /g, "");
        this.item.data.code = this.serial.replace(/ /g, "");
      } else {
        this.item.data = {
          serial: this.serial.replace(/ /g, ""),
          code: this.serial.replace(/ /g, "")
        };
      }
    },

    onAreaChanged(v) {
      if (this.item.data) {
        const area = _.find(this.areas, { id: v });
        this.item.data.region = {
          region: area.id,
          regionName: area.name,
          regionFullId: `${this.group.parent_id},${this.group.id},${area.id}`,
          regionFullName: `${this.group.parent_name} / ${this.group.name} / ${area.name}`
        };
      }
    },

    initFields(rc) {
      if (!rc) return;

      this.$http({
        method: "get",
        url: "resource/v1/resource/resourceClasss/" + rc.id,
        showSpin: false
      }).then(resClass => {
        this.resClass = resClass;
        let allFields = [];
        if (resClass.baseFileData) {
          const baseFieldJSON = JSON.parse(resClass.baseFileData);
          const baseFields = _.get(baseFieldJSON, "[0].children", []);
          allFields = [...baseFields];
        }
        if (resClass.fileData) {
          const fieldJSON = JSON.parse(resClass.fileData);
          const fields = _.get(fieldJSON, "[0].children", []);
          allFields = [...allFields, ...fields];
        }

        let showFields = allFields.filter(v => v.listDisplay);

        let newItem = {};
        let fields = _.cloneDeep(showFields);
        const bindData = this.item.data.bindData;
        fields.forEach(col => {
          col.attributeGroup = col.attributeGroup || "基础属性";
          col.display = DISPLAY_TYPE.horizontal;
          col.state = FIELD_STATE.readonly;
          if (bindData.hasOwnProperty(col.columnKey)) {
            setFieldValue(col, bindData);
          }
        });

        this.fields = fields;
      });
    }
  }
};
</script>

<style></style>
