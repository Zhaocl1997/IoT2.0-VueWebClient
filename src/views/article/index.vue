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
        @click="onToggleSelection"
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

        <el-table-column prop="title" label="标题" align="center"></el-table-column>
        <el-table-column prop="content" label="内容" align="center"></el-table-column>
        <el-table-column prop="category" label="分类" align="center"></el-table-column>

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
            >删除</el-button>
            <el-button size="small" type="text" @click="onCheck(scope.row)" icon="el-icon-view">查看</el-button>
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
import { articleService } from "@/services";
import { tableMixins } from "@/mixins";
import { checkBox, tip } from "@/components/MessageBox";
import { countLineNum } from "@/helper/public";

export default {
  mixins: [tableMixins],
  name: "v-article",
  components: {
    vDialog,
    vPage
  },
  methods: {
    // 初始化
    async init() {
      this.reqData.pagerow = countLineNum();
      const result = await articleService.index(this.reqData);
      this.tableData = result.data;
      this.total = result.total;
    },

    // 处理新建编辑
    onDialog(index, operation) {
      switch (operation) {
        case "add":
          this.dialogTitle = "新建设备";
          this.dialogVisible = true;
          this.dialogData = {};
          break;

        case "edit":
          this.dialogTitle = "编辑设备";
          this.dialogVisible = true;
          this.dialogData = {
            _id: index._id,
            name: index.name,
            macAddress: index.macAddress,
            type: index.type
          };
          break;
      }
    },

    // 处理单个删除
    onSingleDel(id) {
      checkBox("是否删除该设备?").then(action => {
        if (action === true) {
          articleService.del({ _id: id }).then(value => {
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
      checkBox("是否删除这些设备?").then(action => {
        if (action === true) {
          this.multipleSelection.forEach(item => {
            articleService.del({ _id: item["_id"] }).then(value => {
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

    // 显示数据页面
    onCheck(e) {
      switch (e.type) {
        case "sensor":
          this.$router.push({
            path: "/main/sensorData",
            query: { name: e.name, macAddress: e.macAddress }
          });
          break;

        case "camera":
          this.$router.push({
            path: "/main/cameraData",
            query: { name: e.name, macAddress: e.macAddress }
          });
          break;

        default:
          break;
      }
    },

    // 处理格式化显示
    onFormat(row, column) {
      switch (column.label) {
        case "数据数量":
          return `${row.dataCount} 条数据`;
      }
    }
  }
};
</script>

<style scoped>
</style>