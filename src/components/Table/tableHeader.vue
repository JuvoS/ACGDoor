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
  </table>
</template>
<script>
export default {
  props: {
    column: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      tableColumn: [],
    };
  },
  mounted() {
    this.tableColumn = this.formateColumn(this.column);
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
