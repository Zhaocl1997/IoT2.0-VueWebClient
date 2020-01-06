<template>
  <div class="table-con" style="overflow-y:auto;">
    <div class="table-box">
      <el-button
        size="small"
        type="text"
        @click="onDialog(0, 'add')"
        icon="el-icon-circle-plus-outline"
      >新建一级分类</el-button>
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

        <el-table-column prop="name" width="200" label="分类名称" show-overflow-tooltip />
        <el-table-column prop="key" width="100" label="分类关键字" align="center" show-overflow-tooltip />
        <el-table-column prop="desc" label="分类描述" align="center" show-overflow-tooltip />
        <el-table-column
          prop="articles"
          width="100"
          label="文章数量"
          align="center"
          show-overflow-tooltip
          :formatter="onFormat"
        />
        <el-table-column
          prop="createdAt"
          width="180"
          label="创建时间"
          align="center"
          show-overflow-tooltip
          :formatter="onTimeFormat"
        />
        <el-table-column
          prop="updatedAt"
          width="180"
          label="更新时间"
          align="center"
          show-overflow-tooltip
          :formatter="onTimeFormat"
        />

        <el-table-column label="操作" align="center" width="150">
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
  name: "v-category",
  data() {
    return {
      treeProp: { children: "subs", hasChildren: "hasChildren" }
    };
  },
  components: {
    vDialog
  },
  methods: {
    // 有子分类显示浅绿色, 没有子分类显示浅米色
    tableRowClassName({ row }) {
      if (row.subs.length !== 0) {
        return "on-row";
      } else {
        return "off-row";
      }
    },

    // 初始化
    async init() {
      const result = await this.$api.categoryService.index();
      this.tableData = result.data;
    },

    // 处理新建编辑
    onDialog(index, operation) {
      switch (operation) {
        case "add":
          this.dialogTitle = "新建分类";
          this.dialogVisible = true;
          if (index._id) {
            this.dialogData = {
              _id: index._id
            };
          }
          break;

        case "edit":
          this.dialogTitle = "编辑分类";
          this.dialogVisible = true;
          this.dialogData = {
            _id: index._id,
            name: index.name,
            key: index.key,
            desc: index.desc
          };
          break;
      }
    },

    // 格式化
    onFormat(row, column) {
      switch (column.label) {
        case "文章数量":
          return row.articles + " 篇文章";
      }
    }
  }
};
</script>

<style scoped>
</style>