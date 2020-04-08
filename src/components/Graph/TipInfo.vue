<template>
  <div
    :style="style"
    class="hyz-box-shadow-inset tip-info"
    :class="{'move-transition': moveTransition}"
    draggable="true"
    @dragstart="dragstartHanlder"
    @dragend="dragHandler"
    ref="tipInfo"
  >
    <div>
      <!-- 资源图标 -->
      <div class="resouces-icon" v-show="!isArea">
        <Icon class="icon" v-show="!currentResoucesIcon" type="md-help" size="48" color="#0cbabd" />
        <img class="icon" v-show="currentResoucesIcon" v-imgtrans :src="currentResoucesIcon" />
      </div>
      <!-- 资源图标-END -->

      <!-- 资源信息 -->
      <div class="resouces-info" :style="isArea? 'width:95%;':''">
        <!-- 基础信息 -->
        <div class="title">
          <div class="text">
            {{resourceData.label || resourceData.name || resourceData.serial | maxLength(16, '..')}}
            <div class="loading-icon">
              <Icon v-show="isLoading" type="ios-loading" size="18" class="spin-icon-load"></Icon>
            </div>
          </div>
          <div class="icon-bar">
            <Icon type="ios-clipboard-outline can-click" @click="openOperateLogHandler" size="18"/>
            <Icon
              type="md-pulse can-click"
              v-if="resourceData.type === 'ahu1'"
              @click="checkAna(resourceData)"
              size="18"
            />
            <Icon
              type="md-analytics can-click"
              v-if="resourceData.type === 'ahu1' || resourceData.type === 'vav_box2'"
              @click="checkKpiChart(resourceData)"
              size="18"
            />
            <Icon type="md-git-merge can-click" @click="drill(resourceData)" size="18" v-show="isDrill" />
            <Icon type="md-more can-click" @click="openDetailViewHandler(cellBindData)" size="18" />
            <Icon type="md-close can-click close-btn" @click="closeHandler" size="18" />
          </div>
        </div>
        <!-- 基础信息—END -->

        <!-- 告警提示 -->
        <AlarmTipList v-if="!isArea" :alarmTip="alarmData_" :resourceId="resourceData.id" />
        <!-- 告警提示-END -->

        <!-- 设备标签 -->
        <hyz-h-box v-if="!isArea" class="row">
          <div class="pm-context">
            <div class="pm" style="background-color: #03a9f4">
              <label>{{resourceData.region_name}}&nbsp;</label>
            </div>
            <div class="pm" style="background-color: #03a9f4" v-show="alarmData_.lv1 == '0'">
              <label>状态正常</label>
            </div>
            <div v-show="IPUtils.isIP(resourceData.soft_identifi_code)">
              <label
                class="pm can-click"
                style="background-color: #03a9f4"
                @click="pingTestHandler"
              >IP：{{resourceData.soft_identifi_code}}&nbsp;</label>
            </div>
          </div>
        </hyz-h-box>
      </div>
      <!-- 设备标签-END -->
    </div>
    <!-- 资源信息-END -->

    <!-- 资源指标 -->
    <div class="pm-context pm-margin">
      <div
        class="pm"
        v-for="kd in pmData_"
        :key="kd.type"
        @click="kd.kpi_type === KPIConstant.KPI_TYPE.PM && openKPITrend(resourceId, kd.kpi_key, kd.kpi_name,kd.kpi_unit, resourceData.serial, resourceId)"
      >
        <label>{{kd.kpi_name}}</label>
        <div
          class="value-box"
          :class="{'pm-cannot-click': kd.kpi_type === KPIConstant.KPI_TYPE.CM}"
        >
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
    </div>
    <!-- 资源指标—END -->

    <!-- 子设备列表 -->
    <ChildrenDeviceList
      v-if="!isLingting"
      :childrenList="childrenList_"
      :parentResource="resourceData"
      :alarmIntro="alarmIntro"
    />
    <ChildrenLightingList v-else :childrenList="childrenList_" :parentResource="resourceData" :alarmIntro="alarmIntro"/>
    <!-- 子设备列表—END -->

    <!-- 区域 -->
    <AreaDeviceList v-if="isArea" :areaList="areaResData" />
    <!-- 区域-END -->

    <!-- 摄像头 -->
    <LiveCameraView v-else-if="isCamera" :id="resourceData.id" />
    <!-- 摄像头END -->

    <!-- 门禁 -->
    <DoorAcPlayer v-else-if="isAccessControl" :regionId="resourceData.region" />
    <!-- 门禁—END -->

    <!-- 停车位 -->
    <ParkingSpaceView v-else-if="isParkingSpace" :parkingSpaceId="resourceData.id" @on-ready="parkingSpaceViewReadyHandler"/>
    <!-- 停车位—END -->
    
    <!-- 停车场定位点 -->
    <ParkingLotControlPointView v-else-if="isControlPoint" :uniqueKey="resourceData.unique_key" />
    <!-- 停车场定位点-END -->

    <!-- 其他 -->
    <slot name="content">

    </slot>
    <!-- 其他-END -->

    <!-- 操作列表-->
    <CTMBar
      :isExpand="isExpandCTMList"
      v-if="isShowCTMList"
      :resourceId="resourceData.id"
      :ctmList="ctmData_"
      theme="zoosemy"
      @on-operation="operationHandler"
    />
    <!-- 操作列表-END -->

    <!-- KPI趋势图Modal -->
    <KPITrendModal ref="kpiTrendModal" />
    <!-- KPI趋势图Modal-END -->

    <!-- PingTest -->
    <PingTest ref="pingTest" />
    <!-- PingTest-END -->
    
    <!-- 操作日志 -->
    <OperateLogModal ref="operateLogModal"/>
    <!-- 操作日志-END -->
  </div>
