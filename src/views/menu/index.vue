<template>
  <div class="table-con">
    <div class="table-box">
      <el-button
        size="small"
        type="text"
        @click="onDialog(0, 'add')"
        icon="el-icon-circle-plus-outline"
      >新建一级菜单</el-button>
      <el-button size="small" type="text" @click="onFresh" icon="el-icon-refresh">刷新</el-button>
    </div>

    <div class="table-main" id="table-main">
      <el-table
        border
        empty-text
        size="small"
        row-key="_id"
        :data="tableData"
        ref="multipleTable"
        tooltip-effect="dark"
        :row-class-name="tableRowClassName"
        :tree-props="treeProp"
      >
        <el-table-column type="index" label="序号" align="center" :resizable="false">
          <template slot-scope="scope">
            <span>{{ (reqData.pagenum - 1) * reqData.pagerow + scope.$index + 1 }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="title" label="菜单名称" align="center" show-overflow-tooltip />
        <el-table-column prop="icon" label="图标路径" align="center" show-overflow-tooltip />
        <el-table-column
          prop="index"
          label="页面路由"
          align="center"
          show-overflow-tooltip
          :resizable="false"
        />

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

    <!-- <v-page
      :pagenum="reqData.pagenum"
      :pagerow="reqData.pagerow"
      :total="total"
      @paginationEvent="onPage"
    />-->

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
// import vPage from "@/components/pagination";
import vDialog from "./components/form.vue";
import { menuService } from "@/services";
import { tableMixins } from "@/mixins";
import { checkBox, tip } from "@/components/MessageBox";

export default {
  mixins: [tableMixins],
  name: "v-menu",
  data() {
    return {
      treeProp: { children: "subs", hasChildren: "hasChildren" }
    };
  },
  components: {
    vDialog
    // vPage
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
    async init() {
      const result = await menuService.options();
      this.tableData = result;
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
              this.init();
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