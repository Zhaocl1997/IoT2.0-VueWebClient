<template>
  <div class="table-con">
    <div class="table-box">
      <el-input
        size="small"
        style="width: 25%; margin-right: 10px;"
        v-model="reqData.filters"
        @input="onFilter"
        placeholder="可按用户名，手机号和邮箱查询"
        maxlength="10"
        clearable
        prefix-icon="el-icon-search"
      />
      <el-button
        size="small"
        type="text"
        @click="onDialog(0, 'add')"
        icon="el-icon-circle-plus-outline"
      >新建</el-button>
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
        <el-table-column type="index" label="序号" align="center" :resizable="false">
          <template slot-scope="scope">
            <span>{{ (reqData.pagenum - 1) * reqData.pagerow + scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="用户名" align="center" show-overflow-tooltip />
        <el-table-column prop="role.name" label="用户身份" align="center" show-overflow-tooltip />
        <el-table-column
          prop="devCount"
          label="设备数量"
          align="center"
          show-overflow-tooltip
          :formatter="onFormat"
        />
        <el-table-column prop="email" label="邮箱" align="center" show-overflow-tooltip />
        <el-table-column prop="phone" label="手机号" align="center" show-overflow-tooltip />
        <el-table-column
          prop="createdAt"
          width="200"
          label="创建时间"
          align="center"
          show-overflow-tooltip
          :formatter="onTimeFormat"
          sortable
          :sort-orders="['ascending', 'descending']"
        />
        <el-table-column
          prop="updatedAt"
          width="200"
          label="更新时间"
          align="center"
          show-overflow-tooltip
          :formatter="onTimeFormat"
          sortable
          :sort-orders="['ascending', 'descending']"
        />
        <el-table-column
          prop="status"
          width="100"
          label="用户状态"
          align="center"
          :resizable="false"
          sortable
          :sort-orders="['ascending', 'descending']"
        >
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              @change="onStatus(scope.row._id, scope.row.status)"
            />
          </template>
        </el-table-column>

        <el-table-column label="操作" align="center" width="150">
          <template slot-scope="scope">
            <el-button
              size="small"
              type="text"
              @click="onDialog(scope.row, 'edit')"
              icon="el-icon-edit"
            >编辑</el-button>
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

    <v-dialog
      :dialogVisible="dialogVisible"
      :dialogFormData="dialogData"
      :dialogTitle="dialogTitle"
      @cancel="onCancel"
      @save="onSave"
    />
  </div>
</template>

<script>
import vPage from "@/components/pagination";
import vDialog from "./components/form.vue";
import { userService } from "@/services";
import { tableMixins } from "@/mixins";
import { checkBox, tip } from "@/components/MessageBox";
import { countLineNum, singleDelete } from "@/helper/public";

export default {
  mixins: [tableMixins],
  name: "v-user",
  components: {
    vDialog,
    vPage
  },
  methods: {
    // 初始化
    async init() {
      this.reqData.pagerow = countLineNum();
      const result = await userService.index(this.reqData);
      this.tableData = result.data;
      this.total = result.total;
    },

    // 状态改变
    async onStatus(id, status) {
      const result = await userService.updateStatus({ _id: id, status });
      if (result === true) {
        tip.uS();
      }
    },

    // 处理新建编辑
    onDialog(index, operation) {
      switch (operation) {
        case "add":
          this.dialogTitle = "新建用户";
          this.dialogVisible = true;
          this.dialogData = {};
          break;

        case "edit":
          this.dialogTitle = "编辑用户";
          this.dialogVisible = true;
          this.dialogData = {
            _id: index._id,
            name: index.name,
            role: index.role._id,
            email: index.email,
            phone: index.phone
          };
          break;
      }
    },

    // 处理单个删除
    onSingleDel(id) {
      singleDelete("用户", userService, id, this.init);
    },

    // 处理多选删除
    onMultipleDel() {
      let count = 0;
      checkBox("是否删除这些用户?").then(action => {
        if (action === true) {
          this.multipleSelection.forEach(item => {
            userService.del({ _id: item["_id"] }).then(value => {
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
        case "设备数量":
          return `${row.devCount} 个设备`;
      }
    }
  }
};
</script>

<style scoped>
</style>