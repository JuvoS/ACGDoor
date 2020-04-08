<template>
  <Drawer
    inner
    :transfer="false"
    :mask="false"
    :mast-closable="false"
    :closable="false"
    v-model="isShow"
    width="280"
  >
    <Tabs>
      <TabPane name="style" label="样式">
        <TextStyleCmp ref="textStyleCmp" :graph="graph" />
        <VertexStyleCmp ref="vertexStyleCmp" :graph="graph" />
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
            >编辑</Button>
            <Button
              icon="md-link"
              @click="$emit('on-bind', item)"
              type="primary"
              ghost
              v-if="!item.data.dontSet"
              style="width: 42%; margin-top: 12px;"
            >更改绑定</Button>
            <Button
              @click="$emit('on-unbind', item)"
              type="error"
              ghost
              v-if="!item.data.dontSet"
              style="width: 25%; margin-top: 12px;"
            >解绑</Button>
          </ButtonGroup>

          <!-- 摄像头管理车位模式 -->
          <div v-if="showSetManagerParkingSpace" style="margin-top: 8px;">
            <Button
              :disabled="startSetManagerParkingSpace"
              type="primary"
              @click="setManagerParkingSpace"
            >设置管理车位</Button>
            <div v-if="startSetManagerParkingSpace">
              设置模式开启中...(点击车位选中，再点车位取消选中)
              <hyz-v-box label="关联车位">
                <hyz-h-box label="左" labelWidth="50" labelAlign="right">
                  <Select v-model="camera.first">
                    <Option
                      v-for="space in pickParkingSpaces"
                      :value="space.id"
                      :key="space.id"
                    >{{ space.value }}</Option>
                  </Select>
                </hyz-h-box>
                <hyz-h-box label="中" labelWidth="50" labelAlign="right">
                  <Select v-model="camera.second">
                    <Option
                      v-for="space in pickParkingSpaces"
                      :value="space.id"
                      :key="space.id"
                    >{{ space.value }}</Option>
                  </Select>
                </hyz-h-box>
                <hyz-h-box label="右" labelWidth="50" labelAlign="right">
                  <Select v-model="camera.third">
                    <Option
                      v-for="space in pickParkingSpaces"
                      :value="space.id"
                      :key="space.id"
                    >{{ space.value }}</Option>
                  </Select>
                </hyz-h-box>
              </hyz-v-box>
              <ButtonGroup style="width: 100%;">
                <Button
                  icon="ios-create"
                  @click="cancelSetMgrParkingSpace"
                  style="width: 50%; margin-top: 12px;"
                >取消设置</Button>
                <Button
                  @click="saveCameraParkingSpace"
                  type="primary"
                  style="width: 50%; margin-top: 12px;"
                >保存管理车位</Button>
              </ButtonGroup>
            </div>
            <hyz-v-box v-else label="已关联车位">
              <div v-for="space in pickParkingSpaces" :key="space.id">{{space.value}}</div>
            </hyz-v-box>
          </div>
        </div>
        <div v-else-if="isKpiType">
          <h4>指标内容定制</h4>
          <hyz-h-box label="资源类">
            <Select v-model="kpiResClass" @on-change="onKpiResClassChanged">
              <Option v-for="res in curResClasses" :key="res.resId" :value="res.resId">{{res.label}}</Option>
            </Select>
          </hyz-h-box>
          <hyz-v-box v-if="kpiResClass" label="可选指标">
            <Collapse simple :value="collapseValue">
              <Panel v-for="group in kpis" :name="group.name" :key="group.name">
                <span class="panel-title">{{group.name}}</span>
                <div slot="content">
                  <Checkbox
                    v-model="kpi.checked"
                    v-for="kpi in group.value"
                    :key="kpi.id"
                    :label="kpi.kpiKey"
                  >
                    <span>{{kpi.kpiName}}</span>
                  </Checkbox>
                </div>
              </Panel>
            </Collapse>
          </hyz-v-box>
          <hyz-v-box v-if="kpiResClass" label="可选实例">
            <Checkbox
              v-model="ins.checked"
              v-for="ins in instances"
              :key="ins.id"
              :label="ins.name"
            >
              <span>{{ins.name}}</span>
            </Checkbox>
          </hyz-v-box>
          <div v-if="kpiResClass">
            <Button type="primary" style="margin-top: 12px; width: 100%;" @click="applyKpi">应用</Button>
          </div>
        </div>
        <div v-else-if="isSingleKpi">
          <h4>指标内容定制</h4>
          <hyz-h-box label="单设备模板">
            <i-switch v-model="isChildSelect"></i-switch>
          </hyz-h-box>
          <div v-if="!isChildSelect">
            <hyz-h-box label="设备类型">
              <Select v-model="singleKpiModel" clearable>
                <Option
                  v-for="(item,key) in singleKpiList"
                  :value="item.label"
                  :key="key"
                >{{ item.label }}</Option>
              </Select>
            </hyz-h-box>
            <hyz-h-box label="设备" v-if="singleKpiModel">
              <Select v-model="singleKpiCellLabel" clearable>
                <Option
                  v-for="(item,key) in singleKpiCells"
                  :value="item.label"
                  :key="key"
                >{{ item.label }}</Option>
              </Select>
            </hyz-h-box>
            <hyz-h-box label="实例类型" v-if="singleKpiCellLabel">
              <Select v-model="singleInstanceModel">
                <Option
                  v-for="(item,key) in singleInstanceList"
                  :value="item.id"
                  :key="key"
                >{{ item.objectName }}</Option>
              </Select>
            </hyz-h-box>

            <hyz-h-box label="指标类型" v-if="singleInstanceModel">
              <Select v-model="singleKpiName" filterable clearable>
                <OptionGroup v-for="(item,key) in singleKpiTypes" :key="key" :label="item.label">
                  <Option
                    v-for="(ite,ke) in item.children"
                    :value="ite.kpiKey"
                    :key="ke"
                  >{{ ite.kpiName }}</Option>
                </OptionGroup>
              </Select>
            </hyz-h-box>
          </div>
          <div v-else>
            <hyz-h-box label="实例类型">
              <Select v-model="singleInstanceModel">
                <Option
                  v-for="(item,key) in singleInstanceList"
                  :value="item.id"
                  :key="key"
                >{{ item.objectName }}</Option>
              </Select>
            </hyz-h-box>
            <hyz-h-box label="指标类型" v-if="singleInstanceModel">
              <Select v-model="singleKpiName" filterable clearable>
                <OptionGroup v-for="(item,key) in singleKpiTypes" :key="key" :label="item.label">
                  <Option
                    v-for="(ite,ke) in item.children"
                    :value="ite.kpiKey"
                    :key="ke"
                  >{{ ite.kpiName }}</Option>
                </OptionGroup>
              </Select>
            </hyz-h-box>
          </div>
          <div>
            <Button type="primary" style="margin-top: 12px; width: 100%;" @click="pushKpiCell">应用</Button>
          </div>
        </div>
        <div v-else-if="!hasResClass">
          <div>
            选择资源类
            <Select filterable v-model="selectResClassId" @on-change="onResClassSelected">
              <Option v-for="res in resClasses" :key="res.id" :value="res.id">{{res.objectName}}</Option>
            </Select>
            <Button
              icon="md-link"
              @click="goBind"
              type="primary"
              style="width: 100%; margin-top: 12px;"
            >绑定实例</Button>
          </div>
        </div>
        <div v-else>
          <h4 style="margin-bottom: 8px; text-align: center;">{{curResLabel}}</h4>
          <Divider style="font-size: 12px;">手动输入编码</Divider>
          <div>
            <hyz-h-box label="楼层" labelWidth="40">
              <span>{{group.parent_name}} / {{group.name}}</span>
            </hyz-h-box>
            <hyz-h-box label="编码" labelWidth="40">
              <Input v-model="serial" @on-change="onSerialChanged"></Input>
            </hyz-h-box>
            <hyz-h-box v-if="group.type === 'floor'" label="区域" labelWidth="40">
              <Select v-model="areaId" @on-change="onAreaChanged">
                <Option v-for="area in areas" :key="area.id" :value="area.id">{{area.name}}</Option>
              </Select>
            </hyz-h-box>
          </div>
          <Divider style="font-size: 12px;">或者</Divider>
          <Button
            icon="md-link"
            @click="goBind"
            type="primary"
            style="width: 100%; margin-top: 12px;"
          >去绑定实例</Button>
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
import TextStyleCmp from "./stylecmp/TextStyleCmp";
import VertexStyleCmp from "./stylecmp/VertexStyleCmp";
import { HyzRegionCascader } from "@components/region";
import DataCook from "@/utils/data-cook";
const { mxConstants, mxUtils, mxCodecRegistry, mxCell, mxPoint } = mxgraph;

