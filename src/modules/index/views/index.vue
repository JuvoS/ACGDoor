<template>
  <div style="width: 100%;height:100%;">
    <!-- <img-content></img-content>
    <img-content offset="right"></img-content>-->
    <!-- <TitleWrap></TitleWrap> -->
    <!-- <AutoHeader></AutoHeader> -->
    <!-- <BaseGraph ref="pregraph" style="width:100%;height:500px;"></BaseGraph> -->
    <!-- <MixanBoard style="width:100%;height:400px"></MixanBoard> -->
    <!-- <DrawDemo></DrawDemo> -->
    <!-- <h1>模拟数据请求</h1>
    <a-row style="margin:10px 5px" :gutter="[10,10]">
      <a-col :span="24">
        <a-input addon-before="默认Url:" v-model="defaultUrl" />
      </a-col>
      <a-col :span="6">
        <a-input addon-before="新建Url:" v-model="addUrl" />
        <a-input addon-before="编辑Url:" v-model="editUrl" />
        <a-input addon-before="删除Url:" v-model="delUrl" />
        <a-input addon-before="列表Url:" v-model="listUrl" />
        <a-input addon-before="单条Url:" v-model="oneUrl" />
      </a-col>
      <a-col :span="12">
        <a-textarea
          addon-before="展示列"
          v-model="showColomns"
          placeholder="展示列内容"
          :auto-size="{ minRows: 3, maxRows: 5 }"
        />
      </a-col>
    </a-row>
    <div style="margin:10px">
    <BaseCrud edit >
      <template slot="tool" slot-scope="cell">
        <a-button type="primary" style="margin-left:5px" @click="onDo(cell)">操作</a-button>
      </template>
    </BaseCrud>
    <div id="page">
      <ATree></ATree>
    </div>
    </div> -->
    <!-- <button @click="isShowBTree = !isShowBTree">
      {{ isShowBTree ? "B Tree" : "C Tree" }}
    </button> -->
    <!-- <ATreeB v-if="isShowBTree"></ATreeB>
    <ATreeC v-if="!isShowBTree"></ATreeC> -->
    <!-- <BasicTree></BasicTree> -->
    <GradeTable></GradeTable>
  </div>
</template>

<script>
// import BaseGraph from "@/components/Graph/base";
export default {
  props: {
    title: {
      type: String,
      default: "this",
    },
  },
  components: {
    // ImgContent: () => import("@/components/ImgContent")
    TitleWrap: () => import("@/components/Title"),
    AutoHeader: () => import("@/components/BaseBoard/AutoHeader"),
    MixanBoard: () => import("@/components/BaseBoard/Mixan"),
    DrawDemo: () => import("@/components/Draw/Demo"),
    BaseCrud: () => import("@/components/BaseCrud"),
    ATree: () => import("@/components/ATree"),
    ATreeB: () => import("@/components/ATree/ATreeB"),
    ATreeC: () => import("@/components/ATree/ATreeC"),
    BasicTree: () => import("@/components/ATree/BasicTree"),
    GradeTable: () => import("@/components/Table/GradeTable"),
    // BaseGraph,
  },
  data() {
    return {
      defaultUrl: "",
      addUrl: "",
      editUrl: "",
      delUrl: "",
      listUrl: "",
      oneUrl: "",
      isShowBTree: false,
      showColomns: "",
    };
  },
  methods: {
    onDo(val) {
      console.log("co ->", val);
    },
  },
  mounted() {
    const column = [
      { name: "一级目标", key: "one_level" },
      { name: "二级目标", key: "one_level" },
      { name: "三级目标", key: "one_level" },
      { name: "1季度计划目标", key: "one_level" },
      { name: "2季度计划目标", key: "one_level" },
    ];

    const basicData = [
      {
        oneGrade: "成本管理",
        oneGradeKey: "162891516624718",
        secondGrade: "成本预算分析工作",
        secondGradeKey: "16289153214718",
        thridGrade: "控制项目总成本",
        thridGradeKey: "16289131214718",
        planA: "1200w",
        planB: "1300w",
      },
      {
        oneGrade: "成本管理",
        oneGradeKey: "162891516624718",
        secondGrade: "成本预算分析工作",
        secondGradeKey: "16289153214718",
        thridGrade: "每月成本控制",
        thridGradeKey: "16289131214718",
        planA: "是",
        planB: "是",
      },
    ];

    const levelData = [
      {
        grade: [
          {
            label: "成本管理",
            level: 0,
            childNum: 2,
            rowCount: 3,
            colCount: 1,
            children: ["idA", "idB"],
            childDepth: 2,
            rowNum: 0,
            colNum: 0,
          },
          {
            label: "成本预算分析工作",
            level: 1,
            childNum: 2,
            rowCount: 2,
            colCount: 1,
            children: ["idA", "idB"],
            childDepth: 1,
            rowNum: 0,
            colNum: 1,
          },
          {
            label: "控制项目总成本",
            level: 2,
            childNum: 0,
            rowCount: 1,
            colCount: 1,
            children: [],
            childDepth: 2,
            rowNum: 0,
            colNum: 2,
          },
        ],
        plan: [
          { label: "1200w", grade: 0 },
          { label: "1200w", grade: 1 },
          { label: "1200w", grade: 2 },
          { label: "1200w", grade: 4 },
        ],
        scored: "",
        calc: "",
        weight: "",
        other: "……",
      },
      {
        grade: [
          {
            label: "成本管理",
            level: 0,
            childNum: 2,
            children: ["idA", "idB"],
            childDepth: 2,
            rowNum: 1,
          },
          {
            label: "成本预算编制工作",
            level: 1,
            childNum: 1,
            children: ["idA"],
            childDepth: 1,
            rowNum: 1,
          },
          {
            label: "控制项目总成本",
            level: 2,
            childNum: 0,
            childDepth: 2,
            rowNum: 1,
          },
        ],
        plan: [
          { label: "1200w", grade: 0 },
          { label: "1200w", grade: 1 },
          { label: "1200w", grade: 2 },
          { label: "1200w", grade: 4 },
        ],
        scored: "",
        calc: "",
        weight: "",
        other: "……",
      },
    ];
  },
};
</script>

<style lang="less" scoped></style>
