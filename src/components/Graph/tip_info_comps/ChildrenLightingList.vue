<template>
  <div class='children-lighting-list'>
    <ChildrenDeviceView :childrenList="childrenList" :parentResource="parentResource" :alarmIntro="alarmIntro">
      <template #childrenContent = "{children, index}">
         <div
            class="children-opreation"
            v-for="kd  in children.pmData"
            :key="kd.type"
          >
            <i-switch
              @on-change="status => operationLightingHandler(index, status)"
              v-model="kd.status"
              size="large"
            >
              <span slot="open">开启</span>
              <span slot="close">关闭</span>
            </i-switch>
            <div class="loading-icon">
              <Icon v-show="kd.isLoading" type="ios-loading" size="18" class="spin-icon-load"></Icon>
            </div>
          </div>
      </template>
    </ChildrenDeviceView>

    <!-- 照明设备操作 -->
    <div class="lingting-ctm-list">
      <div class="ctm" >
        <Button
          type="primary"
          size="small"
          @click="openAllLightingHandler()"
        >全开</Button>
      </div>
    <div class="ctm" >
          <Button
            type="primary"
            size="small"
            @click="closeAllLightingHandler()"
          >全关</Button>
      </div>
    </div>
    <!-- 照明灯设备操作-END -->
  </div>
</template>
<script>
/**
 * ##照明子设备列表内容##
 * 
 * **Props**
 *  + childrenList; 子设备列表
 *  + parentResource; 父资源信息
 * 
 * **API**
 * 
 * **Event**
 * 
 * @author Chorin <xiaolinxuan@foxmail.com>
 * @date 2019-11-03
 */
import LightingConstant from "@/views/bas/lighting/LightingConstant";
import LightingListBase from "@/views/bas/lighting/LightingListBase";
import ChildrenDeviceView from "./ChildrenDeviceView";
import DataCook from "@/utils/data-cook.js";
import KPIConstant from "@/views/resource/kpi/KPIConstant.js";


