<template>
  <div class="area-device-list">
    <hyz-v-box >
      <div style="margin-bottom: 4px;">区域下设备：</div>
      <Tag
        color="#0cbabd"
        v-for="(area, areaIndex) in areaList"
        :key="'area_' + areaIndex"
        @click.native="clickAreaDeviceHandler(area)"
      >{{area.serial || area.name || area.label}}</Tag>
    </hyz-v-box>
  </div>
</template>
<script>
/**
 * ##区域列表##
 * **Props**
 *  + areaList; 区域列表
 * **API**
 * 
 * **Event**
 *  + click; 点击
 * 
 * @author Chorin <xiaolinxuan@foxmail.com>
 * @date 2019-10-31
 */
export default {
  name: "AreaDeviceList",
  props: {
    areaList: {
      type: Array,
      default: () => [],
    }
  },
  data(){
    return {
    
    }
  },
  methods:{
    /**
     * 点击设备
     */
    clickAreaDeviceHandler(resource){
      this.$emit("click", resource);
      window.open(
        `${location.protocol}//${location.hostname}:${location.port}/ibms#/resDetail?id=${resource.id}&&resClassId=${resource.resource_class_id}`,
        "_blank"
      );
    }
  }
}
</script>
<style lang="less" scoped>

</style>