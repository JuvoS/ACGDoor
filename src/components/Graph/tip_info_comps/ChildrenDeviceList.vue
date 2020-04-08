<template>
  <div class="children-device-list">
    <ChildrenDeviceView :childrenList="childrenList" :parentResource="parentResource" :alarmIntro="alarmIntro">
      <template #childrenContent="{children, index}">
        <div v-show="children.pmData.length == 0">-</div>
        <div
          class="child-pm"
          v-for="(kd, kdIndex) in children.pmData"
          :key="kd.type"
          v-show="kdIndex < 1"
          @click="kd.kpi_type === KPIConstant.KPI_TYPE.PM && openKPITrend(children.resourceId, kd.kpi_key, kd.kpi_name,kd.kpi_unit, parentResource.serial + ' ' + children.resourceData.name, parentResource.id)"
        >
          <label>{{kd.kpi_name | maxLength(14)}}</label>
          <div class="value-box" :class="{'pm-cannot-click': kd.kpi_type === KPIConstant.KPI_TYPE.CM}">
            <template v-if="kd.escape_mode === KPIConstant.ESCAPE_MODE.DISABLE">
              <span class="value">{{kd.value || 0 | number(1)}}</span>
              <span class="unit">{{kd.unit}}</span>
            </template>
            <template v-else>
              <span class="value">{{KPIConstant.CM[kd.value] || kd.value}}</span>
              <span class="unit">{{kd.unit}}</span>
            </template>
          </div>
        </div>
      </template>
    </ChildrenDeviceView>

    <!-- KPI趋势图Modal -->
    <KPITrendModal ref="kpiTrendModal" />
    <!-- KPI趋势图Modal-END -->
  </div>
</template>
<script>
/**
 * ##子设备列表内容##
 *
 * **Props**
 *
 * **API**
 *
 * **Event**
 *
 * @author Chorin <xiaolinxuan@foxmail.com>
 * @date 2019-11-02
 */
import KPIConstant from "@/views/resource/kpi/KPIConstant.js";
import KPITrendModal from "@/views/resource/kpi/KPITrendModal.vue";
import TipInfoBase from "../TipInfoBase";
import ChildrenDeviceView from "./ChildrenDeviceView";
export default {
  name: "ChildrenDeviceList",
  components: {
    KPITrendModal,
    ChildrenDeviceView
  },
  props: {
    childrenList: {
      type: Array,
      default: () => []
    },
    parentResource: {
      type: Object,
      default: () => {
        return {}
      }
    },    
    alarmIntro: {
      type: Object,
      default: () => {
        return {}
      }
    },
  },
  watch: {},
  data() {
    return {
      KPIConstant: KPIConstant,
      tipInfoBase: new TipInfoBase(this)
    };
  },
  methods: {
    /**
     * 打开设备详情
     */
    openDetail(resource) {
      const { id, resource_class_id } = resource;
      window.open(
        `${location.protocol}//${location.hostname}:${location.port}/ibms#/resDetail?id=${id}&&resClassId=${resource_class_id}`,
        "_blank"
      );
    },

    /**
     * 打开指标趋势图
     * @param {String} resourceId 资源ID
     * @param {String} kpiId 指标ID
     * @returns {void}
     * @author Chorin <xiaolinxuan@foxmail.com>
     * @date 2019-10-09
     */
    openKPITrend(resourceId, kpiKey, kpiName = "", unit, resourceName = "", joinResourceId) {
      console.log(this.childrenList, this.parentResource);
      this.$refs.kpiTrendModal.open({
        kpiKey: kpiKey,
        resourceId: resourceId,
        resourceName: resourceName,
        kpiName: kpiName,
        unit: unit,
        joinResourceId,
      });
    }
  }
};
</script>
<style lang="less" scoped>
.child-pm {
  
  cursor: pointer;
  display: inline-block;
  padding: 0 0 0 4px;
  line-height: 1.5em;
  margin-right: 4px;
  border-radius: 2px;
  background-color: #0cbabd;
  > label {
    padding: 0 4px 0 0;
  }
  .value-box {
    display: inline-block;
    padding: 0 8px 0 2px;
    border-radius: 2px;
    background-color: #c47c40;
    font-weight: bold;
    .value {
      font-family: Digital;
      margin: 0 4px;
      font-size: 12px;
      color: #ffffff;
    }
    .unit {
      font-size: 10px;
      color: #ffffff;
    }
  }
}

.pm-cannot-click{
  background-color: #d1a96d !important;
  cursor: default  !important; 
}
</style>