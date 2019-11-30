<template>
  <el-dialog
    center
    top="20vh"
    width="30%"
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
        <el-input v-else v-model="dialogFormData.title" placeholder="请输入菜单名称" style="width: 100%;" />
      </el-form-item>

      <el-form-item label="图标路径：" prop="icon">
        <el-input v-model="dialogFormData.icon" placeholder="请输入图标路径" />
      </el-form-item>

      <el-form-item label="页面路由：" prop="index">
        <el-input
          v-if="!(this.dialogFormData._id)"
          v-model="dialogFormData.index"
          placeholder="请输入菜单名称"
        />
        <el-input v-else v-model="dialogFormData.index" placeholder="请输入页面路由" style="width: 100%;" />
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button size="small" @click="onCancel">取&#32;消</el-button>
      <el-button size="small" type="primary" @click="onConfirm">确&#32;定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { menuService } from "@/services";
import { formMixins } from "@/mixins";
import { tip } from "@/components/MessageBox";

export default {
  mixins: [formMixins],
  name: "menuForm",
  data() {
    return {
      options: [],
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