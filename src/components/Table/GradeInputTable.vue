<template>
  <table border="1">
    <thead>
      <template v-for="(columns, index) in tableColumn">
        <tr :key="index">
          <th
            v-for="(cell, key) in columns"
            :key="index + '_' + key"
            :rowspan="cell.rowNum ? cell.rowNum : 1"
            :colspan="cell.colNum ? cell.colNum : 1"
            class="table-thead table-cell"
          >
            {{ cell.title }}
          </th>
        </tr>
      </template>
    </thead>

    <tbody>
      <template v-for="(columns, index) in tableArr">
        <tr :key="index">
          <td
            v-for="(cell, key) in columns"
            :key="index + '_' + key"
            :rowspan="cell.rowNum ? cell.rowNum : 1"
            :colspan="cell.colNum ? cell.colNum : 1"
            class="table-cell"
            @dblclick="edit(index, key)"
          >
            <span v-if="!cell.editing">{{ cell.title }}</span>
            <input
              type="text"
              class="form-control"
              ref="input"
              v-if="cell.editing"
              v-model="cell.title"
              @blur="save(index, key)"
            />
          </td>
        </tr>
      </template>
    </tbody>
  </table>
</template>
<script>
export default {
  props: {
    column: {
      type: Array,
      default: [],
    },
    tableData: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      tableColumn: [],
      tableArr: [],
    };
  },
  mounted() {
    this.tableColumn = this.formateColumn(this.column);
    this.tableArr = this.formateGrade(this.tableData);

    // this.tableArr = [
    //   [
    //     { title: "成本管理", colNum: 1, rowNum: 3 },
    //     { title: "成本预算分析工作", colNum: 1, rowNum: 2 },
    //     { title: "控制项目总成本", colNum: 1, rowNum: 1 },
    //     { title: "1200万", colNum: 1, rowNum: 1 },
    //     { title: "1000万", colNum: 1, rowNum: 1 },
    //     { title: "80%", colNum: 1, rowNum: 1 },
    //     { title: "正常推进中", colNum: 1, rowNum: 1 },

    //     { title: "1200万", colNum: 1, rowNum: 1 },
    //     { title: "1000万", colNum: 1, rowNum: 1 },
    //     { title: "80%", colNum: 1, rowNum: 1 },
    //     { title: "正常推进中", colNum: 1, rowNum: 1 },

    //     { title: "1200万", colNum: 1, rowNum: 1 },
    //     { title: "1000万", colNum: 1, rowNum: 1 },
    //     { title: "80%", colNum: 1, rowNum: 1 },
    //     { title: "正常推进中", colNum: 1, rowNum: 1 },

    //     { title: "1200万", colNum: 1, rowNum: 1 },
    //     { title: "-", colNum: 1, rowNum: 1 },
    //     { title: "-", colNum: 1, rowNum: 1 },
    //     { title: "-", colNum: 1, rowNum: 1 },

    //     { title: "50", colNum: 1, rowNum: 1 },
    //     { title: "18", colNum: 1, rowNum: 1 },
    //     { title: "查看公式", colNum: 1, rowNum: 1 },
    //     { title: "15%", colNum: 1, rowNum: 1 },
    //   ],
    //   [
    //     { title: "每月28号前提供成本控制", colNum: 1, rowNum: 1 },
    //     { title: "3月会议决定", colNum: 1, rowNum: 1 },
    //     { title: "开展会议", colNum: 1, rowNum: 1 },
    //     { title: "100%", colNum: 1, rowNum: 1 },
    //     { title: "已完成", colNum: 1, rowNum: 1 },

    //     { title: "3月会议决定", colNum: 1, rowNum: 1 },
    //     { title: "开展会议", colNum: 1, rowNum: 1 },
    //     { title: "100%", colNum: 1, rowNum: 1 },
    //     { title: "已完成", colNum: 1, rowNum: 1 },

    //     { title: "3月会议决定", colNum: 1, rowNum: 1 },
    //     { title: "开展会议", colNum: 1, rowNum: 1 },
    //     { title: "100%", colNum: 1, rowNum: 1 },
    //     { title: "已完成", colNum: 1, rowNum: 1 },

    //     { title: "1200万", colNum: 1, rowNum: 1 },
    //     { title: "-", colNum: 1, rowNum: 1 },
    //     { title: "-", colNum: 1, rowNum: 1 },
    //     { title: "-", colNum: 1, rowNum: 1 },

    //     { title: "50", colNum: 1, rowNum: 1 },
    //     { title: "18", colNum: 1, rowNum: 1 },
    //     { title: "查看公式", colNum: 1, rowNum: 1 },
    //     { title: "15%", colNum: 1, rowNum: 1 },
    //   ],
    //   [
    //     { title: "成本预算编制工作", colNum: 1, rowNum: 1 },
    //     { title: "根据项目的进度，按需完", colNum: 1, rowNum: 1 },
    //     { title: "文档建设", colNum: 1, rowNum: 1 },
    //     { title: "是", colNum: 1, rowNum: 1 },
    //     { title: "100%", colNum: 1, rowNum: 1 },
    //     { title: "已完成", colNum: 1, rowNum: 1 },

    //     { title: "文档建设", colNum: 1, rowNum: 1 },
    //     { title: "是", colNum: 1, rowNum: 1 },
    //     { title: "100%", colNum: 1, rowNum: 1 },
    //     { title: "已完成", colNum: 1, rowNum: 1 },

    //     { title: "文档建设", colNum: 1, rowNum: 1 },
    //     { title: "是", colNum: 1, rowNum: 1 },
    //     { title: "100%", colNum: 1, rowNum: 1 },
    //     { title: "已完成", colNum: 1, rowNum: 1 },

    //     { title: "1200万", colNum: 1, rowNum: 1 },
    //     { title: "-", colNum: 1, rowNum: 1 },
    //     { title: "-", colNum: 1, rowNum: 1 },
    //     { title: "-", colNum: 1, rowNum: 1 },

    //     { title: "50", colNum: 1, rowNum: 1 },
    //     { title: "18", colNum: 1, rowNum: 1 },
    //     { title: "查看公式", colNum: 1, rowNum: 1 },
    //     { title: "15%", colNum: 1, rowNum: 1 },
    //   ],
    //   [
    //     { title: "回款达成率", colNum: 1, rowNum: 3 },
    //     { title: "资金计划", colNum: 1, rowNum: 3 },
    //     { title: "目标回款完成额", colNum: 1, rowNum: 1 },
    //     { title: "11200万", colNum: 1, rowNum: 1 },
    //     { title: "971万", colNum: 1, rowNum: 1 },
    //     { title: "56%", colNum: 1, rowNum: 1 },
    //     { title: "按计划推进", colNum: 1, rowNum: 1 },

    //     { title: "11200万", colNum: 1, rowNum: 1 },
    //     { title: "971万", colNum: 1, rowNum: 1 },
    //     { title: "56%", colNum: 1, rowNum: 1 },
    //     { title: "按计划推进", colNum: 1, rowNum: 1 },

    //     { title: "11200万", colNum: 1, rowNum: 1 },
    //     { title: "971万", colNum: 1, rowNum: 1 },
    //     { title: "56%", colNum: 1, rowNum: 1 },
    //     { title: "按计划推进", colNum: 1, rowNum: 1 },

    //     { title: "1200万", colNum: 1, rowNum: 1 },
    //     { title: "-", colNum: 1, rowNum: 1 },
    //     { title: "-", colNum: 1, rowNum: 1 },
    //     { title: "-", colNum: 1, rowNum: 1 },

    //     { title: "50", colNum: 1, rowNum: 1 },
    //     { title: "18", colNum: 1, rowNum: 1 },
    //     { title: "查看公式", colNum: 1, rowNum: 1 },
    //     { title: "15%", colNum: 1, rowNum: 1 },
    //   ],
    //   [
    //     { title: "支付计划", colNum: 1, rowNum: 1 },
    //     { title: "2700万", colNum: 1, rowNum: 1 },
    //     { title: "875万", colNum: 1, rowNum: 1 },
    //     { title: "38%", colNum: 1, rowNum: 1 },
    //     { title: "按计划推进", colNum: 1, rowNum: 1 },

    //     { title: "2700万", colNum: 1, rowNum: 1 },
    //     { title: "875万", colNum: 1, rowNum: 1 },
    //     { title: "38%", colNum: 1, rowNum: 1 },
    //     { title: "按计划推进", colNum: 1, rowNum: 1 },

    //     { title: "2700万", colNum: 1, rowNum: 1 },
    //     { title: "875万", colNum: 1, rowNum: 1 },
    //     { title: "38%", colNum: 1, rowNum: 1 },
    //     { title: "按计划推进", colNum: 1, rowNum: 1 },

    //     { title: "1200万", colNum: 1, rowNum: 1 },
    //     { title: "-", colNum: 1, rowNum: 1 },
    //     { title: "-", colNum: 1, rowNum: 1 },
    //     { title: "-", colNum: 1, rowNum: 1 },

    //     { title: "50", colNum: 1, rowNum: 1 },
    //     { title: "18", colNum: 1, rowNum: 1 },
    //     { title: "查看公式", colNum: 1, rowNum: 1 },
    //     { title: "15%", colNum: 1, rowNum: 1 },
    //   ],
    //   [
    //     { title: "资金收支净额", colNum: 1, rowNum: 1 },
    //     { title: "12000万", colNum: 1, rowNum: 1 },
    //     { title: "5030万", colNum: 1, rowNum: 1 },
    //     { title: "50%", colNum: 1, rowNum: 1 },
    //     { title: "按计划推进", colNum: 1, rowNum: 1 },

    //     { title: "12000万", colNum: 1, rowNum: 1 },
    //     { title: "5030万", colNum: 1, rowNum: 1 },
    //     { title: "50%", colNum: 1, rowNum: 1 },
    //     { title: "按计划推进", colNum: 1, rowNum: 1 },

    //     { title: "12000万", colNum: 1, rowNum: 1 },
    //     { title: "5030万", colNum: 1, rowNum: 1 },
    //     { title: "50%", colNum: 1, rowNum: 1 },
    //     { title: "按计划推进", colNum: 1, rowNum: 1 },

    //     { title: "1200万", colNum: 1, rowNum: 1 },
    //     { title: "-", colNum: 1, rowNum: 1 },
    //     { title: "-", colNum: 1, rowNum: 1 },
    //     { title: "-", colNum: 1, rowNum: 1 },

    //     { title: "50", colNum: 1, rowNum: 1 },
    //     { title: "18", colNum: 1, rowNum: 1 },
    //     { title: "查看公式", colNum: 1, rowNum: 1 },
    //     { title: "15%", colNum: 1, rowNum: 1 },
    //   ],
    //   [
    //     { title: "负面清单", colNum: 3, rowNum: 1 },
    //     { title: "项目负面清单", colNum: 1, rowNum: 1 },
    //     { title: "未出现", colNum: 1, rowNum: 1 },
    //     { title: "未出现", colNum: 1, rowNum: 1 },
    //     { title: "-", colNum: 1, rowNum: 1 },

    //     { title: "项目负面清单", colNum: 1, rowNum: 1 },
    //     { title: "未出现", colNum: 1, rowNum: 1 },
    //     { title: "未出现", colNum: 1, rowNum: 1 },
    //     { title: "-", colNum: 1, rowNum: 1 },

    //     { title: "项目负面清单", colNum: 1, rowNum: 1 },
    //     { title: "未出现", colNum: 1, rowNum: 1 },
    //     { title: "未出现", colNum: 1, rowNum: 1 },
    //     { title: "-", colNum: 1, rowNum: 1 },

    //     { title: "1200万", colNum: 1, rowNum: 1 },
    //     { title: "-", colNum: 1, rowNum: 1 },
    //     { title: "-", colNum: 1, rowNum: 1 },
    //     { title: "-", colNum: 1, rowNum: 1 },

    //     { title: "50", colNum: 1, rowNum: 1 },
    //     { title: "18", colNum: 1, rowNum: 1 },
    //     { title: "查看公式", colNum: 1, rowNum: 1 },
    //     { title: "15%", colNum: 1, rowNum: 1 },
    //   ],
    //   [
    //     { title: "质安事故", colNum: 3, rowNum: 1 },
    //     { title: "-", colNum: 1, rowNum: 1 },
    //     { title: "-", colNum: 1, rowNum: 1 },
    //     { title: "-", colNum: 1, rowNum: 1 },
    //     { title: "-", colNum: 1, rowNum: 1 },

    //     { title: "质安事故清单", colNum: 1, rowNum: 1 },
    //     { title: "-", colNum: 1, rowNum: 1 },
    //     { title: "-", colNum: 1, rowNum: 1 },
    //     { title: "-", colNum: 1, rowNum: 1 },

    //     { title: "-", colNum: 1, rowNum: 1 },
    //     { title: "-", colNum: 1, rowNum: 1 },
    //     { title: "-", colNum: 1, rowNum: 1 },
    //     { title: "-", colNum: 1, rowNum: 1 },

    //     { title: "1200万", colNum: 1, rowNum: 1 },
    //     { title: "-", colNum: 1, rowNum: 1 },
    //     { title: "-", colNum: 1, rowNum: 1 },
    //     { title: "-", colNum: 1, rowNum: 1 },

    //     { title: "50", colNum: 1, rowNum: 1 },
    //     { title: "18", colNum: 1, rowNum: 1 },
    //     { title: "查看公式", colNum: 1, rowNum: 1 },
    //     { title: "15%", colNum: 1, rowNum: 1 },
    //   ],
    //   [
    //     { title: "客户投诉风险", colNum: 3, rowNum: 1 },
    //     { title: "客户投诉", colNum: 1, rowNum: 1 },
    //     { title: "未出现", colNum: 1, rowNum: 1 },
    //     { title: "未出现", colNum: 1, rowNum: 1 },
    //     { title: "-", colNum: 1, rowNum: 1 },

    //     { title: "客户投诉", colNum: 1, rowNum: 1 },
    //     { title: "未出现", colNum: 1, rowNum: 1 },
    //     { title: "未出现", colNum: 1, rowNum: 1 },
    //     { title: "-", colNum: 1, rowNum: 1 },

    //     { title: "客户投诉", colNum: 1, rowNum: 1 },
    //     { title: "未出现", colNum: 1, rowNum: 1 },
    //     { title: "未出现", colNum: 1, rowNum: 1 },
    //     { title: "-", colNum: 1, rowNum: 1 },

    //     { title: "1200万", colNum: 1, rowNum: 1 },
    //     { title: "-", colNum: 1, rowNum: 1 },
    //     { title: "-", colNum: 1, rowNum: 1 },
    //     { title: "-", colNum: 1, rowNum: 1 },

    //     { title: "50", colNum: 1, rowNum: 1 },
    //     { title: "18", colNum: 1, rowNum: 1 },
    //     { title: "查看公式", colNum: 1, rowNum: 1 },
    //     { title: "15%", colNum: 1, rowNum: 1 },
    //   ],
    // ];
  },
  methods: {
    fetchRowChild(obj) {
      let depthNum = 0;
      function treeRowChild(obj, level = 0) {
        if (obj.children && obj.children.length > 0) {
          depthNum = Math.max(depthNum, obj.children.length);
          obj.children.forEach((v) => {
            treeRowChild(v, level + 1);
          });
        }
      }
      treeRowChild(obj);

      return depthNum;
    },
    fetchMaxRowChild(obj) {
      let maxArr = [];
      function treeMaxRowChild(obj, level = 0) {
        if (!maxArr[level]) maxArr[level] = [];
        maxArr[level].push(obj.children ? obj.children.length : 0);
        if (obj.children && obj.children.length > 0) {
          obj.children.forEach((v) => {
            treeMaxRowChild(v, level + 1);
          });
        }
      }
      treeMaxRowChild(obj);

      let maxNum = 0;
      maxArr.forEach((ele) => {
        maxNum = Math.max(
          ele.reduce(function(prev, curr) {
            return prev + curr;
          }),
          maxNum
        );
      });
      return maxNum;
    },
    fetchDepth(obj) {
      let depthNum = 0;
      function treeDepth(obj, level = 0) {
        depthNum = Math.max(depthNum, level);
        if (obj.children && obj.children.length > 0) {
          obj.children.forEach((v, i) => {
            treeDepth(v, level + 1);
          });
        }
      }
      treeDepth(obj);

      return depthNum;
    },
    formateColumn(column) {
      let depthNum = 0;
      let columnArr = [];
      let self = this;
      function treeDepthGrade(obj, level = 0) {
        columnArr[level] = [
          ...(columnArr[level] ? columnArr[level] : []),
          {
            title: obj.title,
            colChild: self.fetchRowChild(obj),
            rowChild: self.fetchDepth(obj),
          },
        ];
        depthNum = Math.max(depthNum, level);
        if (obj.children && obj.children.length > 0) {
          obj.children.forEach((v) => {
            treeDepthGrade(v, level + 1);
          });
        }
      }

      column.forEach((ele) => {
        treeDepthGrade(ele, 0);
      });

      const lens = columnArr.length;
      columnArr.forEach((ele, index) => {
        ele.forEach((el) => {
          el.rowNum = lens - el.rowChild - index;
          el.colNum = el.colChild === 0 ? 1 : el.colChild;
        });
      });
      return columnArr;
    },
    formateData(data) {
      const showData = [];

      let childRow = 0;
      let self = this;
      let depthNum = 0;
      function depthChildGrade(obj, level) {
        if (!showData[childRow]) showData[childRow] = [];
        showData[childRow] = [
          ...showData[childRow],
          {
            title: obj.title,
            x: childRow,
            y: level,
            rowChild: self.fetchMaxRowChild(obj),
            colChild: self.fetchDepth(obj),
          },
        ];
        depthNum = Math.max(depthNum, level);
        if (obj.children && obj.children.length > 0) {
          obj.children.forEach((ele) => {
            depthChildGrade(ele, level + 1);
          });
        } else {
          if (obj.infos) {
            obj.infos.forEach((ele) => {
              if (!showData[childRow]) showData[childRow] = [];
              showData[childRow] = [
                ...showData[childRow],
                {
                  title: ele.title,
                  x: childRow,
                  y: level,
                  rowChild: self.fetchMaxRowChild(obj),
                  colChild: self.fetchDepth(obj),
                  isInfo: true,
                },
              ];
            });
          }
          childRow++;
        }
      }

      data.forEach((ele) => {
        depthChildGrade(ele, 0);
      });

      let arr = [];
      showData.forEach((ele, key) => {
        if (ele) {
          if (!arr[key]) arr[key] = [];
          ele.forEach((el, index) => {
            el.rowNum = el.rowChild > 0 ? el.rowChild : 1;
            const num = depthNum - el.colChild - index;
            el.colNum = el.colChild ? (num > 0 ? num : 1) : 1;
            if (el) {
              arr[key] = [...arr[key], el];
            }
          });
        }
      });

      console.log("formate data->", depthNum, showData);
      return arr;
    },
    formateGrade(data) {
      const showData = [];

      let childRow = 0;
      let self = this;
      let depthNum = 0;
      function depthChildGrade(obj, level) {
        if (!showData[childRow]) showData[childRow] = [];
        showData[childRow] = [
          ...showData[childRow],
          {
            title: obj.title,
            rowChild: self.fetchMaxRowChild(obj),
            colChild: self.fetchDepth(obj),
            depth: level,
          },
        ];
        depthNum = Math.max(depthNum, level);
        if (obj.children && obj.children.length > 0) {
          obj.children.forEach((ele) => {
            depthChildGrade(ele, level + 1);
          });
        } else {
          childRow++;
        }
      }

      data.forEach((ele) => {
        depthChildGrade(ele, 0);
      });

      let arr = [];
      showData.forEach((ele, key) => {
        if (ele) {
          if (!arr[key]) arr[key] = [];
          ele.forEach((el, index) => {
            el.rowNum = el.rowChild > 0 ? el.rowChild : 1;
            const num = depthNum - el.colChild - index;
            const colNum = el.colChild ? (num > 0 ? num : 1) : 1;
            el.colNum =
              ele.length - 1 === index && el.depth < depthNum
                ? depthNum + 1 - el.depth
                : colNum;
            console.log(
              ele.length - 1 === index && el.depth < depthNum,
              index,
              depthNum,
              el.depth
            );
            if (el) {
              arr[key] = [...arr[key], el];
            }
          });
        }
      });

      return arr;
    },
    edit(index, key) {
      this.tableArr[index][key].editing = true;
      this.$forceUpdate();
    },
    save(index, key) {
      this.tableArr[index][key].editing = false;
      this.$forceUpdate();
    },
  },
};
</script>
<style lang="less" scoped>
.table {
  &-thead {
    background: #ccc;
  }
  &-cell {
    text-align: center;
    min-width: 120px;
    height: 40px;
  }
}
</style>
