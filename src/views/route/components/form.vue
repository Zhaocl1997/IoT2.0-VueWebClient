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
      <el-form-item label="路由名称：" prop="name">
        <el-input v-model="dialogFormData.name" placeholder="请输入路由名称" />
      </el-form-item>

      <el-form-item label="路由路径：" prop="path">
        <el-input v-model="dialogFormData.path" placeholder="请输入路由路径" />
      </el-form-item>

      <el-form-item label="路由标题：" prop="title">
        <el-input v-model="dialogFormData.title" placeholder="请输入路由标题" />
      </el-form-item>

      <el-form-item label="打包名称：" prop="package">
        <el-input v-model="dialogFormData.package" placeholder="请输入打包名称" />
      </el-form-item>

      <el-form-item label="路由组件：" prop="component">
        <el-input v-model="dialogFormData.component" placeholder="请输入路由组件" />
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button size="small" type="primary" @click="onConfirm">确&#32;定</el-button>
      <el-button size="small" @click="onCancel">取&#32;消</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { routeService } from "@/services";
import { tip } from "@/components/MessageBox";
import { formMixins } from "@/mixins";

export default {
  mixins: [formMixins],
  name: "RouteAddEditForm",
  data() {
    return {
      rules: {
        name: [
          { required: true, message: "路由名称不能为空", trigger: "blur" }
        ],
        path: [
          { required: true, message: "路由路径不能为空", trigger: "blur" }
        ],
        title: [
          { required: true, message: "路由标题不能为空", trigger: "blur" }
        ],
        package: [
          { required: true, message: "打包名称不能为空", trigger: "blur" }
        ],
        component: [
          { required: true, message: "路由组件不能为空", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    // 请求
    async onAction() {
      const form = {
        name: this.dialogFormData.name,
        path: this.dialogFormData.path,
        meta: {
          title: this.dialogFormData.title,
          needLogin: this.dialogFormData.needLogin
        },
        package: this.dialogFormData.package,
        component: this.dialogFormData.component
      };

      if (this.dialogTitle == "编辑路由") {
        form._id = this.dialogFormData._id;
        const result = await routeService.update(form);
        if (result === true) {
          tip.uS();
          return result;
        }
      } else if (this.dialogTitle == "新建路由") {
        const result = await routeService.create(form);
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