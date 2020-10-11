<template>
    <div class="base-crud-tools">
        <div class="base-crud-tools-left">
            <slot name="left-start"></slot>
            <a-input-search v-if="search" :placeholder="'查询' + placeholder" :style="{width: searchWidth + 'px'}" @search="onSearch" />
            <slot name="left"></slot>
        </div>
        <div class="base-crud-tools-right">
            <slot name="right-start"></slot>
            <a-button v-if="add" class="base-crud-tools-right-btn" icon="search" type="primary" @click="onAdd">新建</a-button>
            <a-button v-if="download" class="base-crud-tools-right-btn" icon="download" type="primary" @click="onDownLoad">批量下载</a-button>
            <slot name="right"></slot>
            <a-button v-if="refresh" icon="sync" type="primary" @click="onRefresh">刷新</a-button>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        search: {
            type: Boolean,
            default: false
        },
        searchWidth: {
            type: Number,
            default: 200
        },
        placeholder: {
            type: String,
            default: ""
        },
        add: {
            type: Boolean,
            default: false
        },
        download: {
            type: Boolean,
            default: false
        },
        refresh: {
            type: Boolean,
            default: false
        }
    },
    methods:{
        onSearch(val){
            this.$emit("on-search", val);
        },
        onAdd(){
            this.$emit("on-add");
        },
        onDownLoad(){
            this.$emit("on-download");
        },
        onRefresh(){
            this.$emit("on-refresh");
        }
    }
    
}
</script>
<style lang="less" scoped>
.base-crud-tools {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    &-left {
        flex: 1;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
    }

    &-right {
        width: auto;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
    }
}
</style>
<style lang="less">
.base-crud-tools {
    &-left {
        &-btn {
            margin-left: 10px;
        }
    }
    &-right {
        &-btn {
            margin-right: 10px;
        }
    }
}
</style>