<template>
    <div class="crud-full">
        <CrudTools class="crud-full crud-mb-10" search add download refresh 
        @on-search="onSearch" 
        @on-add="onAdd" 
        @on-download="onDownLoad" 
        @on-refresh="onRefresh">
             <template slot="left-start">
                 <slot name="left-start"></slot>
             </template>
             <template slot="left">
                 <slot name="left"></slot>
             </template>
             <template slot="right-start">
                 <slot name="right-start"></slot>
             </template>
            <template slot="right">
                <slot name="right"></slot>
            </template>
        </CrudTools>
        <div class="crud-full">
            <a-table class="crud-mb-10" :columns="tableColumns" :data-source="tableData" :scroll="{ x: 1500, y: 300 }" bordered :pagination="false">
                <template slot="action" slot-scope="record">
                    <a-button v-if="edit" :disabled="record.editing" icon="form" type="primary" @click="onEdit(record)">编辑</a-button>
                    <slot name="tool" :cell="record"></slot>
                </template>
            </a-table>
            <div class="crud-center">
                <a-pagination
                v-model="current"
                :page-size-options="pageSizeOptions"
                :total="total"
                show-size-changer
                show-quick-jumper
                :page-size="pageSize"
                @showSizeChange="onShowSizeChange"
            >
                <template slot="buildOptionText" slot-scope="props">
                <span v-if="props.value !== '50'">{{ props.value }}条/页</span>
                <span v-if="props.value === '50'">全部</span>
                </template>
            </a-pagination>
            </div>
        </div>
        <a-modal v-model="modelFlag" :title="modelStatus + title" @ok="handleOk">
            <slot name="add"></slot>
            <slot name="edit"></slot>
        </a-modal>
    </div>
</template>
<script>
import CrudTable from "./CrudTable";
import CrudTools from "./CrudTools";
export default {
    props:{
        title: {
            type: String,
            default: ""
        },
        // columns: {
        //     type: Array,
        //     default: []
        // },
        // crudData: {
        //     type: Array,
        //     default: []
        // }
        edit: {
            type: Boolean,
            default: false
        }
    },
    components:{
        CrudTable,CrudTools
    },
    data() {
        return {
            tableColumns: [],
            tableData: [],

            modelFlag: false,
            modelStatus: '新建',

            pageSizeOptions: ['10', '20', '30', '40', '50'],
            current: 1,
            pageSize: 10,
            total: 50,
        }
    },
    mounted(){
        // this.tableColumns = this.columns;
        // this.tableData = this.table;

const columns = [
  { title: 'Full Name', width: 100, dataIndex: 'name', key: 'name', fixed: 'left' },
  { title: 'Age', width: 100, dataIndex: 'age', key: 'age', fixed: 'left' },
  { title: 'Column 1', dataIndex: 'address', key: '1', width: 150 },
  { title: 'Column 2', dataIndex: 'address', key: '2', width: 150 },
  { title: 'Column 3', dataIndex: 'address', key: '3', width: 150 },
  { title: 'Column 4', dataIndex: 'address', key: '4', width: 150 },
  { title: 'Column 5', dataIndex: 'address', key: '5', width: 150 },
  { title: 'Column 6', dataIndex: 'address', key: '6', width: 150 },
  { title: 'Column 7', dataIndex: 'address', key: '7', width: 150 },
//   { title: 'Column 8', dataIndex: 'address', key: '8' },
  {
    title: 'Action',
    key: 'operation',
    fixed: 'right',
    width: 200,
    scopedSlots: { customRender: 'action' },
  },
];

const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  });
}
        this.tableColumns = columns;
        this.tableData = data;
    },
    methods:{
        onSearch(val){
            console.log("search ->", val);
            this.$emit("on-search", val);
        },
        onAdd(){
            this.$emit("on-add");
            this.modelStatus = "新建";
            this.modelFlag = true;
        },
        onEdit(val){
            console.log("edit ->", val);
            this.$emit("on-edit",val);
            this.modelStatus = "编辑";
            this.modelFlag = true;
        },
        onDownLoad(){

        },
        onRefresh(){

        },
        handleOk(){
            this.modelFlag = false;
        },
        onShowSizeChange(current, pageSize) {
            this.pageSize = pageSize;
        },
    }
}
</script>
<style lang="less" scoped>
.crud{
    &-full {
        width: 100%;
    }
    &-mb {
        &-10 {
            margin-bottom: 10px;
        }
    }
    &-center {
        margin: 0 auto;
        text-align: center;
    }
}
</style>