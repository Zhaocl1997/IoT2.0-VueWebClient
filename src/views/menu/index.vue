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

        <el-table-column prop="title" label="菜单名称" show-overflow-tooltip />
        <el-table-column prop="icon" label="图标路径" align="center" show-overflow-tooltip />
        <el-table-column
          prop="index"
          label="页面路由"
          align="center"
          show-overflow-tooltip
          :resizable="false"
        />
        <el-table-column
          prop="createdAt"
          width="200"
          label="创建时间"
          align="center"
          show-overflow-tooltip
          :formatter="onTimeFormat"
        />
        <el-table-column
          prop="updatedAt"
          width="200"
          label="更新时间"
          align="center"
          show-overflow-tooltip
          :formatter="onTimeFormat"
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
              :disabled="!!(scope.row.subs)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

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
import vDialog from "./components/form.vue";
import { tableMixins } from "@/mixins";

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
      const result = await this.$api.menuService.options();
      this.tableData = result.data;
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
      this.$CRUD.singleDel(
        "菜单",
        this.$api.menuService,
        this.$info,
        id,
        this.init
      );
    }
  }
};
</script>

<style scoped>
</style>