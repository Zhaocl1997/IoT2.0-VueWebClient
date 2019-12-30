<template>
  <div class="changePass">
    <h2>修改密码</h2>

    <el-divider></el-divider>

    <el-form ref="changePassForm" label-width="150px" :rules="rules" :model="changePass">
      <el-form-item label="原密码：" prop="oldPass">
        <v-pass @pass="onOldPass" placeholder="请输入现在使用的密码。"></v-pass>
      </el-form-item>

      <el-form-item label="新密码：" prop="newPass">
        <v-pass @pass="onNewPass" placeholder="请输入密码，长度应在9-16位。"></v-pass>
      </el-form-item>

      <el-form-item label="确认新密码：" prop="conPass">
        <v-pass @pass="onConfirmPass" placeholder="请再次确认密码。"></v-pass>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onChangePass">保&#32;存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import vPass from "../input/password";
import { userService } from "@/services";
import { tip } from "@/components/MessageBox";
import { mapActions } from "vuex";

export default {
  name: "v-changePass",
  data() {
    const vConfirmPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.changePass.newPass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    return {
      changePass: {
        oldPass: "",
        newPass: "",
        conPass: ""
      },
      rules: {
        oldPass: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 9, max: 16, message: "密码长度在9到16位", trigger: "blur" }
        ],
        newPass: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 9, max: 16, message: "密码长度在9到16位", trigger: "blur" }
        ],
        conPass: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { validator: vConfirmPass, trigger: "blur" }
        ]
      }
    };
  },
  components: {
    vPass
  },
  methods: {
    ...mapActions("userState", ["logout"]),

    onOldPass(val) {
      this.changePass.oldPass = val;
    },
    onNewPass(val) {
      this.changePass.newPass = val;
    },
    onConfirmPass(val) {
      this.changePass.conPass = val;
    },
    async onChangePass() {
      const valid = await this.$refs["changePassForm"].validate();
      if (!valid) return;

      const result = await userService.changePass({
        oldPass: this.changePass.oldPass,
        newPass: this.changePass.newPass,
        conPass: this.changePass.conPass
      });

      if (result === true) {
        tip.success("修改密码成功");
        this.logout();
      }
    }
  }
};
</script>

<style scoped>
</style>