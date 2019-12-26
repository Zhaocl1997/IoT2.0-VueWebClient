<template>
  <el-dialog
    center
    top="20vh"
    width="30%"
    @open="onOpen"
    @before-close="onCancel"
    :title="dialogTitle"
    :close-on-click-modal="false"
    :visible="dialogVisible"
    :z-index="1000"
  >
    <el-form
      ref="dialogform"
      :model="dialogFormData"
      :rules="rules"
      size="small"
      label-width="100px"
      :label-position="labelPosition"
    >
      <el-form-item label="用户名称：" prop="name">
        <el-input v-model="dialogFormData.name" placeholder="请输入用户名称" clearable />
      </el-form-item>

      <el-form-item label="用户密码：" prop="password" v-if="this.dialogTitle ==='新建用户'">
        <el-input v-model="dialogFormData.password" placeholder="请输入用户密码" show-password clearable />
      </el-form-item>

      <el-form-item label="邮箱地址：" prop="email">
        <el-input v-model="dialogFormData.email" placeholder="请输入邮箱地址" type="email" clearable />
      </el-form-item>

      <el-form-item label="手机号码：" prop="phone">
        <el-input v-model="dialogFormData.phone" placeholder="请输入手机号码" clearable />
      </el-form-item>

      <el-form-item label="用户身份：" prop="role">
        <el-radio-group v-model="dialogFormData.role" placeholder="请选择用户身份">
          <el-radio v-for="item in options" :key="item._id" :label="item._id">{{ item.describe }}</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button size="small" type="primary" @click="onConfirm">确&#32;定</el-button>
      <el-button size="small" @click="onCancel">取&#32;消</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { userService, roleService } from "@/services";
import { action } from "@/helper/public";
import { formMixins, userRulesMixins } from "@/mixins";

export default {
  mixins: [formMixins, userRulesMixins],
  name: "userForm",
  data() {
    return {
      options: []
    };
  },
  methods: {
    // 窗口打开时绑定角色option
    async onOpen() {
      const result = await roleService.options();
      this.options = result.data;
    },

    // 请求
    onAction() {
      return action(
        { t: this.dialogTitle, d: this.dialogFormData },
        "用户",
        userService
      );
    }
  }
};
</script>

<style scoped>
</style>