</template>

<script>
import KPIConstant from "@/views/resource/kpi/KPIConstant.js";
import KPITrendModal from "@/views/resource/kpi/KPITrendModal.vue";
import KPIManagerBase from "@/views/resource/kpi/KPIManagerBase.js";
import DataCook from "@/utils/data-cook.js";
import DoorAcPlayer from "@components/player/lib/DoorAcPlayer.vue";
import AreaDeviceList from "./tip_info_comps/AreaDeviceList";
import LiveCameraView from "./tip_info_comps/LiveCameraView";
import CTMBar from "./tip_info_comps/CTMBar";
import AlarmTipList from "./tip_info_comps/AlarmTipList";
import ChildrenDeviceList from "./tip_info_comps/ChildrenDeviceList";
import ChildrenLightingList from "./tip_info_comps/ChildrenLightingList";
import ParkingSpaceView from "./tip_info_comps/ParkingSpaceView";
import ParkingLotControlPointView from "./tip_info_comps/ParkingLotControlPointView";
import PingTest from "../../../../src/views/bas/network/ping/comps/PingTest.vue";
import TipInfoBase from "./TipInfoBase";
import IPUtils from "@/utils/ip-utils";
import CommandDefaultValueParser from "@components/command/lib/CommandDefaultValueParser";;
import Timer from "@/utils/timer";
import OperateLogModal from "./tip_info_comps/OperateLogModal.vue";
export default {
  components: {
    KPITrendModal,
    LiveCameraView,
    DoorAcPlayer,
    PingTest,
    AreaDeviceList,
    AlarmTipList,
    CTMBar,
    ChildrenDeviceList,
    ChildrenLightingList,
    ParkingSpaceView,
    ParkingLotControlPointView,
    OperateLogModal,
  },
  props: {
    graph: {},
    alarmData: {},  /// 结果不准确，已弃用
    pmData: {},
    ctmData: {},
    cmData: {},
    childrenList: {},
    resourceData: {},
    isDrill: {
      type: Boolean,
      default: true,
    },
    alarmIntro:{
      type: Object,
      default(){
        return {}
      }
    }

    
  },

  data() {
    return {
      KPIConstant: KPIConstant,
      tipInfoBase: new TipInfoBase(this),
      kpiManagerBase: new KPIManagerBase(this),
      IPUtils: IPUtils,
      isLoading: true,
      style: {
        visibility: "hidden"
      },

      ///页面数据
      cellBindData: {},
      currentResoucesIcon: "",
      pmData_: [],
      cmData_: [],
      ctmData_: [],
      alarmData_: {},
      childrenList_: [],
      resourceId: "",
      areaResData: [],

      ///拖拽功能
      dragstartX: 0,
      dragstartY: 0,
      moveTransition: true,

      ///设备判断数据
      /** 区域 */
      isArea: false,
      /** 照明设备 */
      isLingting: false,
      /** 摄像头设备 */
      isCamera: false,
      /** DCC设备 */
      isDCC: false,
      /** 门禁设备 */
      isAccessControl: false,
      /** 停车位 */
      isParkingSpace: false,
      /** 控制点 */
      isControlPoint: false,

      ///页面控制数据
      /** 是否显示CTM列表*/
      isShowCTMList: true,
      /** 是否展开CTM列表 */
      isExpandCTMList: false
    };
  },
  computed: {
    kpiList() {
      return this.$store.state.kpi.list;
    },
    resourceClassList() {
      return this.$store.state.resClass.list;
    }
  },
  watch: {
    resourceData(val) {
      if (val) {
        let resourceClassId = val.resource_class_id;
        this.resourceId = val.id;
        this.renderResourceBaseInfo(resourceClassId);
      }
    },

    pmData(val) {
      this.renderPMInfo(val || []);
    },

    cmData(val) {
    
      // this.renderCMInfo(val || []);
    },

    ctmData(val) {
      this.renderCTMInfo(val || []);
    },

    childrenList(val) {
      this.renderChlidrenList(val || []);
    },

    alarmIntro(v){
      let id = this.resourceData.id;
      this.renderAlarmInfo(v[id] && v[id].alarmStatistics || {});
    },
  },
  methods: {
    /**
     * 重置界面状态
     * @returns {void}
     * @author Chorin <xiaolinxuan@foxmail.com>
     * @date 2019-10-31
     */
    resetViewStatus() {
      //操作面板默认显示但不展开
      this.isShowCTMList = true;
      this.isExpandCTMList = false;
      //设备判断重置
      this.isLingting = false;
      this.isDCC = false;
      this.isAccessControl = false;
      this.isCamera = false;
      this.isArea = false;
      this.isParkingSpace = false;
      this.isControlPoint = false;
      //基础信息重置
      this.currentResoucesIcon = "";

      this.cellBindData = {};
    },

    /**
     * 拖拽开始
     * @returns {void}
     * @author Chorin <xiaolinxuan@foxmail.com>
     * @date 2019-10-14
     */
    dragstartHanlder(event) {
      ///记录拖拽开始时的鼠标位置
      let { pageX, pageY } = event;
      let x = pageX,
        y = pageY - 64;
      this.dragstartX = x;
      this.dragstartY = y;
    },

    /**
     * 鼠标按下处理器
     * @returns {void}
     * @author Chorin <xiaolinxuan@foxmail.com>
     * @date 2019-10-14
     */
    dragHandler(event) {
      let { pageX, pageY } = event; //(x, y)鼠标位置
      let x = pageX,
        y = pageY - 64;

      ///算出鼠标按点的偏移量
      let offestX = x - this.dragstartX;
      let offestY = y - this.dragstartY;

      let tipX = parseInt(this.style.left) + offestX;
      let tipY = parseInt(this.style.top) + offestY;

      this.moveTransition = false;
      this.updateTipInfoPositoin(tipX, tipY);
      setTimeout(() => {
        this.moveTransition = true;
      }, 0);

      event.preventDefault();
    },

    /**
     * 渲染资源基础信息
     * @returns {void}
     * @author Chorin <xiaolinxuan@foxmail.com>
     * @date 2019-11-02
     */
    renderResourceBaseInfo(resourceClassId) {
      this.specialResouceHandler(resourceClassId);
      setTimeout(() => {
        this.currentResoucesIcon = this.tipInfoBase.getResourceIcon(
          resourceClassId
        );
      }, 0);
    },

    /**
     * 更新信息面板位置
     * @param {Number} x 横坐标
     * @param {Number} y  纵坐标
     * @returns {void}
     * @author Chorin <xiaolinxuan@foxmail.com>
     * @date 2019-11-03
     */
    updateTipInfoPositoin(x, y) {
      this.$set(this.style, "left", x + "px");
      this.$set(this.style, "top", y + "px");
    },

    /**
     * 隐藏视图
     * @returns {void}
     * @author Chorin <xiaolinxuan@foxmail.com>
     * @date 2019-11-03
     */
    hiddenTipInfo() {
      this.$set(this.style, "visibility", "hidden");
    },

    /**
     * 显示视图
     * @returns {void}
     * @author Chorin <xiaolinxuan@foxmail.com>
     * @date 2019-11-03
     */
    showTipInfo() {
      this.$set(this.style, "visibility", "visible");
    },

    /**
     * 渲染告警信息
     * @returns {void}
     * @author Chorin <xiaolinxuan@foxmail.com>
     * @date 2019-11-02
     */
    renderAlarmInfo(alarmInfo) {
      this.alarmData_ = Object.assign(
        {
          lv1: "0",
          lv2: "0",
          lv3: "0",
          lv4: "0"
        },
        alarmInfo
      );
    },

    /**
     * 渲染PM数据
     * @returns {void}
     * @author Chorin <xiaolinxuan@foxmail.com>
     * @date 2019-11-02
     */
    renderPMInfo(pmList) {

      pmList = pmList || [];      
      this.pmData_ = [];
      
      for (let i in pmList) {
        let kpi = this.getKPI(pmList[i].kpi_id);
        pmList[i].kpi_type = pmList[i].kpi_type || kpi.kpiType;
        pmList[i].escape_mode = kpi.escapeMode;

        if (
          kpi.kpiType !== KPIConstant.KPI_TYPE.PM &&
          kpi.kpiType !== KPIConstant.KPI_TYPE.CM
        ) {
          continue;
        }

         ///转义关联CTM的CM
        let linkCMDParams = pmList[i].link_cmd_params;
        if(linkCMDParams){
          let defaultValue =  (linkCMDParams[0] || {}).defaultValue || "";
          let parser = new CommandDefaultValueParser(defaultValue);
          pmList[i].value = parser.getKeyByValue(pmList[i].view_value || pmList[i].value);
        }

        if (
          kpi.displayMode == KPIConstant.DISPLAY_MODE.SHOW ||
          kpi.displayMode == KPIConstant.DISPLAY_MODE.ONLY_SHOW
        ) {
          this.pmData_.push(pmList[i]);
        }
      }
    },


    /**
     * 渲染CTM列表
     * @returns {void}
     * @author Chorin <xiaolinxuan@foxmail.com>
     * @date 2019-11-02
     */
    renderCTMInfo(ctmList) {
      this.ctmData_ = [];
      let list = [];
      /// 根据kpi的displayMode进行过滤
      ctmList.forEach(ctm =>{
        let kpi = ctm.kpi || {};
        kpi.displayMode = DataCook.getNonNull(kpi.displayMode, KPIConstant.DISPLAY_MODE.DETAIL_SHOW);
        if(kpi.displayMode === KPIConstant.DISPLAY_MODE.SHOW){
          list.push(ctm);
        }
      });
      this.ctmData_ = list;
    },

    /**
     *  渲染子设备列表
     * @returns {void}
     * @author Chorin <xiaolinxuan@foxmail.com>
     * @date 2019-11-02
     */
    renderChlidrenList(childrenList) {
      for (let i in childrenList) {
        let children = childrenList[i] || {};
        let childPmList = children.pmData || [];
        let childCmList = children.cmData || [];
        children.pmData = [];

        for (let j in childPmList) {
          let childPm = childPmList[j];
          let kpi = this.getKPI(childPm.kpi_id);
          childPm.kpi_type = kpi.kpiType;
          childPm.escape_mode = kpi.escapeMode;
          if (
            kpi.kpiType !== KPIConstant.KPI_TYPE.PM &&
            kpi.kpiType !== KPIConstant.KPI_TYPE.CM
          ) {
            continue;
          }

          ///转义关联CTM的CM
          let linkCMDParams = childPm.link_cmd_params;
          if(linkCMDParams){
            let defaultValue =  (linkCMDParams[0] || {}).defaultValue || "";
            let parser = new CommandDefaultValueParser(defaultValue);
            childPm.value = parser.getKeyByValue(childPm.view_value || childPm.value);
          }
        
          if (
            kpi.displayMode == KPIConstant.DISPLAY_MODE.SHOW ||
            kpi.displayMode == KPIConstant.DISPLAY_MODE.ONLY_SHOW
          ) {
            children.pmData.push(childPm);
          }
        }
      }
      this.childrenList_ = _.sortBy(childrenList, child => {
        return child.resourceData.name;
      });
    },

    /**
     * 特殊资源处理器
     * 1. 照明控制器  keyName="ligtingSW"
     * @returns {void}
     * @author Chorin <xiaolinxuan@foxmail.com>
     * @date 2019-10-12
     */
    specialResouceHandler(resourceClassId) {
      let baseResouceClass = this.tipInfoBase.getBaseResouceClass(
        resourceClassId
      );
      let resourceKeyName = baseResouceClass.keyName;
      console.log("#### 基类", resourceKeyName);
      this.resetViewStatus();
      switch (resourceKeyName) {
        case "ligtingSW":
          this.lingtingControlHandler();
          break;
        case "normal_camera":
          this.liveCameraHandler();
          break;
        case "qr_accesscontrol":
          this.accessControlHandler();
          break;
        case "area":
          this.areaHandler();
          break;
        case "parking_space":
          this.parkingSpaceHandler();
          break;        
        case "lpgs_two_dimension_code":
          this.controlPointHandler();
          break;
        case "dcc":
          this.isDCC = true;
        case "ahu":
        case "air_valve":
        case "fan":
        case "vav_box":
        case "fcu":
        default:
          this.fcuHandler();
          break;
      }
    },

    /**
     * vavbox处理器
     * @returns {void}
     * @author Chorin <xiaolinxuan@foxmail.com>
     * @date 2019-10-31
     */
    vavBoxHandler() {
      this.isShowCTMList = true;
      this.isExpandCTMList = true;
    },

    /**
     * 风机盘处理器
     * @returns {void}
     * @author Chorin <xiaolinxuan@foxmail.com>
     * @date 2019-10-31
     */
    fcuHandler() {
      this.isShowCTMList = true;
      this.isExpandCTMList = true;
    },

    /**
     * 显示区域
     * @returns {void}
     * @author Chorin <xiaolinxuan@foxmail.com>
     * @date 2019-10-31
     */
    areaHandler() {
      this.isArea = true;
      let regionId = this.resourceId;
      let areaResCells = Object.values(this.graph.model.cells).filter(
        cell => _.get(cell, "data.bindData.region", "") == regionId
      );
      this.areaResData = _.map(areaResCells, "data.bindData", {}) || [];
    },

    /**
     * 显示门禁设备
     * @returns {void}
     * @author Chorin <xiaolinxuan@foxmail.com>
     * @date 2019-10-28
     */
    accessControlHandler() {
      this.isShowCTMList = false;
      this.isAccessControl = true;
    },

    /**
     * 显示摄像头
     * @returns {void}
     * @author Chorin <xiaolinxuan@foxmail.com>
     * @date 2019-10-24
     */
    liveCameraHandler() {
      this.isShowCTMList = false;
      this.isCamera = true;
    },

    /**
     * 照明设备控制器处理器
     * @returns {void}
     * @author Chorin <xiaolinxuan@foxmail.com>
     * @date 2019-10-12
     */
    lingtingControlHandler() {
      this.isShowCTMList = false;
      this.isLingting = true;
    },

    /**
     * 停车位
     * @returns {void}
     * @author Chorin <xiaolinxuan@foxmail.com>
     * @date 2019-12-05
     */
    parkingSpaceHandler(){
      this.isParkingSpace = true;
      this.isShowCTMList = false;
      Timer.timeout(10).then(()=>{
        this.currentResoucesIcon = "static/parking/parking_space.svg";
      });

    },

    /**
     * 车位信息加载完毕
     * @param {Object} parkingSpaceInfo  车位信息
     * @returns {void}
     * @author Chorin <xiaolinxuan@foxmail.com>
     * @date 2019-12-05
     */
    parkingSpaceViewReadyHandler(parkingSpaceInfo){
      this.resourceData.name =  `${parkingSpaceInfo.parkingLotName}${parkingSpaceInfo.label}`;
      this.$forceUpdate();
    },

    /**
     * 控制点
     * @returns {void}
     * @author Chorin <xiaolinxuan@foxmail.com>
     * @date 2019-12-05
     */
    controlPointHandler(){
      this.isControlPoint = true;
    },

    /**
     * 关闭处理器
     * @author Chorin <xiaolinxuan@foxmail.com>
     * @date 2019-09-23
     */
    closeHandler() {
      this.hide();
      this.$emit("on-close");
    },

    /**
     *  发生了操作
     * @returns {void}
     * @author Chorin <xiaolinxuan@foxmail.com>
     * @date 2019-12-12
     */
    operationHandler(...args){
      this.$emit("on-operation", ...args);
    },

    /**
     * 计算小信息面板的位置, 子设备最多展示15个
     * @param {Number} x 点击坐标的x值
     * @param {Number} y 点击坐标的y值
     * @param {Number} childrenSize 子设备大小
     * @returns {Position} 信息面板的左上角的坐标点
     * @author Chorin <xiaolinxuan@foxmail.com>
     * @date 2019-09-26
     */
    positionCorrection(x, y, childrenSize) {
      childrenSize = childrenSize > 12 ? 12 : childrenSize;

      let tipInfo = this.$refs.tipInfo;
      let tipWidth = tipInfo.clientWidth || 460;
      let tipHeight = tipInfo.clientHeight || 180 + childrenSize * 30;
      let windowWidth = window.innerWidth;
      let windowHeight = window.innerHeight;
      let clientHeight = document.body.clientHeight;
      let scrollTop =
        (document.getElementsByClassName("graph-base-content")[0] || {})
          .scrollTop || 0;

      if (windowWidth - x < tipWidth) {
        x = x - tipWidth;
      }

      y = (clientHeight - tipHeight) / 2 + scrollTop - 32;

      /// 2019-11-13 Chorin: 改为垂直居中
      // if (tipHeight * 2 > windowHeight) {
      //   let yOffset = tipHeight / 2;
      //   y = y > yOffset ? y - yOffset : y;
      // } else if (windowHeight - y < tipHeight) {
      //   y = y - tipHeight;
      // }

      // if (y < 64) {
      //   y = 100;
      // }
      return { x, y };
    },

    /**
     * 移动信息面板
     * @param {Number} x_ 横坐标
     * @param {Number} y_ 纵坐标
     * @returns {void}
     * @author Chorin <xiaolinxuan@foxmail.com>
     * @date 2019-10-14
     */
    move(x_, y_) {
      let { x, y } = this.positionCorrection(x_, y_, 0);
      this.updateTipInfoPositoin(x, y);
      if (this.style.visibility == "hidden") {
        setTimeout(() => {
          this.showTipInfo();
        }, 200);
      }
      this.isLoading = true;
    },

    /**
     * 显示小信息面板
     * @returns {void}
     * @author Chorin <xiaolinxuan@foxmail.com>
     * @date 2019-10-31
     */
    show(item, x_, y_) {
      let childrenSize = this.childrenList_.length || 0;
      let { x, y } = this.positionCorrection(x_, y_, childrenSize);
      this.cellBindData = _.get(item, "data.bindData", {
        name: item.value,
        id: item.id,
        resourceClassId: 0
      });
      this.updateTipInfoPositoin(x, y);
      this.showTipInfo();

      this.isLoading = false;
    },

    /**
     * 关闭小信息面板
     * @returns {void}
     * @author Chorin <xiaolinxuan@foxmail.com>
     * @date 2019-11-03
     */
    hide() {
      this.hiddenTipInfo();
      this.$emit("on-hide");
      this.resetViewStatus();
    },

    /**
     * 打开详情页
     * @returns {void}
     * @author Chorin <xiaolinxuan@foxmail.com>
     * @date 2019-11-03
     */
    openDetailViewHandler(item) {
      const { id, resource_class_id } = this.resourceData || item;

      window.open(
        `${location.protocol}//${location.hostname}:${location.port}/ibms#/resDetail?id=${id}&resClassId=${resource_class_id}`,
        "_blank"
      );
    },

    drill(item) {
      this.$emit("on-drill", item);
      this.hide();
    },

    /**
     * 打开指标趋势图
     * @param {String} resourceId 资源ID
     * @param {String} kpiId 指标ID
     * @returns {void}
     * @author Chorin <xiaolinxuan@foxmail.com>
     * @date 2019-10-09
     */
    openKPITrend(
      resourceId,
      kpiKey,
      kpiName = "",
      unit,
      resourceName = "",
      joinResourceId
    ) {
      this.$refs.kpiTrendModal.open({
        kpiKey: kpiKey,
        resourceId: resourceId,
        resourceName: resourceName,
        kpiName: kpiName,
        unit: unit,
        joinResourceId: joinResourceId
      });
    },

    /**
     * ping 测试
     * @returns {void}
     * @author Chorin <xiaolinxuan@foxmail.com>
     * @date 2019-10-30
     */
    pingTestHandler() {
      let ip = this.resourceData.soft_identifi_code;
      this.$refs.pingTest.ping(ip);
    },

    /**
     * KPI ID
     * @param {String} kpiId
     * @returns {void}
     * @author Chorin <xiaolinxuan@foxmail.com>
     * @date 2019-11-02
     */
    getKPI(kpiId) {
      return this.kpiManagerBase.getKPI(kpiId);
    },

    /**
     * 打开操作日志
     * @returns {void}
     * @author Chorin <xiaolinxuan@foxmail.com>
     * @date 2020-03-09
     */
    openOperateLogHandler(){
      let {resourceId} = this;
      this.$refs.operateLogModal.open({
        resourceId,
      });
    },

    checkKpiChart(item) {
      if (item.type === "ahu1") {
        window.open(
          `${location.protocol}//${location.hostname}:${location.port}/ibms#/aird?serial=${item.serial}`,
          "_blank"
        );
      } else {
        window.open(
          `${location.protocol}//${location.hostname}:${location.port}/ibms#/vav?id=${item.id}&&serial=${item.serial}&&type=${item.type}&&resClassId=${item.resource_class_id}`,
          "_blank"
        );
      }
    },

    checkAna(item) {
      window.open(
        `${location.protocol}//${location.hostname}:${location.port}/show#/expert?serial=${item.serial}`,
        "_blank"
      );
    }
  }
};
</script>

