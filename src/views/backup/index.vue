<template>
  <div class="table-con">
    <div class="table-box">
      <span style="margin-right:20px;">数据库名称：{{ dbname }}</span>
      <el-button size="small" type="text" @click="init" icon="el-icon-refresh">刷新</el-button>
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
      >
        <el-table-column prop="colname" label="集合名称" align="center" show-overflow-tooltip />
        <el-table-column prop="colcount" label="数据数量" align="center" show-overflow-tooltip />
        <el-table-column
          prop="colsize"
          label="存储大小"
          align="center"
          show-overflow-tooltip
          :resizable="false"
        />

        <el-table-column label="操作" align="center" width="180">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="onBackup(scope.row)" icon="el-icon-plus">备份</el-button>

            <el-popover ref="popover" placement="right" trigger="click" @hide="onHide">
              <el-select
                v-model="cloudFileName"
                clearable
                placeholder="请选择"
                @focus="onListDir(scope.row.colname)"
                size="small"
              >
                <el-option
                  v-for="item in options"
                  :key="item.url"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>

              <el-button size="mini" type="text" @click="onRestore(scope.row.colname)">确定</el-button>

              <el-button slot="reference" size="mini" type="text" icon="el-icon-edit">还原</el-button>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { dbService } from "@/services";
import { checkBox, prompt, tip } from "@/components/MessageBox";

export default {
  name: "v-db",
  data() {
    return {
      dbname: "",
      tableData: [],
      options: [],
      cloudFileName: ""
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    // 初始化
    async init() {
      const result = await dbService.index();
      this.dbname = result.dbname;
      this.tableData = result.data;
    },

    // 备份
    onBackup(val) {
      prompt("请输入备份文件名", "提示", val.colsize).then(result => {
        if (result.status === true) {
          const params = {
            colname: val.colname,
            filename: result.value,
            dbname: this.dbname
          };

          dbService.exportDB(params).then(res => {
            if (res === true) {
              tip.success("备份成功");
            }
          });
        }
      });
    },

    // 列出云端目录
    async onListDir(val) {
      const result = await dbService.list({
        dbname: this.dbname,
        colname: val
      });
      this.options = result;
    },

    // popover 隐藏
    onHide() {
      this.cloudFileName = "";
    },

    // 还原
    onRestore(val) {
      this.display = false;

      const params = {
        dbname: this.dbname,
        colname: val,
        filename: this.cloudFileName
      };

      checkBox(`确定要还原文件 ${this.cloudFileName} 吗?`).then(action => {
        if (action === true) {
          dbService.importDB(params).then(res => {
            if (res === true) {
              tip.success("还原成功");
            }
          });
        }
      });
    }
  }
};
</script>

<style scoped>
</style>