export default {
  props: ["graph", "group"],
  components: {
    TextStyleCmp,
    VertexStyleCmp,
    RegionCascader: HyzRegionCascader
  },
  data() {
    return {
      isShow: false,
      hasResClass: true,
      item: {},
      selectResClassId: 0,
      collapseValue: [],
      isBind: false,
      fields: [],
      resClass: {},

      kpiResClass: 0, //指标类型选中的资源类
      kpis: [], //可选指标
      instances: [], //可选实例

      serial: "", //编码
      areaId: "", //区域id

      //摄像头关联车位
      showSetManagerParkingSpace: false,
      startSetManagerParkingSpace: false,
      camera: {},
      pickParkingSpaces: [], //已关联的车位

      //单指标配置列表
      singleKpiList: [],
      singleKpiModel: "",
      singleInstanceList: [],
      singleInstanceModel: "",
      singleKpiCells: [],
      singleKpiCellLabel: "",
      singleKpiTypes: [],
      singleKpiName: "",
      isChildSelect: false
    };
  },
  computed: {
    areas() {
      const rt = this.$store.state.region.list;
      return _.orderBy(_.filter(rt, { parent_id: this.group.id }), "name");
    },
    resClasses() {
      const resList = this.$store.state.resClass.list;
      const rank2List = _.filter(
        resList,
        v => v.rank == 2 && (v.basicClass === "设备" || v.basicClass === "地域")
      );

      return rank2List;
    },
    allResClass() {
      return this.$store.state.resClass.list;
    },
    curResLabel() {
      return _.get(this.item, "data.label", "");
    },
    isKpiType() {
      return _.get(this.item, "data.itemType", "") === "kpi";
    },
    isSingleKpi() {
      return _.get(this.item, "data.itemType", "") === "singleKpi";
    },
    //当前拓扑里已有的资源类
    curResClasses() {
      const res = this.graph.getResClasses();
      const allRes = this.$store.state.resClass.list;
      res.forEach(v => {
        const find = _.find(allRes, { id: parseInt(v.resId) });
        if (find) {
          v.label = _.get(find, "objectName", "");
          v.keyName = _.get(find, "keyName", "");
        }
      });
      return res;
    },
    allCmd() {
      return this.$store.state.command.list;
    },
    allKpis() {
      return this.$store.state.kpi.list;
    }
  },
  watch: {
    isChildSelect(v) {
      if (v) {
        let resClassId = _.get(
          this.singleKpiList,
          "[0].children.[0].data.resourceClassId",
          ""
        );
        this.singleInstanceList = _.filter(this.allResClass, {
          parentId: parseInt(resClassId)
        });
      }
    },
    singleKpiModel(v) {
      if (!v) return;

      if (this.isChildSelect) {
        // let kpiCObj = _.find(this.singleKpiList, { label: v });
        // console.log(kpiCObj);
      } else {
        let kpiCObj = _.find(this.singleKpiList, { label: v });
        let tmp = _.get(kpiCObj, "children", []);
        tmp.forEach(ele => {
          ele.label = ele.data.serial;
        });
        this.singleKpiCells = tmp;
      }
    },

    singleKpiCellLabel(v) {
      if (!v) return;
      let obj = _.find(this.singleKpiCells, { label: v });
      if (_.get(obj, "data.resourceClassId", ""))
        this.singleInstanceList = _.filter(this.allResClass, {
          parentId: parseInt(obj.data.resourceClassId)
        });
    },
    singleInstanceModel(v) {
      if (!v) return;

      this.fetchInstanceKpi(v);
    }
  },
  methods: {
    hide() {
      this.isShow = false;
    },
    setItem(v) {
      this.item = v;
      this.isShow = true;
      this.$nextTick(() => {
        this.$refs.textStyleCmp.init(v);
        this.$refs.vertexStyleCmp.init(v);
      });

      this.serial = _.get(v, "data.serial", "");
      this.areaId = _.get(v, "data.region.region", "");

      if (!this.graph.isCellSelected(v)) {
        this.graph.setSelectionCell(v);
      }
      this.hasResClass = _.get(v, "data.resourceClassId", null);
      const hasBindData = _.get(v, "data.bindData", null);
      this.clearCameraParkingSpace();
      if (hasBindData) {
        this.isBind = true;
        const resId = parseInt(v.data.bindData.resource_class_id);

        //针对停车场摄像头，需要呈现设置管理车位的按钮
        this.showSetManagerParkingSpace = v.data.keyName === "parking_camera";
        if (this.showSetManagerParkingSpace) {
          this.initCameraParkingSpaces();
        }

        const allRes = this.$store.state.resClass.list;
        const resClass = _.find(allRes, { id: resId });
        this.initFields(resClass);
      } else {
        this.isBind = false;
      }

      //初始化指标类型节点
      if (this.isKpiType) {
        this.kpiResClass = _.get(v, "data.resourceClassId", null);
        if (this.kpiResClass) {
          this.onKpiResClassChanged(this.kpiResClass);
        }
      }
      //初始化指标可选设备信息
      if (this.isSingleKpi) {
        this.singleKpiList = this.backSerialCellArr();

        this.singleKpiModel = _.get(v, "data.serialLabel", "");
        this.singleKpiCellLabel = _.get(v, "data.serialTxt", "");
        this.singleInstanceModel = _.get(v, "data.instanceId", "");
        this.singleKpiName = _.get(v, "data.kpiKey", "");
        let cellsModel = this.graph.getModel().cells;
        _.values(cellsModel).forEach(ele => {
          if (!ele.parent && _.get(ele, "isSingleChild", false))
            this.isChildSelect = true;
        });
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
    },

    onKpiResClassChanged(v) {
      this.queryKpis(v);
      const crc = _.find(this.curResClasses, { resId: v });

      //已有的
      const subCells = this.graph.model.getChildren(this.item);

      const instances = _.get(crc, "instances", []);
      let relIns = [];
      instances.forEach(ins => {
        const find = _.find(subCells, sc => {
          return _.get(sc, "data.id", "") == ins.id;
        });
        relIns.push({ ...ins, checked: find ? true : false });
      });

      this.instances = relIns;

      this.item.data.resourceClassId = v;
    },
    fetchInstanceKpi(v) {
      this.$http({
        method: "post",
        url: "execution/v1/execution/businessSqls/execBusinessSql",
        showSpin: false,
        data: {
          keyName: "queryKpiByResourceClassId",
          params: {
            resoureClassId: v
          }
        }
      }).then(res => {
        let arr = _.get(res, "list", []);
        if (arr.length < 1) return this.$Message.warning("未查询出KPI");

        arr = DataCook.objectListFormat(arr, {
          rule: {
            commonGroupId: "{{common_group_id}}",
            kpiKey: "{{kpi_key}}",
            kpiName: "{{kpi_name}}",
            kpiType: "{{kpi_type}}",
            unit: "{{unit}}",
            id: "{{id}}"
          }
        });

        let arrGroups = _.groupBy(arr, "kpiType");
        let tmp = [];
        _.keys(arrGroups).forEach(ele => {
          tmp.push({ label: ele, children: arrGroups[ele] });
        });
        this.singleKpiTypes = tmp;
        console.log(tmp);
      });
    },

    onSerialChanged(evt) {
      if (this.item.data) {
        this.item.data.serial = this.serial.replace(/ /g,"");
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

    //查询指标信息
    queryKpis(resourceClassId) {
      //根据资源类id获取资源实例
      if (resourceClassId) {
        const id = parseInt(resourceClassId);
        this.$http({
          method: "POST",
          url: "resource/v1/resource/commandTemplates/list",
          data: {
            searchParas: {
              conditions: [{ name: "resourceClassId", op: "eq", value: id }]
            }
          },
          showSpin: false
        }).then(result => {
          const cmds = _.get(result, "list", []);
          const kpis = _.uniqBy(_.map(cmds, "kpi"), "id");

          const subCells = this.graph.model.getChildren(this.item);
          //检测是否已选
          kpis.forEach(kpi => {
            const find = _.find(
              subCells,
              sc => _.get(sc, "data.id", "") == kpi.kpiKey
            );
            kpi.checked = find ? true : false;
          });
          const grouped = _.groupBy(kpis, "kpiType");
          const groupKpis = [];
          const keys = _.keys(grouped);
          keys.forEach(key => {
            groupKpis.push({
              name: key,
              value: grouped[key]
            });
          });
          this.kpis = groupKpis;
          //默认全展开
          this.$nextTick(() => {
            this.collapseValue = keys;
          });
        });
      }
    },

    applyKpi() {
      const flattenKpis = _.flatten(_.map(this.kpis, "value"));
      const checkedKpis = _.filter(flattenKpis, v => v.checked);
      const checkedInstances = _.filter(this.instances, v => v.checked);

      //清空之前的
      const subCells = this.graph.model.getChildren(this.item);
      if (subCells) this.graph.removeCells(subCells);
      this.graph.model.setStyle(this.item, "");
      const { width: cellWidth, height: cellHeight } = this.item.geometry;

      const style = "text;html=1;fillColor=#ffffff;overflow=fill;rounded=0;";
      this.item.style = style;

      let txtHtml = "";
      const w = cellWidth / (checkedInstances.length + 1);
      const h = cellHeight / (checkedKpis.length + 1);
      //先创建实例的文本信息
      txtHtml += `<tr><td></td>`;

      checkedInstances.forEach((ins, i) => {
        txtHtml += "<td>" + ins.name + "</td>";
      });
      txtHtml += `</tr>`;

      //指标创建
      checkedKpis.forEach((kpi, i) => {
        txtHtml += `<tr>`;

        let inkName = "-";
        if (kpi.kpiType == "CTM") {
          inkName = `<button class="ctm-vertex-btn">执行</button>`;
        }
        txtHtml += "<td>" + kpi.kpiName + "</td>";

        //再创建指标+实例的节点
        checkedInstances.forEach((ins, j) => {
          txtHtml += "<td><div class='ctm-vertex'>" + inkName + "</div></td>";
        });
        txtHtml += `</tr>`;
      });

      this.graph.model.setValue(this.item, this.cellHtmlCreate(txtHtml));
      this.graph.model.setStyle(
        this.item,
        mxUtils.setStyle(
          this.graph.model.getStyle(this.item),
          mxConstants.STYLE_EDITABLE,
          0
        )
      );

      this.item.data["checkedInstances"] = checkedInstances;
      this.item.data["checkedKpis"] = checkedKpis;
      this.item.data["isKpi"] = true;
      this.graph.refresh();
    },
    pushSelectCell() {
      if (
        !(
          this.singleKpiModel &&
          this.singleKpiCellLabel &&
          this.singleInstanceModel &&
          this.singleKpiName
        )
      )
        return this.$Message.warning("请保证设备及指标选择完整");

      let cellObj = _.find(this.singleKpiCells, {
        label: this.singleKpiCellLabel
      });
      let kpiObj = _.find(this.allKpis, { kpiKey: this.singleKpiName });
      this.item.data["isSingleKpi"] = true;
      this.item.data["serialTxt"] = cellObj.data.serial;
      this.item.data["serialKeyName"] = cellObj.data.keyName;
      this.item.data["serialLabel"] = cellObj.data.label;
      this.item.data["instanceId"] = this.singleInstanceModel;
      this.item.data["kpiKey"] = kpiObj.kpiKey;
      this.item.data["kpiType"] = kpiObj.kpiType;
      this.item.data["kpiName"] = kpiObj.kpiName;
      this.item.data["kpiInfo"] = kpiObj;
      this.item.data["kpiLabel"] = kpiObj.kpiName;
      this.graph.model.setValue(
        this.item,
        `<div>` +
          cellObj.data.serial +
          `</div><div>` +
          kpiObj.kpiName +
          "</div>"
      );
      this.graph.refresh();
      this.$Message.success("设置成功");
    },
    pushSelectChild() {
      if (!(this.singleInstanceModel && this.singleKpiName))
        return this.$Message.warning("请保证设备及指标选择完整");

      let cellObj = _.get(this.singleKpiList, "[0].children.[0]", "");

      let kpiObj = _.find(this.allKpis, { kpiKey: this.singleKpiName });
      this.item.data["isSingleKpi"] = true;
      this.item.data["serialTxt"] = _.get(cellObj, "data.serial", "");
      this.item.data["serialKeyName"] = cellObj.data.keyName;
      this.item.data["serialLabel"] = cellObj.data.label;
      this.item.data["instanceId"] = this.singleInstanceModel;
      this.item.data["kpiKey"] = kpiObj.kpiKey;
      this.item.data["kpiType"] = kpiObj.kpiType;
      this.item.data["kpiName"] = kpiObj.kpiName;
      this.item.data["kpiInfo"] = kpiObj;
      this.item.data["kpiLabel"] = kpiObj.kpiName;
      this.graph.model.setValue(
        this.item,
        `<div>` + cellObj.data.label + `</div><div>` + kpiObj.kpiName + "</div>"
      );

      this.setSingleChild();
      this.graph.refresh();
      this.$Message.success("设置成功");
    },
    pushKpiCell() {
      if (!this.isChildSelect) return this.pushSelectCell();
      return this.pushSelectChild();
    },
    setSingleChild() {
      let cellsModel = this.graph.getModel().cells;
      _.values(cellsModel).forEach(ele => {
        if (!ele.parent) ele.isSingleChild = true;
      });
    },

    cellHtmlCreate(html) {
      let txtHtml = `<table border="1" class="kpipane">`;
      txtHtml += html;
      txtHtml += `</table>`;

      return txtHtml;
    },

    onResClassSelected(v) {
      const resClass = _.find(this.resClasses, { id: v });
      const data = {
        label: resClass.objectName,
        keyName: resClass.keyName,
        tableName: resClass.storageTableName,
        type: "vertex",
        resourceClassId: v,
        isExtendClass: true
      };
      this.item.data = data;
    },
    goBind() {
      this.$emit("on-bind", this.item);
    },

    updatePosition(v) {
      this.$refs.vertexStyleCmp.updatePosition(v);
    },
    updateSize(v) {
      this.$refs.vertexStyleCmp.updateSize(v);
    },

    //设置相邻定位点
    setAdjSpot() {
      this.$emit("start-set-adjacents", this.item);
    },

    //当选中时摄像头时，高亮它所管理的车位
    initCameraParkingSpaces() {
      this.pickParkingSpaces = [];
      this.camera = this.item.data.bindData;
      const { first, second, third } = this.camera;
      const pos = [first, second, third];
      pos.forEach(ps => {
        if (ps) {
          this.toggleHighlightParkingSpace(ps, true);
          const cell = this.graph.model.getCell(ps);
          this.pickParkingSpaces.push(cell);
        }
      });
    },

    //高亮/取消车位
    toggleHighlightParkingSpace(id, isHighlight) {
      const ps = this.graph.model.getCell(id);
      if (ps) {
        const style = this.graph.model.getStyle(ps);
        const newStyle = mxUtils.setStyle(
          style,
          mxConstants.STYLE_FILLCOLOR,
          isHighlight ? "#ff0000" : "#fff"
        );
        this.graph.model.setStyle(ps, newStyle);
      }
    },

    //清空摄像头管理车位
    clearCameraParkingSpace() {
      this.pickParkingSpaces.forEach((ps, i) => {
        this.toggleHighlightParkingSpace(ps.id, false);
      });
      this.pickParkingSpaces = [];
    },

    //设置管理车位
    setManagerParkingSpace() {
      // this.graph.setCellStyle()
      this.graph.changeStyle(
        true,
        [mxConstants.STYLE_IMAGE_BORDER],
        ["#ff0000"]
      );

      this.item.data.cameraRelateParkingSpaceMode = true;
      this.startSetManagerParkingSpace = true;
      this.camera = this.item.data.bindData;
      this.graph.toggleCameraRelateParkingSpaceMode(true);
    },

    setPickParkingSpaces(ps) {
      const pos = ["first", "second", "third"];
      //先置空
      pos.forEach(p => {
        this.camera[p] = "";
      });

      const index = _.findIndex(
        this.pickParkingSpaces,
        v => v.data.bindData.id == ps.data.bindData.id
      );
      if (index > -1) {
        this.graph.changeStyle(
          true,
          [mxConstants.STYLE_FILLCOLOR],
          ["#ffffff"]
        );
        this.pickParkingSpaces.splice(index, 1);
      } else {
        if (this.pickParkingSpaces.length > 3) {
          this.$Message.info("最多只能关联3个");
        } else {
          this.graph.changeStyle(
            true,
            [mxConstants.STYLE_FILLCOLOR],
            ["#ff0000"]
          );
          this.pickParkingSpaces.push(ps);
        }
      }

      this.pickParkingSpaces.forEach((ps, i) => {
        this.camera[pos[i]] = ps.id;
      });
    },

    cancelSetMgrParkingSpace() {
      const style = this.graph.model.getStyle(this.item);
      const newStyle = mxUtils.setStyle(
        style,
        mxConstants.STYLE_IMAGE_BORDER,
        "#none"
      );
      this.graph.model.setStyle(this.item, newStyle);

      this.clearCameraParkingSpace();

      this.startSetManagerParkingSpace = false;
      this.item.data.cameraRelateParkingSpaceMode = false;
      this.graph.toggleCameraRelateParkingSpaceMode(false);

      this.graph.clearSelection();
      this.hide();
    },

    //保存管理车位，调停车场摄像头更新接口即可
    saveCameraParkingSpace() {
      this.$http({
        method: "post",
        url: "resource/v1/resource/dynamicTables",
        data: {
          resourceClassId: this.camera.resource_class_id,
          data: [this.camera]
        }
      }).then(result => {
        this.cancelSetMgrParkingSpace();
        //更新绑定拓扑元素
        this.$emit("save-success", result);
      });
    },

    backSerialCellArr() {
      let cellsModel = this.graph.getModel().cells;
      let cellsGroups = _.groupBy(cellsModel, "data.label");
      let arr = [];

      _.keys(cellsGroups).forEach(ele => {
        if (ele) {
          let tmp = cellsGroups[ele];
          if (_.get(tmp, "[0].data.isExtendClass", false))
            arr.push({
              label: ele,
              children: cellsGroups[ele]
            });
        }
      });

      return arr;
    },
    backKpiTypeArr() {
      let arr = [];
      let groups = _.groupBy(this.allKpis, "kpiType");
      let keys = _.keys(groups);
      keys.forEach(ele => {
        arr.push({
          label: ele,
          children: groups[ele]
        });
      });
      return arr;
    }
  }
};
</script>
 <style lang="less">
.kpipane {
  width: 100%;
  height: 100%;
  border: 1px solid #0cbdcd;
  border-collapse: collapse;
  background: rgba(255, 255, 255, 0.3);

  th {
    border: 1px solid #0cbdcd;
  }
  td {
    border: 1px solid #0cbdcd;
  }
}
.ctm-vertex {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2px 3px;
  text-align: center;
  &-btn {
    width: 100%;
    height: 100%;
    text-align: center;
    background: #48c6d4;
    border: none;
    cursor: pointer;
    cursor: hand;
  }
}
</style>
