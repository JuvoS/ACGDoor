<template>
  <div class="ctm-bar">
    <!-- 指令列表 -->
    <div class="h-box row"  v-if="!isExpand">
      <div class="ctm" v-for="ctm in ctmList" :key="ctm.type" >
        <Button
          class="font"
          type="primary"
          :size="size"
          @click="ctmClickHandler(ctm)"
        >{{ctm.name}}</Button>
      </div>
    </div>
    <!-- 指令列表-END -->

    <!-- 展开的指令列表 -->
    <MultipleCommandSendPanel v-else :ctmList="ctmList" :resourceId="resourceId" :theme="theme" @on-operation="operationHandler"/>
    <!-- 展开的指令列表-END -->

    <!-- 指令发送面板 -->
    <CommandSendModel ref="commandSendModel" @success="cmdSendSuccessHandler" :theme="theme" @on-operation="operationHandler"/>
    <!-- 指令发送面板-END -->

  </div>
</template>
<script>
/**
 * ##操作列表##
 * **Props**
 *  + ctmList; 操作列表
 *  + isExpand; 是否展开，不展开的情况下，每个操作都为一个按钮
 *  + size; 按钮大小，针对不展开的指令列表
 * 
 * **API**
 * 
 * **Event**
 *  + click; 点击
 * 
 * @author Chorin <xiaolinxuan@foxmail.com>
 * @date 2019-10-31
 */
import CommandSendModel from "@components/command/lib/CommandSendModel";
import MultipleCommandSendPanel from "@components/command/lib/MultipleCommandSendPanel";
export default {
  name: "CTMBar",
  components: {
    CommandSendModel,
    MultipleCommandSendPanel,
  },
  props: {
    resourceId: {
      type: String,
      default: "",
    },
    ctmList: {
      type: Array,
      default: () => [],
    },
    isExpand: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: "small",
    },
    theme:{
      type: String,
      default: "default",
    },
  },
  data(){
    return {
      
    }
  },
  methods: {

    /**
     * 点击指令操作
     */
    ctmClickHandler(ctm){
      this.$refs.commandSendModel.openToCmdSendPanel(
        ctm.kpiId,
        this.resourceId
      );
    },

    /**
     * 发送成功
     */
    cmdSendSuccessHandler() {
      this.$Message.success("操作成功！");
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
  }
}
</script>
<style lang="less" scoped>
.ctm-bar{
  padding-left: 12px;
  .h-box{
    display: inline-block;
    width: 100%;
    font-weight: bold;
  }
  .row{
    padding: 0 12px 0 12px;
  }
  .ctm {
    display: inline-block;
  
    margin: 0 10px 6px 0;
    font-size: 10px;
    .font{
      font-weight: bold;
    }
  }


}

</style>