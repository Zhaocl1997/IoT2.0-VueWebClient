<template>
  <div class="container">
    <div class="command-box">
      <el-button
        size="small"
        type="text"
        @click="onDialog(0, 'add')"
        icon="el-icon-circle-plus-outline"
      >新建</el-button>
    </div>

    <div class="tablecontent" id="tablecontent">
      <el-table
        border
        empty-text
        size="small"
        :data="tableData"
        ref="multipleTable"
        tooltip-effect="dark"
        highlight-current-row
        :row-class-name="tableRowClassName"
      >
        <el-table-column type="index" label="序号" align="center">
          <template slot-scope="scope">
            <span>{{(reqData.pagenum - 1) * reqData.pagerow + scope.$index + 1}}</span>
          </template>
        </el-table-column>

        <el-table-column prop="name" label="角色名称" align="center" show-overflow-tooltip />
        <el-table-column prop="describe" label="角色描述" align="center" show-overflow-tooltip />
        <el-table-column
          prop="menu"
          label="角色权限"
          align="center"
          show-overflow-tooltip
          :formatter="onFormat"
        />
        <el-table-column
          prop="user"
          label="用户数量"
          align="center"
          show-overflow-tooltip
          :formatter="onFormat"
        />
        <el-table-column
          prop="createdAt"
          label="创建时间"
          align="center"
          show-overflow-tooltip
          :formatter="onFormat"
        />
        <el-table-column
          prop="updatedAt"
          label="更新时间"
          align="center"
          show-overflow-tooltip
          :formatter="onFormat"
        />
        <el-table-column
          prop="status"
          label="角色状态"
          align="center"
          show-overflow-tooltip
          :formatter="onFormat"
        />

        <el-table-column label="操作" align="center" width="200">
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

    <pagination
      :pagenum="reqData.pagenum"
      :pagerow="reqData.pagerow"
      :total="total"
      @paginationEvent="onPage"
    />

    <roleDialog
      :dialogVisible="dialogVisible"
      :dialogFormData="dialogData"
      :dialogTitle="dialogTitle"
      @cancel="onCancel()"
      @save="onSave()"
    />
  </div>
</template>

<script>
import pagination from "@/components/pagination";
import addeditform from "./components/addeditform.vue";
import { roleService } from "@/services";
import { tableMixins } from "@/mixins";
import { checkBox, tip } from "@/components/MessageBox";
import { format } from "@/helper/public";

export default {
  mixins: [tableMixins],
  name: "role",
  components: {
    roleDialog: addeditform,
    pagination: pagination
  },
  methods: {
    // 初始化
    async init(item) {
      const result = await roleService.index(item);
      this.tableData = result.data;
      this.total = result.total;
    },

    // 处理新建编辑
    onDialog(index, operation) {
      switch (operation) {
        case "add":
          this.dialogTitle = "新建角色";
          this.dialogVisible = true;
          this.dialogData = {
            status: true
          };
          break;

        case "edit":
          this.dialogTitle = "编辑角色";
          this.dialogVisible = true;
          this.dialogData = {
            _id: index._id,
            name: index.name,
            describe: index.describe,
            menu: index.menu,
            status: index.status
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
              this.init(this.reqData);
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
          return `${row.number} 个`;

        case "创建时间":
          return format(row.createdAt, "YYYY/MM/DD HH:mm:ss");

        case "更新时间":
          return format(row.updatedAt, "YYYY/MM/DD HH:mm:ss");

        case "角色状态":
          return row.status === true
            ? "启用"
            : row.status === false
            ? "停用"
            : "未知";
      }
    }
  }
};
</script>

<style scoped>
</style>