<template>
  <div class="table-con">
    <div class="table-box">
      <span style="font-size:14px;margin-right:5px;">用户:</span>
      <el-select
        v-model="user"
        clearable
        placeholder="请选择用户"
        @change="onSelectChange(0)"
        @focus="onFocus(0)"
        size="mini"
        style="width:120px"
      >
        <el-option v-for="item in userOptions" :key="item._id" :label="item.name" :value="item._id"></el-option>
      </el-select>

      <span style="font-size:14px;margin-right:5px;margin-left:5px;" v-if="user">类型:</span>
      <el-select
        v-model="type"
        clearable
        placeholder="请选择类型"
        @change="onSelectChange(1)"
        @focus="onFocus(1)"
        size="mini"
        style="width:120px"
        v-if="user"
      >
        <el-option
          v-for="item in typeOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>

      <span style="font-size:14px;margin-right:5px;margin-left:5px;" v-if="type">设备:</span>
      <el-select
        v-model="device"
        clearable
        placeholder="请选择设备"
        @change="onSelectChange(2)"
        @focus="onFocus(2)"
        size="mini"
        style="width:120px"
        v-if="type"
      >
        <el-option
          v-for="item in deviceOptions"
          :key="item._id"
          :label="item.name"
          :value="item._id"
        ></el-option>
      </el-select>

      <span style="font-size:14px;margin-right:5px;margin-left:5px;" v-if="device">时间:</span>
      <el-date-picker
        v-model="time"
        :editable="false"
        size="mini"
        type="datetimerange"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
        v-if="device"
        @change="onSelectChange(3)"
        format="yyyy/MM/dd HH:mm:ss"
        style="width:300px;"
      ></el-date-picker>

      <el-button
        style="margin-left:20px;"
        size="small"
        type="text"
        @click="onDataFresh"
        icon="el-icon-refresh"
      >刷新</el-button>
      <el-button size="small" type="text" @click="onConDel" icon="el-icon-delete-solid">清空</el-button>
      <el-button
        size="small"
        type="text"
        @click="onToggleSelection()"
        icon="el-icon-remove-outline"
      >取消</el-button>
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
        @cell-mouse-enter="onHover"
        @cell-mouse-leave="onLeave"
        @selection-change="onSelectionChange"
      >
        <el-table-column type="selection" width="40" />
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
          :formatter="onFormat"
        />
        <el-table-column
          prop="createdAt"
          label="创建时间"
          align="center"
          show-overflow-tooltip
          :formatter="onFormat"
          sortable
          :sort-orders="['ascending', 'descending']"
          width="150px"
        />
        <el-table-column
          prop="updatedAt"
          label="更新时间"
          align="center"
          show-overflow-tooltip
          :formatter="onFormat"
          sortable
          :sort-orders="['ascending', 'descending']"
          width="150px"
        />

        <el-table-column label="操作" align="center" width="80">
          <template slot-scope="scope">
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

    <div id="table-img" v-if="camera_img">
      <img :src="camera_src" alt style="height:210px;width:280px;" />
    </div>
  </div>
</template>

<script>
import vPage from "@/components/pagination";
import { userService, deviceService, dataService } from "@/services";
import { checkBox, tip } from "@/components/MessageBox";
import { countLineNum, format } from "@/helper/public";

export default {
  name: "v-data",
  data() {
    return {
      camera_img: false, // 图片div是否显示
      camera_src: "", // 图片src

      tableData: [], // table数据
      total: 1, // 数据数量

      // 请求数据
      reqData: {
        pagenum: 1, // 页号
        pagerow: 1, // 每页记录数

        sortField: "createdAt", // 排序字段
        sortOrder: "descending", // 排序顺序

        condition: {}, // 条件
        type: "byInit" // 类型
      },

      user: "", // 用户ID
      type: "", // 设备类型
      device: "", // 设备ID
      time: "",

      userOptions: [], // 用户选项
      typeOptions: [], // 设备类型选项
      deviceOptions: [] // 设备选项
    };
  },
  components: {
    vPage
  },
  mounted() {
    this.init();
  },
  watch: {
    // 监听变化
    user() {
      this.type = "";
      this.device = "";
      this.time = "";
    },
    type() {
      this.device = "";
      this.time = "";
    },
    device() {
      this.time = "";
    }
  },
  methods: {
    // 初始化
    async init() {
      this.reqData.pagerow = countLineNum();
      const result = await dataService.index(this.reqData);
      this.tableData = result.data;
      this.total = result.total;
    },

    // 分页参数
    onPage(data) {
      this.reqData.pagenum = data;
      this.init();
    },

    // 排序参数
    onSort(e) {
      this.reqData.sortField = e.prop;
      this.reqData.sortOrder = e.order;
      this.init();
    },

    // 刷新
    onDataFresh() {
      this.$refs.multipleTable.clearSort();
      this.init();
    },

    // 清空条件
    onConDel() {
      this.user = "";
      this.device = "";
      this.type = "";
      this.time = "";

      this.reqData.type = "byInit";
      this.reqData.condition = {};
      this.$refs.multipleTable.clearSort();
      this.init();
    },

    // 摄像头div显示
    onHover(row, column) {
      if (row.data.url && column.label === "详细数据") {
        this.camera_src = row.data.url;
        this.camera_img = true;
      }
    },

    // 摄像头div隐藏
    onLeave() {
      this.camera_img = false;
    },

    // 处理格式化显示
    onFormat(row, column) {
      // 列格式化
      switch (column.label) {
        case "创建时间":
          return format(row.createdAt, "YYYY/MM/DD HH:mm:ss");

        case "更新时间":
          return format(row.updatedAt, "YYYY/MM/DD HH:mm:ss");

        default:
          break;
      }

      // 行格式化
      switch (row.createdBy.type) {
        case "sensor":
          return `温度：${row.data.t}℃, 湿度：${row.data.h}%`;

        case "camera":
          return `状态：${row.data.status}, 大小：${Number.parseInt(
            row.data.size / 1024
          )}KB`;

        default:
          break;
      }
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

    // 处理多选变化
    onSelectionChange(val) {
      this.multipleSelection = val;
    },

    // 触发多选取消
    onToggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },

    // select foucus 事件
    async onFocus(val) {
      switch (val) {
        case 0: {
          // 获取用户信息
          const result = await userService.options();
          this.userOptions = result.data;
          break;
        }

        case 1: {
          // 获取设备类型信息
          this.typeOptions = [
            { value: "sensor", label: "传感器" },
            { value: "camera", label: "摄像头" }
          ];
          break;
        }

        case 2: {
          // 根据用户ID 和 设备类型 获取 相应设备信息
          const result = await deviceService.options({
            _id: this.user,
            type: this.type
          });
          this.deviceOptions = result.data;
          break;
        }

        default:
          break;
      }
    },

    // select change 事件
    async onSelectChange(val) {
      switch (val) {
        case 0:
          this.reqData.type = "byUser";
          this.reqData.condition = {
            userID: this.user
          };
          this.init();
          break;

        case 1:
          this.reqData.type = "byType";
          this.reqData.condition = {
            userID: this.user,
            type: this.type
          };
          this.init();
          break;

        case 2:
          this.reqData.type = "byDevice";
          this.reqData.condition = {
            userID: this.user,
            type: this.type,
            deviceID: this.device
          };
          this.init();
          break;

        case 3:
          if (this.time === null) return;

          this.reqData.type = "byTime";
          this.reqData.condition = {
            userID: this.user,
            type: this.type,
            deviceID: this.device,
            time: this.time
          };
          this.init();
          break;

        default:
          break;
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