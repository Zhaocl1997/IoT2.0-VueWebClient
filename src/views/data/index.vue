<template>
  <div class="table-con">
    <div class="table-box">
      <el-select
        v-model="user"
        clearable
        placeholder="请选择用户"
        @change="onSelectChange(1)"
        @focus="onFocus(1)"
        size="small"
        style="margin-right:30px;width:150px"
      >
        <el-option v-for="item in userOptions" :key="item._id" :label="item.name" :value="item._id"></el-option>
      </el-select>

      <el-select
        v-model="device"
        clearable
        placeholder="请选择设备"
        @change="onSelectChange(2)"
        @focus="onFocus(2)"
        size="small"
        style="margin-right:30px;width:150px"
      >
        <el-option
          v-for="item in deviceOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>

      <el-select
        v-model="type"
        clearable
        placeholder="请选择类型"
        @change="onSelectChange(3)"
        @focus="onFocus(3)"
        size="small"
        style="margin-right:30px;width:150px"
      >
        <el-option
          v-for="item in typeOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>

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
        @cell-mouse-enter="onHover"
        @cell-mouse-leave="onLeave"
      >
        <el-table-column type="index" label="序号" align="center" :resizable="false">
          <template slot-scope="scope">
            <span>{{ (reqData.pagenum - 1) * reqData.pagerow + scope.$index + 1 }}</span>
          </template>
        </el-table-column>

        <el-table-column
          prop="createdBy.createdBy.name"
          label="用户名称"
          align="center"
          show-overflow-tooltip
          width="150px"
        />
        <el-table-column
          prop="createdBy.type"
          label="设备类型"
          align="center"
          show-overflow-tooltip
          width="80px"
        />
        <el-table-column
          prop="createdBy.name"
          label="设备名称"
          align="center"
          show-overflow-tooltip
          width="80px"
        />
        <el-table-column
          prop="macAddress"
          label="mac地址"
          align="center"
          show-overflow-tooltip
          width="150px"
        />
        <el-table-column
          prop="data"
          label="详细数据"
          align="center"
          show-overflow-tooltip
          :formatter="onDataFormat"
        />
        <el-table-column
          prop="createdAt"
          label="创建时间"
          align="center"
          show-overflow-tooltip
          :formatter="onTimeFormat"
          sortable
          :sort-orders="['ascending', 'descending']"
          width="150px"
        />
        <el-table-column
          prop="updatedAt"
          label="更新时间"
          align="center"
          show-overflow-tooltip
          :formatter="onTimeFormat"
          sortable
          :sort-orders="['ascending', 'descending']"
          width="150px"
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

    <div id="table-img" v-if="img">
      <img :src="src" alt style="height:210px;width:280px;" />
    </div>
  </div>
</template>

<script>
import vPage from "@/components/pagination";
import { dataService, userService } from "@/services";
import { tableMixins } from "@/mixins";
import { checkBox, tip } from "@/components/MessageBox";
import { countLineNum } from "@/helper/public";

export default {
  mixins: [tableMixins],
  name: "v-data",
  data() {
    return {
      img: false,
      src: "",
      user: "",
      device: "",
      type: "",
      userOptions: [],
      deviceOptions: [],
      typeOptions: []
    };
  },
  components: {
    vPage
  },
  methods: {
    // 初始化
    async init() {
      this.reqData.pagerow = countLineNum();
      const result = await dataService.index(this.reqData);
      this.tableData = result.data;
      this.total = result.total;
    },

    // 处理单个删除
    onSingleDel(id) {
      checkBox("是否删除该数据?").then(action => {
        if (action === true) {
          dataService.del({ _id: id }).then(value => {
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
      checkBox("是否删除这些数据?").then(action => {
        if (action === true) {
          this.multipleSelection.forEach(item => {
            dataService.del({ _id: item["_id"] }).then(value => {
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

    // 数据格式转换
    onDataFormat(row) {
      switch (row.createdBy.type) {
        case "sensor":
          return `温度：${row.data.t}, 湿度：${row.data.h}`;

        case "camera":
          return `状态：${row.data.status}, 大小：${Number.parseInt(
            row.data.size / 1024
          )}KB`;

        default:
          break;
      }
    },

    // 摄像头div显示
    onHover(row, column) {
      if (row.data.url && column.label === "详细数据") {
        this.src = row.data.url;
        this.img = true;
      }
    },

    // 摄像头div隐藏
    onLeave() {
      this.img = false;
    },

    async onFocus(val) {
      if (val === 1) {
        let result = await userService.options();
        this.userOptions = result.user;
      } else if (val === 2) {
        console.log(222);
      } else if (val === 3) {
        console.log(333);
      }
    },

    onSelectChange(val) {
      if (val === 1) {
        console.log(this.user);
      } else if (val === 2) {
        console.log(222);
      } else if (val === 3) {
        console.log(333);
      }
    }
  }
};
</script>

<style scoped>
#table-img {
  position: fixed;
  top: 22%;
  right: 9%;
}
</style>