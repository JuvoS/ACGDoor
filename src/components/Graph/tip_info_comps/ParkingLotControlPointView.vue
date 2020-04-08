<template>
 <div class="parking-lot-control-point">
    <div class="qrcode">
      <qrcode-vue :value="qrCodePath" :size="240" level="H" style="text-align:center" />
    </div>
    <label>手机微信扫一扫查看路径</label>
 </div>
</template>

<script>

  /**
   * ##定位点##
   *  生成定位点二维码
   * **Props**
   *  + uniqueKey; 
   * 
   * **API**
   * 
   * **Event**
   * 
   * @author Chorin <xiaolinxuan@foxmail.com>
   * @date 2019-12-05
   */
  import QrcodeVue from "qrcode.vue";
  export default {
    name: "ParkingLotControlPointView",
    components: {
      QrcodeVue,
    },
    props: {
      uniqueKey: {
        type: String,
        default: "",
      }
    },
    
    computed:{
      qrCodePath(){
        let path = `https://ibms.tiandecentre.com.cn/weixinfile/tiande/lpgs/position/${this.uniqueKey}`
        path = path.replace(/\s+/g,"");
        console.log("#### path", path);

        return path;
      }
    },
    
    watch: {

    },
    data(){
      return {
      }
    },
    methods:{},
  }
</script>

<style lang='less' scoped>
  .parking-lot-control-point{
    text-align: center;
    .qrcode{
      margin: 0 auto;
      width: 264px;
      height: 264px;
      padding: 12px;
      margin-bottom: 10px;
      background-color: #ffffff;
    }
  }
</style>
  