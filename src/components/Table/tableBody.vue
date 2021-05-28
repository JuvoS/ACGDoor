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
            style="display: none;"
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
          >
            {{ cell.title ? cell.title : "-" }}
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
    formateGrade(data) {
      const showData = [];

      let childRow = 0;
      let self = this;
      let depthNum = 0;
      let colArr = [];
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
          if (obj.infos) {
            obj.infos.forEach((ele) => {
              if (!colArr[childRow]) colArr[childRow] = [];
              colArr[childRow] = [
                ...colArr[childRow],
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
            const colNum = el.colChild ? (num > 0 ? num : 1) : 1;
            el.colNum =
              ele.length - 1 === index && el.depth < depthNum
                ? depthNum + 1 - el.depth
                : colNum;
            if (el) {
              arr[key] = [...arr[key], el];
            }
          });
          arr[key] = [...arr[key], ...(colArr[key] ? colArr[key] : [])];
        }
      });

      let maxArrLens = this.getArrMaxChildLens(arr);

      let cellArr = [];
      arr.forEach((ele) => {
        const eleChild = JSON.parse(JSON.stringify(ele));
        const eleAppendChild = this.getEmptyArrCell(maxArrLens - ele.length);
        ele = [...eleChild, ...eleAppendChild];
        cellArr.push([...eleChild, ...eleAppendChild]);
      });

      console.log("arr ->", cellArr);
      return cellArr;
    },
    getArrMaxChildLens(arr) {
      const temp = JSON.parse(JSON.stringify(arr));
      let maxArrLens = 0;
      temp.forEach((ele) => {
        maxArrLens = Math.max(ele.length ? ele.length : 0, maxArrLens);
      });

      return maxArrLens;
    },
    getEmptyArrCell(num) {
      let arr = [];
      for (let i = 0; i < num; i++) {
        arr.push({
          title: "-",
          colNum: 1,
          rowNum: 1,
        });
      }
      return arr;
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
