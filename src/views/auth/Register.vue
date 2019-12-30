<template>
  <div class="register">
    <div class="register_main">
      <div class="register_main-con">
        <br />
        <br />

        <div class="register_main-con-title">
          <p>注册</p>
        </div>

        <div class="register_main-con-content">
          <el-form ref="registerForm" label-width="150px" :rules="rules" :model="registerData">
            <el-form-item prop="name">
              <el-input
                type="text"
                v-model="registerData.name"
                placeholder="请输入昵称，长度应在3-12位"
                clearable
                prefix-icon="el-icon-user-solid"
                minlength="3"
                maxlength="12"
              ></el-input>
            </el-form-item>

            <el-form-item prop="password">
              <v-pass v-model="registerData.password" placeholder="请输入密码，长度应在9-16位"></v-pass>
            </el-form-item>

            <el-form-item prop="checkPass">
              <v-pass v-model="registerData.checkPass" placeholder="请再次确认密码"></v-pass>
            </el-form-item>

            <el-form-item prop="email">
              <v-Email v-model="registerData.email"></v-Email>
            </el-form-item>

            <el-form-item prop="phone">
              <v-phone v-model="registerData.phone"></v-phone>
            </el-form-item>

            <el-form-item prop="code">
              <v-code v-model="registerData.code"></v-code>
            </el-form-item>

            <el-button
              type="primary"
              class="register_main-con-btn"
              @keyup.enter.native="submit"
              @click="onRegister"
            >注册</el-button>

            <i class="el-icon-arrow-right"></i>
            <router-link to="/login" class="register_main-con-login">立即登录&rarr;</router-link>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { userRulesMixins } from "@/mixins";
import vPass from "../user/components/input/password";
import vEmail from "../user/components/input/email";
import vPhone from "../user/components/input/phone";
import vCode from "../user/components/input/code";

export default {
  mixins: [userRulesMixins],
  name: "v-register",
  components: {
    vPass,
    vEmail,
    vPhone,
    vCode
  },
  data() {
    const validateCheckPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerData.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      registerData: {
        name: "",
        email: "",
        password: "",
        checkPass: "",
        phone: "",
        code: ""
      },

      rules: {
        checkPass: [{ validator: validateCheckPass, trigger: "blur" }]
      }
    };
  },
  methods: {
    ...mapActions("userState", ["register"]),

    // 提交注册表单
    onRegister() {
      this.$refs["registerForm"].validate(valid => {
        if (!valid) return false;

        delete this.registerData.checkPass;
        delete this.registerData.code;

        this.register(this.registerData);
      });
    }
  }
};
</script>

<style scoped>
/* 全局 */
.register {
  padding: 20px 20px 0;
}
/* 主体 */
.register_main {
  height: 95vh;
  background-image: linear-gradient(
      to right bottom,
      rgba(126, 213, 111, 0.6),
      rgba(40, 180, 133, 0.6)
    ),
    url(/img/registerbg.jpg);
  background-size: cover;
  background-position: bottom;
  position: relative;
  -webkit-clip-path: polygon(0 0, 100% 0, 100% 80vh, 0 100%);
  clip-path: polygon(0 0, 100% 0, 100% 80vh, 0 100%);
}
/* 容器 */
.register_main-con {
  height: 560px;
  width: 480px;
  background-color: rgb(255, 255, 255);
  border-radius: 80px;
  position: absolute;
  top: 96px;
  right: 96px;
  box-shadow: 5px 5px 5px black;
}
.register_main-con-title {
  padding-left: 17%;
  padding-bottom: 20px;
}
.register_main-con-content {
  position: relative;
  top: 0;
  right: 73px;
}
.register_main-con-btn {
  cursor: pointer;
  position: relative;
  top: 0;
  right: -149px;
  width: 330px;
}
.register_main-con-login {
  position: relative;
  top: 45px;
  right: -64px;
  color: #777;
}
</style>