<template>
  <div class="container">
    <div class="command-box">
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
        @click="onToggleSelection()"
        icon="el-icon-remove-outline"
      >取消</el-button>
      <el-button size="small" type="text" @click="onMultipleDel" icon="el-icon-delete">删除</el-button>
    </div>

    <div class="tablecontent" id="tablecontent">
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
        :default-sort="{prop: 'status', order: 'descending'}"
      >
        <el-table-column type="selection" width="40" />
        <el-table-column type="index" label="序号" align="center">
          <template slot-scope="scope">
            <span>{{(reqData.pagenum - 1) * reqData.pagerow + scope.$index + 1}}</span>
          </template>
        </el-table-column>

        <el-table-column prop="name" label="设备名称" align="center" show-overflow-tooltip />
        <el-table-column prop="macAddress" label="mac地址" align="center" show-overflow-tooltip />
        <el-table-column prop="type" label="设备种类" align="center" show-overflow-tooltip />
        <el-table-column
          prop="createdAt"
          label="创建时间"
          align="center"
          :formatter="onFormat"
          show-overflow-tooltip
          sortable
        />
        <el-table-column
          prop="updatedAt"
          label="最后更新"
          align="center"
          :formatter="onFormat"
          show-overflow-tooltip
          sortable
        />
        <el-table-column
          prop="createdBy"
          label="所有者"
          align="center"
          show-overflow-tooltip
          sortable
        />
        <el-table-column prop="status" label="设备状态" align="center" :formatter="onFormat" sortable />

        <el-table-column label="操作" align="center" width="180">
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
import { deviceService } from "@/services";
import { tableMixins } from "@/mixins";
import { checkBox, tip } from "@/components/MessageBox";
import { format } from "@/helper/public";

export default {
  mixins: [tableMixins],
  name: "v-device",
  components: {
    vDialog,
    vPage
  },
  methods: {
    // 初始化
    async init(item) {
      const result = await deviceService.index(item);
      this.tableData = result.data;
      this.total = result.total;
    },

    // 处理新建编辑
    onDialog(index, operation) {
      switch (operation) {
        case "add":
          this.dialogTitle = "新建设备";
          this.dialogVisible = true;
          this.dialogData = {
            status: false
          };
          break;

        case "edit":
          this.dialogTitle = "编辑设备";
          this.dialogVisible = true;
          this.dialogData = {
            _id: index._id,
            name: index.name,
            macAddress: index.macAddress,
            type: index.type,
            status: index.status
          };
          break;
      }
    },

    // 处理单个删除
    onSingleDel(id) {
      checkBox("是否删除该设备?").then(action => {
        if (action === true) {
          deviceService.del({ _id: id }).then(value => {
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

    // 处理多选删除
    onMultipleDel() {
      let count = 0;
      checkBox("是否删除这些设备?").then(action => {
        if (action === true) {
          this.multipleSelection.forEach(item => {
            deviceService.del({ _id: item["_id"] }).then(value => {
              if (value === true) {
                count = count + 1;
                if (this.multipleSelection.length === count) {
                  tip.dS();
                  this.init(this.reqData);
                }
              }
            });
          });
        } else {
          tip.cancel();
          this.init(this.reqData);
        }
      });
    },

    // 显示数据页面
    onCheck(e) {
      if (e.type === "sensor") {
        this.$router.push({
          path: "/sensorData",
          query: { name: e.name, macAddress: e.macAddress }
        });
      } else if (e.type === "camera") {
        this.$router.push({
          path: "/cameraData",
          query: { name: e.name, macAddress: e.macAddress }
        });
      }
    },

    // 处理格式化显示
    onFormat(row, column) {
      switch (column.label) {
        case "创建时间":
          return format(row.createdAt, "YYYY/MM/DD HH:mm:ss");

        case "最后更新":
          return format(row.updatedAt, "YYYY/MM/DD HH:mm:ss");

        case "设备状态":
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