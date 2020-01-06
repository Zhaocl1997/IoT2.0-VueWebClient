<template>
  <div class="table-con">
    <div class="table-box">
      <el-input
        size="small"
        style="width: 25%; margin-right: 10px;"
        v-model="reqData.filters"
        @input="onFilter"
        placeholder="可按标题查询"
        maxlength="10"
        clearable
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

        <el-table-column prop="title" label="文章标题" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="intro" label="文章简述" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column
          prop="content"
          label="文章内容"
          align="center"
          show-overflow-tooltip
          :formatter="onFormat"
        ></el-table-column>
        <el-table-column
          prop="tag"
          label="文章标签"
          align="center"
          show-overflow-tooltip
          :formatter="onFormat"
        ></el-table-column>
        <el-table-column prop="category.name" label="文章分类" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="author.name" label="文章作者" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="like" width="50" label="点赞" align="center" show-overflow-tooltip></el-table-column>

        <el-table-column
          prop="createdAt"
          width="100"
          label="创建时间"
          align="center"
          show-overflow-tooltip
          :formatter="onTimeFormat"
        />
        <el-table-column
          prop="updatedAt"
          width="100"
          label="更新时间"
          align="center"
          show-overflow-tooltip
          :formatter="onTimeFormat"
          :resizable="false"
        />

        <el-table-column label="操作" align="center" width="200">
          <template slot-scope="scope">
            <el-button
              size="small"
              type="text"
              @click="onDialog(scope.row, 'edit')"
              icon="el-icon-edit"
              :disabled="isOwner(scope.row.author._id)"
            >编辑</el-button>
            <el-button
              size="small"
              type="text"
              @click="onSingleDel(scope.row._id)"
              icon="el-icon-delete"
              :disabled="isOwner(scope.row.author._id)"
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

    <el-drawer title="我是标题" :visible.sync="drawer" :with-header="false" size="50%">
      <div class="ql-container ql-snow">
        <div class="ql-editor" v-html="article"></div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import "quill/dist/quill.snow.css";

import vPage from "@/components/pagination";
import vDialog from "./components/form.vue";
import { tableMixins } from "@/mixins";
import { countLineNum, sizeOfStr } from "@/helper/public";

export default {
  mixins: [tableMixins],
  name: "v-articlemanage",
  components: {
    vDialog,
    vPage
  },
  data() {
    return {
      drawer: false,
      article: ""
    };
  },
  methods: {
    // 判断文章作者
    isOwner(id) {
      return id !== this.$ls.get("p1").id;
    },

    // 初始化
    async init() {
      this.reqData.pagerow = countLineNum();
      const result = await this.$api.articleService.index(this.reqData);
      this.tableData = result.data;
      this.total = result.total;
    },

    // 处理新建编辑
    onDialog(index, operation) {
      switch (operation) {
        case "add":
          this.dialogTitle = "新建文章";
          this.dialogVisible = true;
          this.dialogData = {
            tag: []
          };
          break;

        case "edit":
          this.dialogTitle = "编辑文章";
          this.dialogVisible = true;
          this.dialogData = {
            _id: index._id,
            title: index.title,
            intro: index.intro,
            category: index.category._id,
            tag: index.tag,
            content: index.content
          };
          break;
      }
    },

    // 处理单个删除
    onSingleDel(id) {
      this.$CRUD.singleDel(
        "文章",
        this.$api.articleService,
        this.$info,
        id,
        this.init
      );
    },

    // 显示文章页面
    onCheck(val) {
      this.article = val.content;
      this.drawer = true;
    },

    // 处理格式化显示
    onFormat(row, column) {
      switch (column.label) {
        case "文章内容":
          return `${sizeOfStr(row.content)}个字节`;

        case "文章标签":
          return `${row.tag[0]}等${row.tag.length}个标签`;
      }
    }
  }
};
</script>

<style scoped>
</style>