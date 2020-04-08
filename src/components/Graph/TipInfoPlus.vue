<template>
  <div class="tip-info-plus">
    <TipInfo
      ref="tip"
      :alarmIntro="alarmIntro"
      :pmData="pmData"
      :ctmData="ctmData"
      :cmData="cmData"
      :graph="graph"
      :childrenList="childrenList"
      :resourceData="resourceData"
      :isDrill="isDrill"
      @on-click="clickHandler"
      @on-hide="hideHandler"
      @on-drill="drillHanlder"
      @on-close="closeHandler"
      @on-operation="operationHandler"
    >
      <template slot="content">
        <slot name="content"></slot>
      </template>
    </TipInfo>
  </div>
</template>
<script>
/**
 * ##信息面板升级版##
 * 简单调用
 *
 * **Props**
 *  + resourceId; 资源ID
 *
 * **API**
 *  + open; 打开小信息面板
 *  + hide; 关闭小信息面板
 *
 * **Event**
 *  + on-click;
 *  + on-hide;
 *  + on-drill;
 *  + on-operation; 执行的控制操作
 *
 * @author Chorin <xiaolinxuan@foxmail.com>
 * @date 2019-12-05
 */
import TipInfo from "./TipInfo";
import Timer from "@/utils/timer";
import AlarmBase from "@components/alarm/lib/AlarmBase";
import DataCook from "@/utils/data-cook";
export default {
  name: "TipInfoPlus",
  components: {
    TipInfo
  },
  props: {
    graph: {
      type: Object,
      required: true
    },
    isDrill: {
      type: Boolean,
      default: true
    }
  },
  watch: {},
  data() {
    return {
      alarmBase: new AlarmBase(this),
      currentTipInfoReourceId: "",
      pmData: [],
      ctmData: [],
      cmData: [],
      childrenList: [],
      resourceData: {},
      alarmIntro: {}, /// alarmData数据不可靠，改用从接口单独查询
    };
  },
  methods: {
    // /**
    //  * 打开小信息面板
    //  * @returns {void}
    //  * @author Chorin <xiaolinxuan@foxmail.com>
    //  * @date 2019-12-05
    //  */
    // open(options = {}) {
    //   this.initView(options.mxEvent);
    // },

    /**
     * 打开小信息面板
     * @param {Object} options 选项
     * @param {mxEventObject} options.mxEvent
     * 若是虚拟事件可用 new mxEventObject("click", "cell", cell, "event", event);
     * 其中 event 类型为 MouseEvent, new MouseEvent("mouseup", {...});
     * @returns {void}
     * @author Chorin <xiaolinxuan@foxmail.com>
     * @date 2019-12-05
     */
    open(options = {}) {
      this.initView(options.mxEvent);
    },

    /**
     * 关闭小信息面板
     * @returns {void}
     * @author Chorin <xiaolinxuan@foxmail.com>
     * @date 2019-12-05
     */
    hide() {
      let tipInfoInstance = this.getTipInfoInstance();
      tipInfoInstance.hide();
    },

    /**
     *  初始化界面
     * @param {String} mxEvent mxGraph事件
     * @returns {void}
     * @author Chorin <xiaolinxuan@foxmail.com>
     * @date 2019-12-05
     */
    initView(mxEvent) {
      // console.log("#### mxEvent", mxEvent);
      let tipInfoInstance = this.getTipInfoInstance();
      let cell = mxEvent.getProperty("cell");
      let { offsetX, offsetY } = mxEvent.getProperty("event");
      let id = _.get(cell, "id", null);
      let bindData = _.get(cell, "data.bindData", null);
      if (!bindData) {
        return;
      }
      this.currentTipInfoReourceId = id;
      tipInfoInstance.move(offsetX, offsetY);
      this.resourceData = bindData;
      this.getOverviewStats(id)
        .then(res => {
          console.log("#### 返回 res.resourceData", res.resourceData);
          //针对被实例化但是没有数据的资源
          res.resourceData = res.resourceData || bindData;
          //用户在在等待的时候关闭，回调之后就不显示
          if (this.currentTipInfoReourceId != res.resourceData.id) {
            return;
          }
          console.log("#### 最终 res.resourceData", res.resourceData);
          //如果有实例的情况下才进行处理
          res = res || {};
          res.pmData = res.pmData || [];
          res.cmData = res.cmData || [];
          res.pmData.push(...res.cmData);

          this.childrenList = res.children || []; //先赋值子设备，用于计算信息面板高度
          this.resourceData = res.resourceData || {};
          this.pmData = res.pmData;
          this.ctmData = res.ctmData || [];
          return Timer.inTheEnd();
        })
        .then(() => {
          if (cell && cell.vertex) {
            tipInfoInstance.show(cell, offsetX, offsetY);
          } else {
            tipInfoInstance.hide();
          }
          let resourceIdArray = [this.resourceData.id];
          resourceIdArray.push(...DataCook.extractor(this.childrenList, "resourceId"));
          return this.getNewAlarmIntroMap(resourceIdArray);
        })
        .then(newAlarmIntroMap =>{
          this.alarmIntro = newAlarmIntroMap;
        });
    },

    /**
     * 获取告警信息
     * @returns {void}
     * @author Chorin <xiaolinxuan@foxmail.com>
     * @date 2019-12-17
     */
    async getNewAlarmIntroMap(resourceIdArray){
      return this.alarmBase.getNewAlarmIntroMap(resourceIdArray)
    },

    /**
     * 获取信息面板实例
     * @returns {void}
     * @author Chorin <xiaolinxuan@foxmail.com>
     * @date 2019-12-05
     */
    getTipInfoInstance() {
      return this.$refs.tip;
    },

    /**
     * 获取设备的基础属性
     * 包含资源属性、状态、操作
     * @param {String} deviceId 设备ID
     * @returns {Promise}
     * @author Chorin
     * @date 2019-08-07
     */
    async getOverviewStats(deviceId) {
      let result = {};
      if (deviceId) {
        this.setTipInfoDeafultValue();
        await this.$http({
          method: "get",
          url: `resource/v1/resource/view/getOverviewStats?resourceId=${deviceId}`,
          showSpin: false
        }).then(res => {
          result = res || {};
        });
      }

      return result;
    },

    /**
     * 设置默认值
     * @author Chorin
     * @date 2019-09-05
     */
    setTipInfoDeafultValue() {
      this.alarmData = {};
      this.pmData = [];
      this.ctmData = [];
      this.cmData = [];
      this.childrenList = [];
    },

    /**
     * 处理点击
     * @returns {void}
     * @author Chorin <xiaolinxuan@foxmail.com>
     * @date 2019-12-05
     */
    clickHandler(...args) {
      this.$emit("on-click", ...args);
    },

    /**
     * 处理隐藏
     * @returns {void}
     * @author Chorin <xiaolinxuan@foxmail.com>
     * @date 2019-12-05
     */
    hideHandler(...args) {
      this.resourceData = {};
      this.$emit("on-hide", ...args);
    },

    /**
     * 处理下钻
     * @returns {void}
     * @author Chorin <xiaolinxuan@foxmail.com>
     * @date 2019-12-05
     */
    drillHanlder(...args) {
      this.$emit("on-drill", ...args);
    },

    /**
     * 处理关闭
     * @returns {void}
     * @author Chorin <xiaolinxuan@foxmail.com>
     * @date 2019-12-05
     */
    closeHandler(...args) {
      this.currentTipInfoReourceId = "";
      this.$emit("on-close");
    },

    /**
     *  发生了操作
     * @returns {void}
     * @author Chorin <xiaolinxuan@foxmail.com>
     * @date 2019-12-12
     */
    operationHandler(...args) {
      this.$emit("on-operation", ...args);
    }
  }
};
</script>
<style lang='less' scoped>
.tip-info-plus {
}
</style>