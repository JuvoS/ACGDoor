<template>
 <Modal class="operate-log-modal-root"
   v-model="isShow"
   :footer-hide="true"
   :width="800"
   title="操作日志">
   <HyzBTable
    :simplePage="true"
    size="small"
    :data="logList"
    :columns="logListColumns"
    :pageData="pageData"
    @page-data-change="pageChangeHandler"
    @on-row-dblclick="openDetailHandler"
   />
 </Modal>
</template>
<script>
  export default {
    name: "OperateLogModal",
    components: {},
    props: {
    },
    data(){
      return {
        isShow: false,
        pageData:{ 
          total:1, 
          current: 1,
          pageSize: 10,
        }, 
        searchParams: {},
        logList: [],
        logListColumns: [{
          title: "用户",
          key: "userName",
          align: "center",
          // width: 120
        },{
          title: "操作",
          key: "logTitle",
          align: "center",
          // width: 200,
        },{
          title: "远程地址",
          key: "remoteAddr",
          align: "center",
          // width: 120,
        },{
          title: "时间",
          key: "operateTime",
          align: "center",
          // width: 160,
        },],

      }
    },
    methods:{
      /**
       * 打开
       * @returns {void}
       * @author Chorin <xiaolinxuan@foxmail.com>
       * @date 2020-03-09
       */
      open(options){
        let {resourceId} = options;
        this.searchParams = {
          rid: resourceId,
        };
        this.pageData = { 
          total:1, 
          current: 1,
          pageSize: 10,
        };
        this.initView();
        this.isShow = true;
        console.log("#### resourceId", resourceId);
      },

      /**
       * 初始化界面
       * @returns {void}
       * @author Chorin <xiaolinxuan@foxmail.com>
       * @date 2020-03-09
       */      
      initView(){
        let pageSize = this.pageData.pageSize;
        let pageNo = this.pageData.current - 1;
        let searchParams = this.searchParams;
        this.getOperateLogList(pageNo, pageSize, searchParams)
          .then(({logList,total}) =>{
            this.logList = logList;
            this.pageData.total = total;
          });
      },

      /**
       * 获取操作日志列表
       * @returns {void}
       * @author Chorin <xiaolinxuan@foxmail.com>
       * @date 2020-03-09
       */
      async getOperateLogList(pageNo, pageSize,searchOptions = {}){
        let conditions = [], logList = [], total = 0;
        for(let i in searchOptions){
          searchOptions[i] && conditions.push({
            name: i,
            op: "eq",
            value: searchOptions[i]
          });
        }
        await this.$http({
          method: 'post',
          url: 'cmd/v1/cmd/operateLog/list',
          data: {
            page: pageNo,
            pageSize: pageSize,
            sortDirection: 'desc',
            sortProperties: 'operateTime',
            searchParas: {
              conditions
            },
          }
        }).then(result => {
          logList = result && result.list || [];
          total = result && result.totalNum || 0;
        });
        return {logList, total};
      },

      /**
       * 页数变更
       * @returns {void}
       * @author Chorin <xiaolinxuan@foxmail.com>
       * @date 2020-03-09
       */
      pageChangeHandler(){
        this.initView();
      },

      openDetailHandler(v){
        console.log("##日志##", v);
      },
    },
  }
</script>
<style lang="less" scoped>
 .operate-log-modal-root{

  }
</style>