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
    <h1>多级表格编辑</h1>
    <div>
      <div>季度选择:{{ currentMonth }}</div>
      <div>
        <button @click="changeMonth(2)">2季度</button>
        <button @click="changeMonth(3)">3季度</button>
        <button @click="changeMonth(4)">4季度</button>
      </div>
      <div>多级指标:{{ currentGrade }}</div>
      <div>
        <button @click="changeGrade(2)">2级指标</button>
        <button @click="changeGrade(3)">3级指标</button>
        <button @click="changeGrade(4)">4级指标</button>
      </div>
    </div>
    <GradeTable
      ref="gradeTable"
      :column="gradeColumns"
      :tableData="gradeData"
    ></GradeTable>
    <!-- <RowTable :column="gradeColumns" :tableData="gradeData"></RowTable> -->
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
    RowTable: () => import("@/components/Table/RowTable/RowTable"),
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
      gradeColumns: [],
      gradeData: [],
      currentMonth: 3,
      currentGrade: 4,
    };
  },
  methods: {
    onDo(val) {
      console.log("co ->", val);
    },
    changeMonth(type) {
      this.currentMonth = type;
      this.refreshGradeTable(this.currentMonth, this.currentGrade);
    },
    changeGrade(type) {
      this.currentGrade = type;
      this.refreshGradeTable(this.currentMonth, this.currentGrade);
    },
    refreshMonthTable(month, grade) {
      let gradeArr = [];
      for (let i = 0; i < grade; i++) {
        gradeArr.push({ title: i + 1 + "级目标", children: [] });
      }

      let monthArr = [];
      for (let i = 0; i < month; i++) {
        monthArr.push({
          title: i + 1 + "季度",
          children: [
            { title: "计划目标", children: [] },
            { title: "完成值", children: [] },
            { title: "完成率", children: [] },
          ],
        });
      }

      let otherArr = [
        { title: "权重设置", children: [] },
        { title: "分数设置", children: [] },
      ];

      this.gradeColumns = [...gradeArr, ...monthArr, ...otherArr];
      this.$refs.gradeTable.initGradeTable();
    },
    refreshGradeTable(month, grade) {
      let gradeArr = [];
      let gradeDataArr = [];
      for (let i = 0; i < grade; i++) {
        gradeArr.push({ title: i + 1 + "级目标", children: [] });
      }

      let monthArr = [];
      let monthDataArr = [];
      for (let i = 0; i < month; i++) {
        monthArr.push({
          title: i + 1 + "季度",
          children: [
            { title: "计划目标", children: [] },
            { title: "完成值", children: [] },
            { title: "完成率", children: [] },
          ],
        });
        monthDataArr.push(
          ...[
            { title: "计划目标", children: [] },
            { title: "完成值", children: [] },
            { title: "完成率", children: [] },
          ]
        );
      }

      let otherArr = [
        { title: "权重设置", children: [] },
        { title: "分数设置", children: [] },
      ];

      function childDepth(level = 0) {
        if (level === 0) {
          return {
            title: "-",
            children: [],
            infos: [...monthDataArr, ...otherArr],
          };
        } else {
          return {
            children: [childDepth(level - 1)],
          };
        }
      }
      gradeDataArr = [childDepth(grade - 1)];

      this.gradeColumns = [...gradeArr, ...monthArr, ...otherArr];
      this.gradeData = gradeDataArr;
      this.$forceUpdate();
      if (this.$refs.gradeTable)
        this.$refs.gradeTable.initGradeTable(this.gradeColumns, this.gradeData);
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.changeMonth(this.currentMonth);
    });
    // const column = [
    //   { title: "一级目标", children: [] },
    //   { title: "二级目标", children: [] },
    //   { title: "三级目标", children: [] },
    //   {
    //     title: "1季度",
    //     children: [
    //       { title: "计划目标", children: [] },
    //       { title: "完成值", children: [] },
    //       { title: "完成率", children: [] },
    //     ],
    //   },
    //   {
    //     title: "2季度",
    //     children: [
    //       { title: "计划目标", children: [] },
    //       { title: "完成值", children: [] },
    //       { title: "完成率", children: [] },
    //     ],
    //   },
    //   {
    //     title: "3季度",
    //     children: [
    //       { title: "计划目标", children: [] },
    //       { title: "完成值", children: [] },
    //       { title: "完成率", children: [] },
    //     ],
    //   },
    //   {
    //     title: "4季度",
    //     children: [
    //       { title: "计划目标", children: [] },
    //       { title: "完成值", children: [] },
    //       { title: "完成率", children: [] },
    //     ],
    //   },
    //   { title: "权重设置", children: [] },
    //   { title: "分数设置", children: [] },
    // ];
    // this.gradeColumns = column;
    // const grade = [
    //   {
    //     title: "一级目标内容一",
    //     children: [
    //       {
    //         title: "二级目标内容一",
    //         children: [
    //           {
    //             title: "三级目标内容一",
    //             infos: [
    //               { title: "1季度计划目标", children: [] },
    //               { title: "1季度完成值", children: [] },
    //               { title: "1季度完成率", children: [] },
    //               { title: "2季度计划目标", children: [] },
    //               { title: "2季度完成值", children: [] },
    //               { title: "2季度完成率", children: [] },
    //               { title: "3季度计划目标", children: [] },
    //               { title: "3季度完成值", children: [] },
    //               { title: "3季度完成率", children: [] },
    //               { title: "4季度计划目标", children: [] },
    //               { title: "4季度完成值", children: [] },
    //               { title: "4季度完成率", children: [] },
    //               { title: "权重设置", children: [] },
    //               { title: "分数", children: [] },
    //             ],
    //           },
    //           {
    //             title: "三级目标内容二",
    //             infos: [
    //               { title: "1季度计划目标", children: [] },
    //               { title: "1季度完成值", children: [] },
    //               { title: "1季度完成率", children: [] },
    //               { title: "2季度计划目标", children: [] },
    //               { title: "2季度完成值", children: [] },
    //               { title: "2季度完成率", children: [] },
    //               { title: "3季度计划目标", children: [] },
    //               { title: "3季度完成值", children: [] },
    //               { title: "3季度完成率", children: [] },
    //               { title: "4季度计划目标", children: [] },
    //               { title: "4季度完成值", children: [] },
    //               { title: "4季度完成率", children: [] },
    //               { title: "权重设置", children: [] },
    //               { title: "分数", children: [] },
    //             ],
    //           },
    //         ],
    //       },
    //       {
    //         title: "二级目标内容二",
    //         children: [
    //           {
    //             title: "三级目标内容三",
    //             infos: [
    //               { title: "1季度计划目标", children: [] },
    //               { title: "1季度完成值", children: [] },
    //               { title: "1季度完成率", children: [] },
    //               { title: "2季度计划目标", children: [] },
    //               { title: "2季度完成值", children: [] },
    //               { title: "2季度完成率", children: [] },
    //               { title: "3季度计划目标", children: [] },
    //               { title: "3季度完成值", children: [] },
    //               { title: "3季度完成率", children: [] },
    //               { title: "4季度计划目标", children: [] },
    //               { title: "4季度完成值", children: [] },
    //               { title: "4季度完成率", children: [] },
    //               { title: "权重设置", children: [] },
    //               { title: "分数", children: [] },
    //             ],
    //           },
    //         ],
    //       },
    //     ],
    //   },
    //   {
    //     title: "一级目标内容二",
    //     children: [
    //       {
    //         title: "二级目标内容A",
    //         children: [
    //           {
    //             title: "三级目标内容A",
    //             infos: [
    //               { title: "1季度计划目标", children: [] },
    //               { title: "1季度完成值", children: [] },
    //               { title: "1季度完成率", children: [] },
    //               { title: "2季度计划目标", children: [] },
    //               { title: "2季度完成值", children: [] },
    //               { title: "2季度完成率", children: [] },
    //               { title: "3季度计划目标", children: [] },
    //               { title: "3季度完成值", children: [] },
    //               { title: "3季度完成率", children: [] },
    //               { title: "4季度计划目标", children: [] },
    //               { title: "4季度完成值", children: [] },
    //               { title: "4季度完成率", children: [] },
    //               { title: "权重设置", children: [] },
    //               { title: "分数", children: [] },
    //             ],
    //           },
    //         ],
    //       },
    //       {
    //         title: "二级目标内容B",
    //         children: [
    //           {
    //             title: "三级目标内容B",
    //             infos: [
    //               { title: "1季度计划目标", children: [] },
    //               { title: "1季度完成值", children: [] },
    //               { title: "1季度完成率", children: [] },
    //               { title: "2季度计划目标", children: [] },
    //               { title: "2季度完成值", children: [] },
    //               { title: "2季度完成率", children: [] },
    //               { title: "3季度计划目标", children: [] },
    //               { title: "3季度完成值", children: [] },
    //               { title: "3季度完成率", children: [] },
    //               { title: "4季度计划目标", children: [] },
    //               { title: "4季度完成值", children: [] },
    //               { title: "4季度完成率", children: [] },
    //               { title: "权重设置", children: [] },
    //               { title: "分数", children: [] },
    //             ],
    //           },
    //         ],
    //       },
    //       {
    //         title: "二级目标内容C",
    //         children: [
    //           {
    //             title: "三级目标内容C",
    //             children: [],
    //             infos: [
    //               { title: "1季度计划目标", children: [] },
    //               { title: "1季度完成值", children: [] },
    //               { title: "1季度完成率", children: [] },
    //               { title: "2季度计划目标", children: [] },
    //               { title: "2季度完成值", children: [] },
    //               { title: "2季度完成率", children: [] },
    //               { title: "3季度计划目标", children: [] },
    //               { title: "3季度完成值", children: [] },
    //               { title: "3季度完成率", children: [] },
    //               { title: "4季度计划目标", children: [] },
    //               { title: "4季度完成值", children: [] },
    //               { title: "4季度完成率", children: [] },
    //               { title: "权重设置", children: [] },
    //               { title: "分数", children: [] },
    //             ],
    //           },
    //         ],
    //       },
    //     ],
    //   },
    //   {
    //     title: "一级目标内容三",
    //     children: [
    //       {
    //         title: "二级目标内容1",
    //         children: [
    //           {
    //             title: "三级目标内容1",
    //             infos: [
    //               { title: "1季度计划目标", children: [] },
    //               { title: "1季度完成值", children: [] },
    //               { title: "1季度完成率", children: [] },
    //               { title: "2季度计划目标", children: [] },
    //               { title: "2季度完成值", children: [] },
    //               { title: "2季度完成率", children: [] },
    //               { title: "3季度计划目标", children: [] },
    //               { title: "3季度完成值", children: [] },
    //               { title: "3季度完成率", children: [] },
    //               { title: "4季度计划目标", children: [] },
    //               { title: "4季度完成值", children: [] },
    //               { title: "4季度完成率", children: [] },
    //               { title: "权重设置", children: [] },
    //               { title: "分数", children: [] },
    //             ],
    //           },
    //         ],
    //       },
    //     ],
    //   },
    //   {
    //     title: "一级目标内容三",
    //     children: [],
    //     infos: [
    //       { title: "1季度计划目标", children: [] },
    //       { title: "1季度完成值", children: [] },
    //       { title: "1季度完成率", children: [] },
    //       { title: "2季度计划目标", children: [] },
    //       { title: "2季度完成值", children: [] },
    //       { title: "2季度完成率", children: [] },
    //       { title: "3季度计划目标", children: [] },
    //       { title: "3季度完成值", children: [] },
    //       { title: "3季度完成率", children: [] },
    //       { title: "4季度计划目标", children: [] },
    //       { title: "4季度完成值", children: [] },
    //       { title: "4季度完成率", children: [] },
    //       { title: "权重设置", children: [] },
    //       { title: "分数", children: [] },
    //     ],
    //   },
    //   {
    //     title: "一级目标内容四",
    //     children: [],
    //     infos: [],
    //   },
    //   {
    //     title: "一级目标内容四",
    //     children: [],
    //     infos: [],
    //   },
    //   {
    //     title: "一级目标内容四",
    //     children: [],
    //     infos: [],
    //   },
    //   {
    //     title: "一级目标内容四",
    //     children: [],
    //     infos: [],
    //   },
    //   {
    //     title: "一级目标内容四",
    //     children: [],
    //     infos: [],
    //   },
    //   {
    //     title: "一级目标内容四",
    //     children: [
    //       {
    //         title: "二级目标内容四",
    //         children: [],
    //         infos: [],
    //       },
    //     ],
    //     infos: [],
    //   },
    // ];
    // this.gradeData = grade;
    // const basicData = [
    //   {
    //     oneGrade: "成本管理",
    //     oneGradeKey: "162891516624718",
    //     secondGrade: "成本预算分析工作",
    //     secondGradeKey: "16289153214718",
    //     thridGrade: "控制项目总成本",
    //     thridGradeKey: "16289131214718",
    //     planA: "1200w",
    //     planB: "1300w",
    //   },
    //   {
    //     oneGrade: "成本管理",
    //     oneGradeKey: "162891516624718",
    //     secondGrade: "成本预算分析工作",
    //     secondGradeKey: "16289153214718",
    //     thridGrade: "每月成本控制",
    //     thridGradeKey: "16289131214718",
    //     planA: "是",
    //     planB: "是",
    //   },
    // ];
    // const levelData = [
    //   {
    //     grade: [
    //       {
    //         label: "成本管理",
    //         level: 0,
    //         childNum: 2,
    //         rowCount: 3,
    //         colCount: 1,
    //         children: ["idA", "idB"],
    //         childDepth: 2,
    //         rowNum: 0,
    //         colNum: 0,
    //       },
    //       {
    //         label: "成本预算分析工作",
    //         level: 1,
    //         childNum: 2,
    //         rowCount: 2,
    //         colCount: 1,
    //         children: ["idA", "idB"],
    //         childDepth: 1,
    //         rowNum: 0,
    //         colNum: 1,
    //       },
    //       {
    //         label: "控制项目总成本",
    //         level: 2,
    //         childNum: 0,
    //         rowCount: 1,
    //         colCount: 1,
    //         children: [],
    //         childDepth: 2,
    //         rowNum: 0,
    //         colNum: 2,
    //       },
    //     ],
    //     plan: [
    //       { label: "1200w", grade: 0 },
    //       { label: "1200w", grade: 1 },
    //       { label: "1200w", grade: 2 },
    //       { label: "1200w", grade: 4 },
    //     ],
    //     scored: "",
    //     calc: "",
    //     weight: "",
    //     other: "……",
    //   },
    //   {
    //     grade: [
    //       {
    //         label: "成本管理",
    //         level: 0,
    //         childNum: 2,
    //         children: ["idA", "idB"],
    //         childDepth: 2,
    //         rowNum: 1,
    //       },
    //       {
    //         label: "成本预算编制工作",
    //         level: 1,
    //         childNum: 1,
    //         children: ["idA"],
    //         childDepth: 1,
    //         rowNum: 1,
    //       },
    //       {
    //         label: "控制项目总成本",
    //         level: 2,
    //         childNum: 0,
    //         childDepth: 2,
    //         rowNum: 1,
    //       },
    //     ],
    //     plan: [
    //       { label: "1200w", grade: 0 },
    //       { label: "1200w", grade: 1 },
    //       { label: "1200w", grade: 2 },
    //       { label: "1200w", grade: 4 },
    //     ],
    //     scored: "",
    //     calc: "",
    //     weight: "",
    //     other: "……",
    //   },
    // ];
  },
};
</script>

<style lang="less" scoped></style>