export default {
  name: 'ChildrenLightingList',
  components: {
    ChildrenDeviceView,
  },
  props: {
    childrenList: {
      type: Array,
      default: () => [],
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
  data(){
    return {
      lightingListBase: new LightingListBase(this),
    }
  },
  mounted(){
  },

  watch: {
    parentResource: {
      immediate: true,
      handler(v){
          v && this.initView();
      },
  
    },
    // parentResource(val){
    //   this.initView();
    // }
  },

  methods:{
    /**
     * 初始化界面
     */
    initView(){
      this.renderLightingList();
    },

    /**
     * 渲染照明设备列表
     */
    renderLightingList(){
      let resource = this.parentResource;
      let regionFullId = resource.region_full_id;
      let floorId = regionFullId.split(",")[1];
      this.lightingListBase
          .getLightingLoopByFloor(floorId)
          .then(lightingList => {
            this.bindLingtingStatus(lightingList);
          });
    },

    /**
     * 绑定照明设备状态
     * @returns {void}
     * @author Chorin <xiaolinxuan@foxmail.com>
     * @date 2019-11-03
     */
    bindLingtingStatus(lightingList) {
      let childrenList = this.childrenList;
      DataCook.mergeObjectList(childrenList, lightingList, {
        targetKeyField: "resourceId",
        sourceKeyField: "id",
        handler(targetItem, sourceItem) {
          let pmData = [];
          pmData.push({
            status: KPIConstant.CM[sourceItem.status || "0"] == "开" ? true : false,
            isLoading: false,
          });
          return Object.assign(targetItem, { pmData });
        }
      });
    },

    /**
     *照明设备操作：开/关
     * @returns {void}
     * @author Chorin <xiaolinxuan@foxmail.com>
     * @date 2019-10-21
     */
    operationLightingHandler(lightingIndex, isOpen){
      isOpen
        ? this.openLightingHandler(lightingIndex)
        : this.closeLightingHandler(lightingIndex);
    },
    /**
     * 开启照明设备
     * @returns {void}
     * @author Chorin <xiaolinxuan@foxmail.com>
     * @date 2019-10-14
     */
    openLightingHandler(lightingIndex) {
      let lighting = this.childrenList[lightingIndex];
      this.lightingBatchOpretionHandler(
        [lighting],
        LightingConstant.COMMAND.ON
      );
    },

    /**
     * 关闭照明设备
     * @returns {void}
     * @author Chorin <xiaolinxuan@foxmail.com>
     * @date 2019-10-14
     */
    closeLightingHandler(lightingIndex) {
      let lighting = this.childrenList[lightingIndex];
      this.lightingBatchOpretionHandler(
        [lighting],
        LightingConstant.COMMAND.OFF
      );
    },

    /**
     * 照明设备批处理
     * @returns {void}
     * @author Chorin <xiaolinxuan@foxmail.com>
     * @date 2019-10-14
     */
    lightingBatchOpretionHandler(lightingList = [], command) {
      this.setLightingListLoadingStatus(lightingList, true);
      let opreationList = [];
      for (let i in lightingList) {
        let lighting = lightingList[i];
        opreationList.push({
          id: lighting.resourceData.id,
          resource_class_id: lighting.resourceData.resource_class_id,
          resource_class_keyname: lighting.resourceData.resource_class_keyname
        });
      }

      this.lightingListBase.executeCircuitCommands(
        opreationList,
        command,
        isSuccess => {
          if (isSuccess) {
            //服务器可能还没保存好，延时一下。
            setTimeout(() => {
              this.updateLightingStatus(lightingList);
            }, 3000);
          }
          this.$Message.success("操作完成");
        }
      );
    },

    /**
     * 打开全部照明设备
     * @returns {void}
     * @author Chorin <xiaolinxuan@foxmail.com>
     * @date 2019-10-14
     */
    openAllLightingHandler() {
      this.setLightingListStatus(
        this.childrenList,
        LightingConstant.LIGHT_STATUS.ON
      );
      this.lightingBatchOpretionHandler(
        this.childrenList,
        LightingConstant.COMMAND.ON
      );
    },

    /**
     * 关闭全部照明设备
     * @returns {void}
     * @author Chorin <xiaolinxuan@foxmail.com>
     * @date 2019-10-14
     */
    closeAllLightingHandler() {
      this.setLightingListStatus(
        this.childrenList,
        LightingConstant.LIGHT_STATUS.OFF
      );
      this.lightingBatchOpretionHandler(
        this.childrenList,
        LightingConstant.COMMAND.OFF
      );
    },

    /**
     * 按需更新照明设备状态，
     * @param {Object[]} targetLightingList 更新目标
     * @returns {void}
     * @author Chorin <xiaolinxuan@foxmail.com>
     * @date 2019-11-04
     */
    updateLightingStatus(targetLightingList){
      let resource = this.parentResource;
      let regionFullId = resource.region_full_id;
      let floorId = regionFullId.split(",")[1];
      this.lightingListBase
          .getLightingLoopByFloor(floorId)
          .then(lightingList => {
              DataCook.mergeObjectList(targetLightingList, lightingList,{
                targetKeyField: "resourceId",
                sourceKeyField: "id",
                handler(targetItem, sourceItem) {
                  let pmData = [];
                  pmData.push({
                    status: KPIConstant.CM[sourceItem.status || "0"] == "开" ? true : false,
                    isLoading: false,
                  });
                  return Object.assign(targetItem, { pmData });
                }
              });
          });
    },

    /**
     * 设置照明设备的状态
     * @param {Object[]} lightingList 设备列表
     * @param {Object[]}  status   LightingConstant.STATUS.*
     * @returns {void}
     * @author Chorin <xiaolinxuan@foxmail.com>
     * @date 2019-10-21
     */
    setLightingListStatus(lightingList, status) {
      for (let i in lightingList) {
        let lighting = lightingList[i];
        lighting.pmData[0].status =
          status == LightingConstant.LIGHT_STATUS.ON ? true : false;
      }
    },

    /**
     * 设置loading 状态
     */
    setLightingListLoadingStatus(lightingList, isLoading){
      for (let i in lightingList) {
        let lighting = lightingList[i];
        lighting.pmData[0].isLoading = isLoading
      }
    }
  },
}
</script>
<style lang='less' scoped>
  .children-lighting-list{
    .children-opreation {
      cursor: pointer;
      display: inline-block;
      margin: 0 0 0 40px;
      // line-height: 1.5em;
      border-radius: 2px;
      .opreation-box {
        display: inline-block;
        margin-right: 10px;
        padding: 0 8px 0 8px;
        border-radius: 2px;
        background-color: #c47c40;
        font-weight: bold;
        .opreation-btn {
        }
      }
      .in-service {
        background-color: #19be6b;
        color: #ffffff;
      }
      .stop-in {
        background-color: #8e8e8e;
        color: #ffffff;
      }
    }

    .lingting-ctm-list{
      margin-left: 8px;
      .ctm{
        display: inline-block;
        margin-right: 6px;
      }
    }

    .loading-icon {
      display: inline-block;
      width: 16px;
      margin-left: 12px;
      .spin-icon-load {
        animation: ani-demo-spin 1s linear infinite;
      }
    }
  }
</style>