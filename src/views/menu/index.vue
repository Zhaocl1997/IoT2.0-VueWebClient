<template>
  <div class="container">
    <div class="command-box">
      <el-button
        size="small"
        type="text"
        @click="onDialog(0, 'add')"
        icon="el-icon-circle-plus-outline"
      >新建一级菜单</el-button>
    </div>

    <div class="tablecontent" id="tablecontent">
      <el-table
        border
        empty-text
        size="small"
        row-key="_id"
        :data="tableData"
        ref="multipleTable"
        default-expand-all
        tooltip-effect="dark"
        :row-class-name="tableRowClassName"
        :tree-props="{children: 'subs', hasChildren: 'hasChildren'}"
      >
        <el-table-column type="index" label="序号" align="center">
          <template slot-scope="scope">
            <span>{{(reqData.pagenum - 1) * reqData.pagerow + scope.$index + 1}}</span>
          </template>
        </el-table-column>

        <el-table-column prop="title" label="菜单名称" align="center" show-overflow-tooltip />
        <el-table-column prop="icon" label="图标路径" align="center" show-overflow-tooltip />
        <el-table-column prop="index" label="页面路由" align="center" show-overflow-tooltip />

        <el-table-column label="操作" align="center" width="180">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="onDialog(scope.row, 'add')"
              icon="el-icon-plus"
              :disabled="!(scope.row.subs)"
            >新建</el-button>
            <el-button
              size="mini"
              type="text"
              @click="onDialog(scope.row, 'edit')"
              icon="el-icon-edit"
            >编辑</el-button>
            <el-button
              size="mini"
              type="text"
              @click="onSingleDel(scope.row._id)"
              icon="el-icon-delete"
              :disabled="false"
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

    <menuDialog
      :dialogVisible="dialogVisible"
      :dialogFormData="dialogData"
      :dialogTitle="dialogTitle"
      @cancel="onCancel"
      @save="onSave"
    />
  </div>
</template>

<script>
import pagination from "@/components/pagination";
import addeditform from "./components/addeditform.vue";
import { menuService } from "@/services";
import { tableMixins } from "@/mixins";
import { checkBox, tip } from "@/components/MessageBox";

export default {
  mixins: [tableMixins],
  name: "v-menu",
  components: {
    menuDialog: addeditform,
    pagination: pagination
  },
  methods: {
    // 一级菜单显示浅绿色,二级菜单显示浅米色
    tableRowClassName({ row }) {
      if (row.subs !== undefined) {
        return "on-row";
      } else {
        return "off-row";
      }
    },

    // 初始化
    async init(item) {
      const result = await menuService.index(item);
      this.tableData = result;
      // this.total = result.total;
    },

    // 处理新建编辑
    onDialog(index, operation) {
      switch (operation) {
        case "add":
          this.dialogTitle = "新建菜单";
          this.dialogVisible = true;
          if (index._id) {
            this.dialogData = {
              _id: index._id
            };
          }
          break;

        case "edit":
          this.dialogTitle = "编辑菜单";
          this.dialogVisible = true;
          this.dialogData = {
            _id: index._id,
            title: index.title,
            icon: index.icon,
            index: index.index,
            subs: index.subs
          };
          break;
      }
    },

    // 处理单个删除
    onSingleDel(id) {
      checkBox("是否删除该菜单?").then(action => {
        if (action === true) {
          menuService.del({ _id: id }).then(value => {
            if (value === true) {
              tip.dS();
              this.init(this.reqData);
            }
          });
        } else {
          tip.cancel();
        }
      });
    }
  }
};
</script>

<style scoped>
</style>