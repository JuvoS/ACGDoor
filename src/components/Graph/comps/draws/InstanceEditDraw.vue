<template>
  <div>
    <SaveDrawer
      ref="saveDrawer"
      api="resource/v1/resource/dynamicTables"
      :resClass="resClass"
      @on-save-success="onSaveSuccess"
      @on-delete="onDelete"
    />
  </div>
</template>

<script>
import {
  FIELD_STATE,
  DISPLAY_TYPE
} from "@components/formdesigner/lib/defines.js";
import { setFieldValue } from "@components/formdesigner/lib/helper.js";
import uid from "@/utils/uid";

export default {
  props: ["item", "graph", "parkingLot"],
  components: {
    SaveDrawer: () => import("@components/formdesigner/lib/crud/SaveDrawer")
  },
  data() {
    return {
      isShow: false,
      resClass: {}
    };
  },
  computed: {
    resClasses() {
      return _.cloneDeep(this.$store.state.resClass.list);
    }
  },
  methods: {
    getFields(resClass) {
      if (!resClass) return;
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

      // let showFields = allFields.filter(v => v.listDisplay);
      // let addNeedFields = allFields.filter(v => v.addIsShow);

      let fields = _.cloneDeep(allFields);
      fields.forEach(col => {
        col.attributeGroup = col.attributeGroup || "基础属性";
        col.display = DISPLAY_TYPE.vertical;

        const isChecked = _.get(col, "checked", true);
        if (isChecked) {
          col.state = col.addIsShow
            ? col.addIsRequired
              ? FIELD_STATE.required
              : FIELD_STATE.editable
            : FIELD_STATE.hidden;
        } else {
          col.state = FIELD_STATE.hidden;
        }

        if (col.columnKey === "type") {
          //类型默认自动加
          col.value = resClass.keyName;
          col.state = FIELD_STATE.disabled;
        }
      });
      return fields;
    },
    add(rc) {
      this.$http({
        method: "get",
        url: "resource/v1/resource/resourceClasss/" + rc.id,
        showSpin: false
      }).then(resClass => {
        this.resClass = resClass;
        this.doNoramlDraw();
      });
    },
    doNoramlDraw() {
      const fields = this.getFields(this.resClass);

      //如果是地域组态，初始化地域信息
      const itemType = _.get(this.item, "type", "");
      if (itemType === "floor") {
        const regionField = _.find(fields, { columnKey: "region" });
        if (regionField) {
          const regionData = {
            region: this.item.id,
            region_name: this.item.name,
            region_full_id: `${this.item.parent_id},${this.item.id}`,
            region_full_name: `${this.item.parent_name} / ${this.item.name}`
          };
          setFieldValue(regionField, regionData);
        }

        const buildingIdField = _.find(fields, { columnKey: "building_id" });
        if (buildingIdField) {
          setFieldValue(buildingIdField, { building_id: this.item.parent_id });
        }
        const floorIdField = _.find(fields, { columnKey: "floor_id" });
        if (floorIdField) {
          setFieldValue(floorIdField, { floor_id: this.item.id });
        }
        const parentIdField = _.find(fields, { columnKey: "parent_id" });
        if (parentIdField) {
          setFieldValue(parentIdField, { parent_id: this.item.id });
        }

        const parentNameField = _.find(fields, { columnKey: "parent_name" });
        if (parentNameField) {
          setFieldValue(parentNameField, { parent_name: this.item.name });
        }
      }

      //特殊处理
      switch (this.resClass.storageTableName) {
        case "d_lpgs_two_dimension_code_1": //定位点
        case "d_parking_space_1": //停车位
        case "d_parking_camera_1": //摄像头
          let sfieldsKeys = [
            "parking_lot_id",
            "parking_lot_name",
            "unique_key",
            "x",
            "y",
            "point1x",
            "point1y"
          ];
          let sfields = _.filter(fields, v =>
            sfieldsKeys.includes(v.columnKey)
          );
          const cell = this.graph.getSelectionCell();
          let initData = {
            parking_lot_id: this.parkingLot.id,
            parking_lot_name: this.parkingLot.name,
            unique_key: "",
            x: cell.geometry.x,
            y: cell.geometry.y,
            //停车位用中心点来存
            point1x: cell.geometry.x + cell.geometry.width / 2,
            point1y: cell.geometry.y + cell.geometry.height / 2
          };
          sfields.forEach(field => setFieldValue(field, initData));
          break;
        default:
          break;
      }

      this.$nextTick(() =>
        this.$refs.saveDrawer.show({ type: this.resClass.keyName }, fields)
      );
    },

    edit(cellData, resClass) {
      const { bindData } = cellData;
      const resId = bindData.resource_class_id || bindData.resourceClassId;
      this.resClass = resClass;

      const fields = this.getFields(this.resClass);
      fields.forEach(field => {
        if (bindData.hasOwnProperty(field.columnKey)) {
          setFieldValue(field, bindData);
          //如果类型没有，自动填充
          if (field.columnKey === "type" && !bindData.type) {
            field.value = this.resClass.keyName;
          }
        }
      });

      //如果是地域组态，初始化地域信息
      const itemType = _.get(this.item, "type", "");
      if (itemType === "floor") {
        const regionField = _.find(fields, { columnKey: "region" });
        if (regionField) {
          const fullIds = _.get(regionField, "children[1].value", "");
          if (fullIds) {
            const [building_id, floor_id, area_id] = fullIds;
            const buildingIdField = _.find(fields, {
              columnKey: "building_id"
            });
            if (buildingIdField) {
              setFieldValue(buildingIdField, {
                building_id
              });
            }
            const floorIdField = _.find(fields, { columnKey: "floor_id" });
            if (floorIdField) {
              setFieldValue(floorIdField, { floor_id });
            }
            const areaIdField = _.find(fields, { columnKey: "area_id" });
            if (areaIdField) {
              setFieldValue(areaIdField, { area_id });
            }
            const parentIdField = _.find(fields, {
              columnKey: "parent_id"
            });
            if (parentIdField) {
              setFieldValue(parentIdField, { parent_id: this.item.id });
            }

            const parentNameField = _.find(fields, {
              columnKey: "parent_name"
            });
            if (parentNameField) {
              setFieldValue(parentNameField, {
                parent_name: this.item.name
              });
            }
          }
        }
      }

      //定位点、停车位位置更新
      if (
        this.resClass.storageTableName == "d_lpgs_two_dimension_code_1" ||
        this.resClass.storageTableName == "d_parking_space_1" ||
        this.resClass.storageTableName == "d_parking_camera_1"
      ) {
        const cell = this.graph.getSelectionCell();

        const xField = _.find(fields, { columnKey: "x" });
        if (xField) {
          setFieldValue(xField, { x: cell.geometry.x });
        }
        const yField = _.find(fields, { columnKey: "y" });
        if (yField) {
          setFieldValue(yField, { y: cell.geometry.y });
        }
        const point1xField = _.find(fields, { columnKey: "point1x" });
        if (point1xField) {
          setFieldValue(point1xField, {
            point1x: cell.geometry.x + cell.geometry.width / 2
          });
        }
        const point1yField = _.find(fields, { columnKey: "point1y" });
        if (point1yField) {
          setFieldValue(point1yField, {
            point1y: cell.geometry.y + cell.geometry.height / 2
          });
        }
      }

      this.$nextTick(() => this.$refs.saveDrawer.show(bindData, fields));
    },

    onSaveSuccess(v) {
      if (v) {
        this.$emit("save-success", v);
      }
    },
    onDelete(item) {
      this.$http({
        method: "delete",
        url: `resource/v1/resource/dynamicTables`,
        data: {
          ids: [item.id],
          resourceClassId: item.resource_class_id
        }
      }).then(result => {
        this.$refs.saveDrawer.hide();
        this.$emit("on-delete-instance", item);
      });
    }
  }
};
</script>

<style>
</style>