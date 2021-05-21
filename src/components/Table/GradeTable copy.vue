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
      <template v-for="(columns, index) in tableData">
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
  data() {
    return {
      tableColumn: [],
      tableData: [],
    };
  },
  mounted() {
    const columns = [
      {
        title: "Name",
        key: "name",
        align: "center",
        width: 200,
        fixed: "left",
        filters: [
          {
            label: "Joe",
            value: 1,
          },
          {
            label: "John",
            value: 2,
          },
        ],
      },
      {
        title: "Other",
        align: "center",
        children: [
          {
            title: "Age",
            key: "age",
            align: "center",
            width: 200,
            sortable: true,
          },
          {
            title: "Address",
            align: "center",
            children: [
              {
                title: "Street",
                key: "street",
                align: "center",
                width: 200,
              },
              {
                title: "Block",
                align: "center",
                children: [
                  {
                    title: "Building",
                    key: "building",
                    align: "center",
                    width: 200,
                    sortable: true,
                  },
                  {
                    title: "Door No.",
                    key: "door",
                    align: "center",
                    width: 200,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        title: "Company",
        align: "center",
        children: [
          {
            title: "Company Address",
            key: "caddress",
            align: "center",
            width: 200,
          },
          {
            title: "Company Name",
            key: "cname",
            align: "center",
            width: 200,
          },
        ],
      },
      {
        title: "Gender",
        key: "gender",
        align: "center",
        width: 200,
        fixed: "right",
      },
    ];

    this.tableColumn = [
      [
        { title: "一级目标", colNum: 1, rowNum: 2 },
        { title: "二级目标", colNum: 1, rowNum: 2 },
        { title: "三级目标", colNum: 1, rowNum: 2 },
        { title: "1季度", colNum: 4, rowNum: 1 },
        { title: "2季度", colNum: 4, rowNum: 1 },
        { title: "3季度", colNum: 4, rowNum: 1 },
        { title: "4季度", colNum: 4, rowNum: 1 },
        { title: "分数设置", colNum: 1, rowNum: 2 },
        { title: "得分", colNum: 1, rowNum: 2 },
        { title: "计算公式", colNum: 1, rowNum: 2 },
        { title: "权重", colNum: 1, rowNum: 2 },
      ],
      [
        { title: "计划目标", colNum: 1, rowNum: 1 },
        { title: "完成值", colNum: 1, rowNum: 1 },
        { title: "完成率", colNum: 1, rowNum: 1 },
        { title: "完成情况", colNum: 1, rowNum: 1 },
        { title: "计划目标", colNum: 1, rowNum: 1 },
        { title: "完成值", colNum: 1, rowNum: 1 },
        { title: "完成率", colNum: 1, rowNum: 1 },
        { title: "完成情况", colNum: 1, rowNum: 1 },
        { title: "计划目标", colNum: 1, rowNum: 1 },
        { title: "完成值", colNum: 1, rowNum: 1 },
        { title: "完成率", colNum: 1, rowNum: 1 },
        { title: "完成情况", colNum: 1, rowNum: 1 },
        { title: "计划目标", colNum: 1, rowNum: 1 },
        { title: "完成值", colNum: 1, rowNum: 1 },
        { title: "完成率", colNum: 1, rowNum: 1 },
        { title: "完成情况", colNum: 1, rowNum: 1 },
      ],
    ];
    this.tableData = [
      [
        { title: "成本管理", colNum: 1, rowNum: 3 },
        { title: "成本预算分析工作", colNum: 1, rowNum: 2 },
        { title: "控制项目总成本", colNum: 1, rowNum: 1 },
        { title: "1200万", colNum: 1, rowNum: 1 },
        { title: "1000万", colNum: 1, rowNum: 1 },
        { title: "80%", colNum: 1, rowNum: 1 },
        { title: "正常推进中", colNum: 1, rowNum: 1 },

        { title: "1200万", colNum: 1, rowNum: 1 },
        { title: "1000万", colNum: 1, rowNum: 1 },
        { title: "80%", colNum: 1, rowNum: 1 },
        { title: "正常推进中", colNum: 1, rowNum: 1 },

        { title: "1200万", colNum: 1, rowNum: 1 },
        { title: "1000万", colNum: 1, rowNum: 1 },
        { title: "80%", colNum: 1, rowNum: 1 },
        { title: "正常推进中", colNum: 1, rowNum: 1 },

        { title: "1200万", colNum: 1, rowNum: 1 },
        { title: "-", colNum: 1, rowNum: 1 },
        { title: "-", colNum: 1, rowNum: 1 },
        { title: "-", colNum: 1, rowNum: 1 },

        { title: "50", colNum: 1, rowNum: 1 },
        { title: "18", colNum: 1, rowNum: 1 },
        { title: "查看公式", colNum: 1, rowNum: 1 },
        { title: "15%", colNum: 1, rowNum: 1 },
      ],
      [
        { title: "每月28号前提供成本控制", colNum: 1, rowNum: 1 },
        { title: "3月会议决定", colNum: 1, rowNum: 1 },
        { title: "开展会议", colNum: 1, rowNum: 1 },
        { title: "100%", colNum: 1, rowNum: 1 },
        { title: "已完成", colNum: 1, rowNum: 1 },

        { title: "3月会议决定", colNum: 1, rowNum: 1 },
        { title: "开展会议", colNum: 1, rowNum: 1 },
        { title: "100%", colNum: 1, rowNum: 1 },
        { title: "已完成", colNum: 1, rowNum: 1 },

        { title: "3月会议决定", colNum: 1, rowNum: 1 },
        { title: "开展会议", colNum: 1, rowNum: 1 },
        { title: "100%", colNum: 1, rowNum: 1 },
        { title: "已完成", colNum: 1, rowNum: 1 },

        { title: "1200万", colNum: 1, rowNum: 1 },
        { title: "-", colNum: 1, rowNum: 1 },
        { title: "-", colNum: 1, rowNum: 1 },
        { title: "-", colNum: 1, rowNum: 1 },

        { title: "50", colNum: 1, rowNum: 1 },
        { title: "18", colNum: 1, rowNum: 1 },
        { title: "查看公式", colNum: 1, rowNum: 1 },
        { title: "15%", colNum: 1, rowNum: 1 },
      ],
      [
        { title: "成本预算编制工作", colNum: 1, rowNum: 1 },
        { title: "根据项目的进度，按需完", colNum: 1, rowNum: 1 },
        { title: "文档建设", colNum: 1, rowNum: 1 },
        { title: "是", colNum: 1, rowNum: 1 },
        { title: "100%", colNum: 1, rowNum: 1 },
        { title: "已完成", colNum: 1, rowNum: 1 },

        { title: "文档建设", colNum: 1, rowNum: 1 },
        { title: "是", colNum: 1, rowNum: 1 },
        { title: "100%", colNum: 1, rowNum: 1 },
        { title: "已完成", colNum: 1, rowNum: 1 },

        { title: "文档建设", colNum: 1, rowNum: 1 },
        { title: "是", colNum: 1, rowNum: 1 },
        { title: "100%", colNum: 1, rowNum: 1 },
        { title: "已完成", colNum: 1, rowNum: 1 },

        { title: "1200万", colNum: 1, rowNum: 1 },
        { title: "-", colNum: 1, rowNum: 1 },
        { title: "-", colNum: 1, rowNum: 1 },
        { title: "-", colNum: 1, rowNum: 1 },

        { title: "50", colNum: 1, rowNum: 1 },
        { title: "18", colNum: 1, rowNum: 1 },
        { title: "查看公式", colNum: 1, rowNum: 1 },
        { title: "15%", colNum: 1, rowNum: 1 },
      ],
      [
        { title: "回款达成率", colNum: 1, rowNum: 3 },
        { title: "资金计划", colNum: 1, rowNum: 3 },
        { title: "目标回款完成额", colNum: 1, rowNum: 1 },
        { title: "11200万", colNum: 1, rowNum: 1 },
        { title: "971万", colNum: 1, rowNum: 1 },
        { title: "56%", colNum: 1, rowNum: 1 },
        { title: "按计划推进", colNum: 1, rowNum: 1 },

        { title: "11200万", colNum: 1, rowNum: 1 },
        { title: "971万", colNum: 1, rowNum: 1 },
        { title: "56%", colNum: 1, rowNum: 1 },
        { title: "按计划推进", colNum: 1, rowNum: 1 },

        { title: "11200万", colNum: 1, rowNum: 1 },
        { title: "971万", colNum: 1, rowNum: 1 },
        { title: "56%", colNum: 1, rowNum: 1 },
        { title: "按计划推进", colNum: 1, rowNum: 1 },

        { title: "1200万", colNum: 1, rowNum: 1 },
        { title: "-", colNum: 1, rowNum: 1 },
        { title: "-", colNum: 1, rowNum: 1 },
        { title: "-", colNum: 1, rowNum: 1 },

        { title: "50", colNum: 1, rowNum: 1 },
        { title: "18", colNum: 1, rowNum: 1 },
        { title: "查看公式", colNum: 1, rowNum: 1 },
        { title: "15%", colNum: 1, rowNum: 1 },
      ],
      [
        { title: "支付计划", colNum: 1, rowNum: 1 },
        { title: "2700万", colNum: 1, rowNum: 1 },
        { title: "875万", colNum: 1, rowNum: 1 },
        { title: "38%", colNum: 1, rowNum: 1 },
        { title: "按计划推进", colNum: 1, rowNum: 1 },

        { title: "2700万", colNum: 1, rowNum: 1 },
        { title: "875万", colNum: 1, rowNum: 1 },
        { title: "38%", colNum: 1, rowNum: 1 },
        { title: "按计划推进", colNum: 1, rowNum: 1 },

        { title: "2700万", colNum: 1, rowNum: 1 },
        { title: "875万", colNum: 1, rowNum: 1 },
        { title: "38%", colNum: 1, rowNum: 1 },
        { title: "按计划推进", colNum: 1, rowNum: 1 },

        { title: "1200万", colNum: 1, rowNum: 1 },
        { title: "-", colNum: 1, rowNum: 1 },
        { title: "-", colNum: 1, rowNum: 1 },
        { title: "-", colNum: 1, rowNum: 1 },

        { title: "50", colNum: 1, rowNum: 1 },
        { title: "18", colNum: 1, rowNum: 1 },
        { title: "查看公式", colNum: 1, rowNum: 1 },
        { title: "15%", colNum: 1, rowNum: 1 },
      ],
      [
        { title: "资金收支净额", colNum: 1, rowNum: 1 },
        { title: "12000万", colNum: 1, rowNum: 1 },
        { title: "5030万", colNum: 1, rowNum: 1 },
        { title: "50%", colNum: 1, rowNum: 1 },
        { title: "按计划推进", colNum: 1, rowNum: 1 },

        { title: "12000万", colNum: 1, rowNum: 1 },
        { title: "5030万", colNum: 1, rowNum: 1 },
        { title: "50%", colNum: 1, rowNum: 1 },
        { title: "按计划推进", colNum: 1, rowNum: 1 },

        { title: "12000万", colNum: 1, rowNum: 1 },
        { title: "5030万", colNum: 1, rowNum: 1 },
        { title: "50%", colNum: 1, rowNum: 1 },
        { title: "按计划推进", colNum: 1, rowNum: 1 },

        { title: "1200万", colNum: 1, rowNum: 1 },
        { title: "-", colNum: 1, rowNum: 1 },
        { title: "-", colNum: 1, rowNum: 1 },
        { title: "-", colNum: 1, rowNum: 1 },

        { title: "50", colNum: 1, rowNum: 1 },
        { title: "18", colNum: 1, rowNum: 1 },
        { title: "查看公式", colNum: 1, rowNum: 1 },
        { title: "15%", colNum: 1, rowNum: 1 },
      ],
      [
        { title: "负面清单", colNum: 3, rowNum: 1 },
        { title: "项目负面清单", colNum: 1, rowNum: 1 },
        { title: "未出现", colNum: 1, rowNum: 1 },
        { title: "未出现", colNum: 1, rowNum: 1 },
        { title: "-", colNum: 1, rowNum: 1 },

        { title: "项目负面清单", colNum: 1, rowNum: 1 },
        { title: "未出现", colNum: 1, rowNum: 1 },
        { title: "未出现", colNum: 1, rowNum: 1 },
        { title: "-", colNum: 1, rowNum: 1 },

        { title: "项目负面清单", colNum: 1, rowNum: 1 },
        { title: "未出现", colNum: 1, rowNum: 1 },
        { title: "未出现", colNum: 1, rowNum: 1 },
        { title: "-", colNum: 1, rowNum: 1 },

        { title: "1200万", colNum: 1, rowNum: 1 },
        { title: "-", colNum: 1, rowNum: 1 },
        { title: "-", colNum: 1, rowNum: 1 },
        { title: "-", colNum: 1, rowNum: 1 },

        { title: "50", colNum: 1, rowNum: 1 },
        { title: "18", colNum: 1, rowNum: 1 },
        { title: "查看公式", colNum: 1, rowNum: 1 },
        { title: "15%", colNum: 1, rowNum: 1 },
      ],
      [
        { title: "质安事故", colNum: 3, rowNum: 1 },
        { title: "-", colNum: 1, rowNum: 1 },
        { title: "-", colNum: 1, rowNum: 1 },
        { title: "-", colNum: 1, rowNum: 1 },
        { title: "-", colNum: 1, rowNum: 1 },

        { title: "质安事故清单", colNum: 1, rowNum: 1 },
        { title: "-", colNum: 1, rowNum: 1 },
        { title: "-", colNum: 1, rowNum: 1 },
        { title: "-", colNum: 1, rowNum: 1 },

        { title: "-", colNum: 1, rowNum: 1 },
        { title: "-", colNum: 1, rowNum: 1 },
        { title: "-", colNum: 1, rowNum: 1 },
        { title: "-", colNum: 1, rowNum: 1 },

        { title: "1200万", colNum: 1, rowNum: 1 },
        { title: "-", colNum: 1, rowNum: 1 },
        { title: "-", colNum: 1, rowNum: 1 },
        { title: "-", colNum: 1, rowNum: 1 },

        { title: "50", colNum: 1, rowNum: 1 },
        { title: "18", colNum: 1, rowNum: 1 },
        { title: "查看公式", colNum: 1, rowNum: 1 },
        { title: "15%", colNum: 1, rowNum: 1 },
      ],
      [
        { title: "客户投诉风险", colNum: 3, rowNum: 1 },
        { title: "客户投诉", colNum: 1, rowNum: 1 },
        { title: "未出现", colNum: 1, rowNum: 1 },
        { title: "未出现", colNum: 1, rowNum: 1 },
        { title: "-", colNum: 1, rowNum: 1 },

        { title: "客户投诉", colNum: 1, rowNum: 1 },
        { title: "未出现", colNum: 1, rowNum: 1 },
        { title: "未出现", colNum: 1, rowNum: 1 },
        { title: "-", colNum: 1, rowNum: 1 },

        { title: "客户投诉", colNum: 1, rowNum: 1 },
        { title: "未出现", colNum: 1, rowNum: 1 },
        { title: "未出现", colNum: 1, rowNum: 1 },
        { title: "-", colNum: 1, rowNum: 1 },

        { title: "1200万", colNum: 1, rowNum: 1 },
        { title: "-", colNum: 1, rowNum: 1 },
        { title: "-", colNum: 1, rowNum: 1 },
        { title: "-", colNum: 1, rowNum: 1 },

        { title: "50", colNum: 1, rowNum: 1 },
        { title: "18", colNum: 1, rowNum: 1 },
        { title: "查看公式", colNum: 1, rowNum: 1 },
        { title: "15%", colNum: 1, rowNum: 1 },
      ],
    ];
  },
  methods: {
    edit(index, key) {
      this.tableData[index][key].editing = true;
      this.$forceUpdate();
    },
    save(index, key) {
      this.tableData[index][key].editing = false;
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
