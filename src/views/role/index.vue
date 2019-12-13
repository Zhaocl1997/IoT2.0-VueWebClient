<template>
  <div class="table-con">
    <div class="table-box">
      <el-input
        size="small"
        style="width: 25%; margin-right: 10px;"
        v-model="reqData.filters"
        @input="onFilter"
        placeholder="输入查询信息"
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
      <el-button size="small" type="text" @click="onFresh" icon="el-icon-refresh">刷新</el-button>
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
      >
        <el-table-column type="index" label="序号" align="center" :resizable="false">
          <template slot-scope="scope">
            <span>{{ (reqData.pagenum - 1) * reqData.pagerow + scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="角色名称" align="center" show-overflow-tooltip />
        <el-table-column prop="describe" label="角色描述" align="center" show-overflow-tooltip />
        <el-table-column
          prop="userCount"
          label="用户数量"
          align="center"
          show-overflow-tooltip
          :formatter="onFormat"
        />
        <el-table-column
          prop="menu"
          label="角色权限"
          align="center"
          show-overflow-tooltip
          :formatter="onFormat"
        />
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
          label="角色状态"
          align="center"
          show-overflow-tooltip
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
              :disabled="true"
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
import { roleService } from "@/services";
import { tableMixins } from "@/mixins";
import { checkBox, tip } from "@/components/MessageBox";
import { countLineNum } from "@/helper/public";

export default {
  mixins: [tableMixins],
  name: "v-role",
  components: {
    vDialog,
    vPage
  },
  methods: {
    // 初始化
    async init() {
      this.reqData.pagerow = countLineNum();
      const result = await roleService.index(this.reqData);
      this.tableData = result.data;
      this.total = result.total;
    },

    // 状态改变
    async onStatus(id, status) {
      const result = await roleService.updateStatus({ _id: id, status });
      if (result === true) {
        tip.uS();
      }
    },

    // 处理新建编辑
    onDialog(index, operation) {
      switch (operation) {
        case "add":
          this.dialogTitle = "新建角色";
          this.dialogVisible = true;
          this.dialogData = {};
          break;

        case "edit":
          this.dialogTitle = "编辑角色";
          this.dialogVisible = true;
          this.dialogData = {
            _id: index._id,
            name: index.name,
            describe: index.describe,
            menu: index.menu
          };
          break;
      }
    },

    // 处理单个删除
    onSingleDel(id) {
      checkBox("是否删除该角色?").then(action => {
        if (action === true) {
          roleService.del({ _id: id }).then(value => {
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

    // 处理格式化显示
    onFormat(row, column) {
      switch (column.label) {
        case "角色权限":
          return `${row.menu.length} 项权限`;

        case "用户数量":
          return `${row.userCount} 个用户`;
      }
    }
  }
};
</script>

<style scoped>
</style>