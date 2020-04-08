<template>
  <div class="children-device-view" v-show="childrenList.length > 0">
    <hyz-v-box class="row children-content" >
      <div class="children-list" v-for="(children, index ) in childrenList" :key="'children_'+index">
        <div class="name" :style="'width:' + childrenNameBoxWidth + 'px'">
          <img v-imgtrans :src="tipInfoBase.getResourceIcon(children.resourceData.resource_class_id)" />
          {{children.resourceData.name | maxLength(14)}}
        </div>
        <div class="context" >
          <slot name="childrenContent" :children="children" :index="index"></slot>
        </div>
        <div class="more can-click" >
          <div class="alarm-icon" @click="openAlarmList(children.resourceData.id)">
            <img  :src="getMaxSeverityImage(children.resourceData.id)"/>
          </div>
          <Icon type="md-more" size="18"  @click="openDetail(children.resourceData)"/>
        </div>
      </div>
    </hyz-v-box>
    <Modal
      v-model="isShowAlarmList"
      :footer-hide="true"
      width="1000"
      class-name="vertical-center-modal modal-dark modal-dark-deep"
    >
      <p slot="header" style="color:#fff">
        <Icon type="ios-information-circle"></Icon>
        <span>告警列表</span>
      </p>
      <alarm-table ref="alarmTable" @on-clear-alarm="clearedAlarmHandler"></alarm-table>
    </Modal>
  </div>
</template>
<script>
/**
 * ##子设备列表##
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
import TipInfoBase from "../TipInfoBase";
import AlarmTable from "@components/alarm/lib/AlarmObjectList.vue";
export default {
  name: "ChildrenDeviceView",
  components: {
    AlarmTable,
  },
  props: {
    childrenList: {
      type: Array,
      default: () => [],
    },
    parentResource: {
      type: Object,
      default: () => {
        return {};
      },
    },
    alarmIntro: {
      type: Object,
      default: () => {
        return {};
      },
    }
  },
  watch: {
    childrenList(v){
      //计算子设备名称的最长宽度，进行动态分配宽度
      this.childrenNameBoxWidth = this.tipInfoBase.childrenNameMaxWidth(v);
    }
  },
  data(){
    return {
      tipInfoBase: new TipInfoBase(this),
      childrenNameBoxWidth: 120,
      isShowAlarmList: false,
    }
  },
  methods:{
    /**
     * 获取最高等级图片
     * @returns {void}
     * @author Chorin <xiaolinxuan@foxmail.com>
     * @date 2019-12-17
     */
    getMaxSeverityImage(id){
      let maxSeverity =  id in this.alarmIntro? this.alarmIntro[id].maxSeverity: "";
      let src =  'static/mxgraph/images/alarm/lv' + maxSeverity + '.gif';
      return src;
    },

    /**
     * 打开设备详情
     */
    openDetail(resource){
      const { id, resource_class_id } = resource;
      window.open(
        `${location.protocol}//${location.hostname}:${location.port}/ibms#/resDetail?id=${id}&&resClassId=${resource_class_id}`,
        "_blank"
      );
    },

        /**
     * 打开告警列表
     * @returns {void}
     * @author Chorin <xiaolinxuan@foxmail.com>
     * @date 2019-10-31
     */
    openAlarmList(id, severity) {
      let options = [{
          value: id,
          op: "equals",
          name: "objectId"
        }];
      this.$refs.alarmTable.showByObject(options);
      this.isShowAlarmList = true;
    },

    /**
     * 清除告警后
     */
    clearedAlarmHandler(message = {}) {
      let { severity } = message;
      //TODO: 清除逻辑
      // let no = parseInt(this.alarmTip["lv" + severity]) - 1;
      // this.alarmTip["lv" + severity] = no;
    }



  }
}
</script>
<style lang="less" scoped>
  .can-click{
    cursor: pointer;
  }
  .children-device-view{
    .row {
      margin-top: -8px;
      flex-wrap: wrap;
    }
    .children-content {
      overflow-y: scroll;
      margin-bottom: 8px;
      max-height: 410px;
    }
    .children-list:first-child {
      margin-top: 8px;
    }
    .children-list {
      height: 30px;
      line-height: 30px;
      border-top: 1px solid fade(#0cbabd, 80%);
      > div {
        display: inline-block;
      }
      .name {
        > img {
          vertical-align: middle;
          margin-left: 4px;
          height: 20px;
          min-width: 20px;
        }
      }
      .context {
        vertical-align: top;
        min-width: 220px;
        height: 100%;
        padding-left: 8px;
      }
      .more {
        width: 40px;
        float: right;
        .alarm-icon{
          display: inline-block;
          height: 30px;
          >img{
            height: 16px;
            width: 16px;
          }
        }
      }

    }
    .children-list:nth-child(odd) {
      background-color: fade(#0cbabd, 30%);
    }
    .children-list:hover {
      background-color: fade(#0cbabd, 80%);
    }
    .children-list:last-child {
      border-bottom: 1px solid fade(#0cbabd, 80%);
    }
  }
</style>