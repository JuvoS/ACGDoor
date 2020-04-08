<template>
  <div class="alarm-tip-list">
    <hyz-h-box class="row">
      <Tooltip class="lv1" content="严重告警">
        <div @click="openAlarmList(1)">严重{{alarmTip.lv1}}</div>
      </Tooltip>
      <Tooltip class="lv2" content="重要告警">
        <div @click="openAlarmList(2)">重要{{alarmTip.lv2}}</div>
      </Tooltip>
      <Tooltip class="lv3" content="次要告警">
        <div @click="openAlarmList(3)">次要{{alarmTip.lv3}}</div>
      </Tooltip>
      <Tooltip class="lv4" content="警告告警">
        <div @click="openAlarmList(4)">警告{{alarmTip.lv4}}</div>
      </Tooltip>
    </hyz-h-box>
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
 * ##告警标签列表##
 * **Props**
 *  + resourceId; 资源ID
 *  + alarmTip; 告警提示对象
 *
 * **API**
 *
 * **Event**
 *
 * @author Chorin <xiaolinxuan@foxmail.com>
 * @date 2019-10-31
 */
import AlarmTable from "@components/alarm/lib/AlarmObjectList.vue";
export default {
  name: "AlarmTipList",
  components: {
    AlarmTable
  },
  props: {
    resourceId: {
      type: String,
      default: ""
    },
    alarmTip: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      isShowAlarmList: false
    };
  },
  methods: {
    /**
     * 打开告警列表
     * @returns {void}
     * @author Chorin <xiaolinxuan@foxmail.com>
     * @date 2019-10-31
     */
    openAlarmList(severity) {
      let options = [
        {
          value: this.resourceId,
          op: "equals",
          name: "objectId"
        },
        {
          value: severity,
          op: "equals",
          name: "severity"
        }
      ];
      this.$refs.alarmTable.showByObject(options);
      this.isShowAlarmList = true;
    },

    /**
     * 清除告警后
     */
    clearedAlarmHandler(message = {}) {
      let { severity } = message;
      let no = parseInt(this.alarmTip["lv" + severity]) - 1;
      this.alarmTip["lv" + severity] = no;
    }
  }
};
</script>
<style lang="less" scoped>
.lv-base {
  border-radius: 4px;
  width: 60px;
  text-align: center;
  color: #fff;
  margin: 2px;
}
.lv1 {
  .lv-base;
  background-color: #ef5350;
  cursor: pointer;
}
.lv2 {
  .lv-base;
  background-color: #ffa726;
  cursor: pointer;
}
.lv3 {
  .lv-base;
  background-color: #ffee58;
  color: #aaa;
  cursor: pointer;
}
.lv4 {
  .lv-base;
  background-color: #42a5f5;
  cursor: pointer;
}
</style>