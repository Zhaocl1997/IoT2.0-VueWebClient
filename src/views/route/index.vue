<template>
  <div class="table-con">
    <div class="table-box">
      <el-input
        size="small"
        style="width: 25%; margin-right: 10px;"
        v-model="reqData.filters"
        @input="onFilter"
        placeholder="可按路由名称，路径和标题查询"
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
        @click="onToggleSelection"
        icon="el-icon-remove-outline"
      >取消</el-button>
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
        <el-table-column prop="name" label="路由名称" align="center" show-overflow-tooltip />
        <el-table-column prop="path" label="路由路径" align="center" show-overflow-tooltip />

        <el-table-column prop="meta.title" label="路由标题" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column
          prop="meta.needLogin"
          label="是否需要登录"
          align="center"
          show-overflow-tooltip
          width="100px"
        >
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.meta.needLogin"
              @change="onStatus(scope.row._id, scope.row.meta)"
            />
          </template>
        </el-table-column>

        <el-table-column prop="package" label="打包名称" align="center" show-overflow-tooltip />

        <el-table-column prop="component" label="路由组件" align="center" show-overflow-tooltip />

        <el-table-column
          prop="createdAt"
          width="200"
          label="创建时间"
          align="center"
          :formatter="onTimeFormat"
          show-overflow-tooltip
          sortable
          :sort-orders="['ascending', 'descending']"
        />
        <el-table-column
          prop="updatedAt"
          width="200"
          label="更新时间"
          align="center"
          :formatter="onTimeFormat"
          show-overflow-tooltip
          sortable
          :sort-orders="['ascending', 'descending']"
        />

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
import { tableMixins } from "@/mixins";
import { countLineNum } from "@/helper/public";

export default {
  mixins: [tableMixins],
  name: "v-route",
  components: {
    vDialog,
    vPage
  },
  methods: {
    // 一级菜单显示浅绿色,二级菜单显示浅米色
    tableRowClassName({ row }) {
      if (row.meta.needLogin === true) {
        return "on-row";
      } else {
        return "off-row";
      }
    },

    // 初始化
    async init() {
      this.reqData.pagerow = countLineNum();
      this.reqData.sortField = "meta.needLogin";
      const result = await this.$api.routeService.index(this.reqData);
      this.tableData = result.data;
      this.total = result.total;
    },

    // 状态改变
    async onStatus(id, meta) {
      const result = await this.$api.routeService.updateNeedLogin({
        _id: id,
        title: meta.title,
        needLogin: meta.needLogin
      });
      if (result === true) {
        this.$info.tip.uS();
      }
    },

    // 处理新建编辑
    onDialog(index, operation) {
      switch (operation) {
        case "add":
          this.dialogTitle = "新建路由";
          this.dialogVisible = true;
          this.dialogData = {
            needLogin: true
          };
          break;

        case "edit":
          this.dialogTitle = "编辑路由";
          this.dialogVisible = true;
          this.dialogData = {
            _id: index._id,
            name: index.name,
            path: index.path,
            title: index.meta.title,
            needLogin: index.meta.needLogin,
            package: index.package,
            component: index.component
          };
          break;
      }
    },

    // 处理单个删除
    onSingleDel(id) {
      this.$CRUD.singleDel(
        "路由",
        this.$api.routeService,
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