<style lang="less" scoped>
.can-click {
  cursor: pointer;
}

.pm-cannot-click {
  background-color: #d1a96d !important;
  cursor: default !important;
}

.tip-info {
  z-index: 1005;
  position: absolute;
  padding: 4px 4px 8px;
  border-radius: 6px;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(2px);
  color: white;
  overflow: hidden;
  min-width: 460px;
  max-width: 500px;
  min-height: 120px;
}
.pm-margin {
  margin: 0 12px 0 96px;
}
.move-transition {
  transition: left 0.2s, top 0.2s;
  transition-timing-function: ease-out;
}

.spin-icon-load {
  animation: ani-demo-spin 1s linear infinite;
}

.icon-bar {
  float: right;
  margin-right: -10px;
  .move-btn {
    cursor: move;
  }
  > i {
    margin-left: 4px;
  }
}
.close-btn {
  color: red;
}
.kpi-img {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  margin: 4px;
}
.row {
  margin-top: -8px;
  flex-wrap: wrap;
}

.pm {
  display: inline-block;
  border-radius: 2px;
  padding: 0 0 0 4px;
  margin: 4px 4px 2px 0;
  align-items: center;
  background-color: #0cbabd;
  cursor: pointer;
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

.pm-context {
  display: flex;
  flex-wrap: wrap;
  max-height: 160px;
  overflow: auto;
}

.resouces-icon {
  display: inline-block;
  margin-left: 8px;
  margin-top: 30px;
  width: 80px;
  > .icon {
    text-align: center;
    width: 100%;
    height: 100%;
    max-width: 80px;
    max-height: 80px;
  }
  .text {
    text-align: center;
    font-weight: bold;
  }
}

.resouces-info {
  display: inline-block;
  vertical-align: top;
  width: calc(100% - 100px);
  .title {
    margin-bottom: 4px;
    height: 32px;
    text-align: center;
    line-height: 32px;
    font-size: 16px;
    cursor: move;
    > .text {
      display: inline-block;
      font-weight: bold;

      > .loading-icon {
        width: 16px;
        display: inline-block;
      }
    }
  }
}
</style>

<style lang="less" >
.dark-mode {
  .ivu-modal {
    backdrop-filter: blur(6px);
  }
  .ivu-modal-content {
    background-color: rgba(0, 0, 0, 0.6);
  }
}
</style>
