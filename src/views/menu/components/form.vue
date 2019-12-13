<template>
  <el-dialog
    center
    top="20vh"
    width="30%"
    @open="onOpen"
    @close="onCancel"
    :title="dialogTitle"
    :close-on-click-modal="false"
    :visible="dialogVisible"
  >
    <el-form
      ref="dialogform"
      :model="dialogFormData"
      :rules="rules"
      size="small"
      label-width="100px"
      :label-position="labelPosition"
    >
      <el-form-item label="菜单名称：" prop="title">
        <el-input
          v-if="!(this.dialogFormData._id)"
          v-model="dialogFormData.title"
          placeholder="请输入菜单名称"
        />
        <el-select
          v-else
          v-model="dialogFormData.title"
          clearable
          placeholder="请输入菜单名称"
          size="small"
          @change="onTitleSelect"
        >
          <el-option v-for="item in routeOptions" :key="item._id" :value="item.meta.title"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="图标路径：" prop="icon">
        <el-select v-model="dialogFormData.icon" clearable placeholder="请输入图标路径" size="small">
          <el-option
            v-for="item in iconOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="页面路由：" prop="index">
        <el-input
          v-if="!(this.dialogFormData._id)"
          v-model="dialogFormData.index"
          placeholder="请输入页面路由"
        />
        <el-select
          v-else
          v-model="dialogFormData.index"
          clearable
          placeholder="请输入页面路由"
          size="small"
          @change="onIndexChange"
        >
          <el-option v-for="item in routeOptions" :key="item._id" :value="item.path"></el-option>
        </el-select>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button size="small" type="primary" @click="onConfirm">确&#32;定</el-button>
      <el-button size="small" @click="onCancel">取&#32;消</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { menuService, routeService } from "@/services";
import { formMixins } from "@/mixins";
import { tip } from "@/components/MessageBox";

export default {
  mixins: [formMixins],
  name: "menuForm",
  data() {
    return {
      iconOptions: [
        {
          label: "通用模块管理icon",
          value: "/icon/menu/back.png"
        },
        {
          label: "菜单管理icon",
          value: "/icon/menu/menu.png"
        },
        {
          label: "角色管理icon",
          value: "/icon/menu/role.png"
        },
        {
          label: "用户管理icon",
          value: "/icon/menu/user.png"
        },
        {
          label: "设备管理icon",
          value: "/icon/menu/device.png"
        },
        {
          label: "个人管理icon",
          value: "/icon/menu/info.png"
        },
        {
          label: "数据管理icon",
          value: "/icon/menu/data.png"
        },
        {
          label: "日志管理icon",
          value: "/icon/menu/log.png"
        },
        {
          label: "路由管理icon",
          value: "/icon/menu/route.png"
        },
        {
          label: "产品管理icon",
          value: "/icon/menu/product.png"
        },
        {
          label: "内容管理icon",
          value: "/icon/menu/content.png"
        },
        {
          label: "分类管理icon",
          value: "/icon/menu/class.png"
        },
        {
          label: "文章管理icon",
          value: "/icon/menu/article.png"
        },
        {
          label: "标签管理icon",
          value: "/icon/menu/tag.png"
        },
        {
          label: "物联网管理icon",
          value: "/icon/menu/iot.png"
        }
      ],
      routeOptions: [],
      rules: {
        title: [
          { required: true, message: "菜单名称不能为空", trigger: "blur" }
        ],
        icon: [
          { required: true, message: "图标路径不能为空", trigger: "blur" }
        ],
        index: [
          { required: true, message: "页面路由不能为空", trigger: "blur" }
        ]
      }
    };
  },

  methods: {
    async onOpen() {
      const result = await routeService.options();
      this.routeOptions = result.data;
    },

    onTitleSelect(val) {
      for (let i = 0; i < this.routeOptions.length; i++) {
        const element = this.routeOptions[i];
        if (element.meta.title === val) {
          this.dialogFormData.index = element.path;
        }
      }
    },

    onIndexChange(val) {
      for (let i = 0; i < this.routeOptions.length; i++) {
        const element = this.routeOptions[i];
        if (element.path === val) {
          this.dialogFormData.title = element.meta.title;
        }
      }
    },

    // 请求
    async onAction() {
      if (this.dialogTitle == "编辑菜单") {
        const result = await menuService.update(this.dialogFormData);
        if (result === true) {
          tip.uS();
          return result;
        }
      } else if (this.dialogTitle == "新建菜单") {
        const result = await menuService.create(this.dialogFormData);
        if (result === true) {
          tip.cS();
          return result;
        }
      }
    }
  }
};
</script>

<style scoped>
</style>