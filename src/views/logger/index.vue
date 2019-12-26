<template>
  <div class="table-con">
    <div class="table-box">
      <el-input
        size="small"
        style="width: 25%; margin-right: 10px;"
        v-model="reqData.filters"
        @input="onFilter"
        placeholder="可按请求方法和请求地址查询"
        maxlength="10"
        clearable
        prefix-icon="el-icon-search"
      />

      <el-button
        size="small"
        type="text"
        @click="onToggleSelection()"
        icon="el-icon-remove-outline"
      >取消</el-button>
      <el-button size="small" type="text" @click="onFresh" icon="el-icon-refresh">刷新</el-button>
      <el-button size="small" type="text" @click="onMultipleDel" icon="el-icon-delete">删除</el-button>
    </div>

    <div class="table-main" id="table-main">
      <el-table
        border
        empty-text
        size="small"
        :data="tableData"
        ref="multipleTable"
        tooltip-effect="dark"
        @sort-change="onSort"
        :row-class-name="tableRowClassName"
        @selection-change="onSelectionChange"
      >
        <el-table-column type="selection" width="40" />

        <el-table-column
          prop="method"
          width="100"
          label="请求方法"
          align="center"
          :resizable="false"
          show-overflow-tooltip
          sortable
          :sort-orders="['ascending', 'descending']"
        />
        <el-table-column prop="url" width="200" label="请求地址" align="center" show-overflow-tooltip />
        <el-table-column
          prop="httpVersion"
          width="100"
          label="HTTP版本"
          align="center"
          show-overflow-tooltip
        />
        <el-table-column
          prop="statusCode"
          width="100"
          label="状态码"
          align="center"
          show-overflow-tooltip
          sortable
          :sort-orders="['ascending', 'descending']"
        />
        <el-table-column prop="referrer" label="客户地址" align="center" show-overflow-tooltip />
        <el-table-column
          prop="userAgent"
          width="150"
          label="客户信息"
          align="center"
          show-overflow-tooltip
        />
        <el-table-column
          prop="remoteAddress"
          width="150"
          label="客户IP"
          align="center"
          show-overflow-tooltip
        />
        <el-table-column
          prop="username"
          width="200"
          label="用户昵称"
          align="center"
          show-overflow-tooltip
        />
        <el-table-column
          prop="requestTime"
          width="200"
          label="请求时间"
          align="center"
          show-overflow-tooltip
          :formatter="onFormat"
          sortable
          :sort-orders="['ascending', 'descending']"
        />
        <el-table-column
          prop="responseTime"
          width="100"
          label="响应时间"
          align="center"
          show-overflow-tooltip
          :formatter="onFormat"
          sortable
          :sort-orders="['ascending', 'descending']"
        />

        <el-table-column label="操作" align="center" width="80">
          <template slot-scope="scope">
            <el-button
              size="small"
              type="text"
              @click="onSingleDel(scope.row._id)"
              icon="el-icon-delete"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <v-page
      :pagenum="reqData.pagenum"
      :pagerow="reqData.pagerow"
      :total="total"
      @paginationEvent="onPage"
    />
  </div>
</template>

<script>
import vPage from "@/components/pagination";
import { loggerService } from "@/services";
import { tableMixins } from "@/mixins";
import { checkBox, tip } from "@/components/MessageBox";
import { countLineNum, format } from "@/helper/public";

export default {
  mixins: [tableMixins],
  name: "v-logger",
  components: {
    vPage
  },
  methods: {
    // 初始化
    async init() {
      this.reqData.sortField = "requestTime";
      this.reqData.pagerow = countLineNum();
      const result = await loggerService.index(this.reqData);
      this.tableData = result.data;
      this.total = result.total;
    },

    // 处理单个删除
    onSingleDel(id) {
      checkBox("是否删除该条请求记录?").then(action => {
        if (action === true) {
          loggerService.del({ _id: id }).then(value => {
            if (value === true) {
              tip.dS();
              this.init();
            }
          });
        } else {
          tip.cancel();
        }
      });
    },

    // 处理多选删除
    onMultipleDel() {
      let count = 0;
      checkBox("是否删除这些请求记录?").then(action => {
        if (action === true) {
          this.multipleSelection.forEach(item => {
            loggerService.del({ _id: item["_id"] }).then(value => {
              if (value === true) {
                count = count + 1;
                if (this.multipleSelection.length === count) {
                  tip.dS();
                  this.init();
                }
              }
            });
          });
        } else {
          tip.cancel();
          this.$refs.multipleTable.clearSelection();
        }
      });
    },

    // 处理格式化显示
    onFormat(row, column) {
      switch (column.label) {
        case "请求时间":
          return format(row.requestTime, "YYYY-MM-DD HH:mm:ss");

        case "响应时间":
          return row.responseTime + "ms";
      }
    }
  }
};
</script>

<style scoped>
</style>