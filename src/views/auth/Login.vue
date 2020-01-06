<template>
  <div class="login">
    <div class="login-con">
      <div class="login-con-header">
        <img src="img/loginlogo.png" alt />
      </div>

      <br />

      <el-form ref="loginForm" status-icon :rules="rules" :model="loginData">
        <el-form-item prop="loginField">
          <el-input
            type="text"
            v-model="loginData.loginField"
            placeholder="请输入手机号或邮箱"
            clearable
            prefix-icon="el-icon-user-solid"
            style="width:330px;"
          ></el-input>
        </el-form-item>

        <v-pass v-model="loginData.password" v-if="flag"></v-pass>
        <v-captcha v-model="loginData.captcha"></v-captcha>

        <el-checkbox v-model="checked" class="login-con-savePass">记住密码</el-checkbox>

        <el-button
          type="primary"
          style="width:330px;"
          class="login-con-btn"
          @keyup.enter.native="onLogin"
          @click="onLogin"
        >登&nbsp;录</el-button>

        <router-link to="/register" class="login-con-register">免费注册</router-link>

        <div class="login-con-findpass">
          <el-dropdown trigger="click" @command="onCommand">
            <span class="el-dropdown-link">找回密码</span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="phone">手机找回</el-dropdown-item>
              <el-dropdown-item command="email">邮箱找回</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import vCaptcha from "./components/captcha";
import vPass from "../user/components/input/password";
import { mapActions } from "vuex";

export default {
  name: "v-login",
  components: {
    vCaptcha,
    vPass
  },
  data() {
    const validateLoginField = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入手机号或邮箱"));
      } else {
        const phoneReg = /^[1][2-9][0-9]{9}$/;
        const emailReg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

        if (phoneReg.test(value) || emailReg.test(value)) {
          if (value.length === 11 && !value.includes("@")) {
            if (!phoneReg.test(value)) {
              callback(new Error("请输入正确的手机号"));
            } else {
              this.loginData.phone = value;
            }
          }
          if (value.includes("@")) {
            if (!emailReg.test(value)) {
              callback(new Error("请输入正确的邮箱"));
            } else {
              this.loginData.email = value;
            }
          }
        } else {
          callback(new Error("请输入正确的格式"));
        }

        callback();
      }
    };
    return {
      loginData: {
        loginField: "",
        phone: "",
        email: "",
        password: "",
        captcha: ""
      },
      rules: {
        loginField: [{ validator: validateLoginField, trigger: "blur" }]
      },
      checked: true,
      flag: false
    };
  },
  mounted() {
    const result = this.$cookie.get();
    this.loginData.loginField = result.loginField;
    this.loginData.password = result.password;
    this.flag = true;
  },

  methods: {
    ...mapActions("userState", ["login"]),

    // 找回密码
    onCommand(val) {
      this.$router.push({
        path: "/findpass",
        query: {
          type: val
        }
      });
    },

    // 提交登陆表单
    onLogin() {
      const vOne = this.$refs.loginForm.validate();
      const vTwo = this.$refs.loginForm.$children[6].validate();
      const vThree = this.$refs.loginForm.$children[1].validate();

      Promise.all([vOne, vTwo, vThree])
        .then(() => {
          if (this.loginData.phone !== "") {
            if (this.checked === true) {
              // 传入手机号，密码，和保存天数3个参数
              this.$cookie.set(
                this.loginData.phone,
                this.loginData.password,
                1
              );
            } else {
              this.$cookie.clear();
            }

            this.login({
              phone: this.loginData.phone,
              password: this.loginData.password,
              captcha: this.loginData.captcha
            });
          } else {
            if (this.checked === true) {
              // 传入邮箱，密码，和保存天数3个参数
              this.$cookie.set(
                this.loginData.email,
                this.loginData.password,
                1
              );
            } else {
              this.$cookie.clear();
            }

            this.login({
              email: this.loginData.email,
              password: this.loginData.password,
              captcha: this.loginData.captcha
            });
          }
        })
        .catch(e => {
          console.log(e);
        });
    }
  }
};
</script>

<style scoped>
.login {
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  right: 0;
  background: linear-gradient(
    to right bottom,
    rgba(126, 213, 111, 0.6),
    rgba(40, 180, 133, 0.6)
  );
  text-align: center;
}
.login-con {
  padding: 15px;
  background: white;
  border-radius: 30px;
  box-shadow: 5px 5px 5px black;

  height: 560px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.login-con-header > img {
  margin-top: 30px;
  width: 300px;
  margin-bottom: 30px;
}
.login-con-btn {
  position: relative;
  top: 30px;
  right: 0;
}
.login-con-savePass {
  position: absolute;
  bottom: 170px;
  left: 20px;
}
.login-con-register {
  position: absolute;
  bottom: 90px;
  left: 20px;
  color: #777;
}
.login-con-findpass {
  cursor: pointer;
  position: absolute;
  bottom: 90px;
  right: 20px;
  color: #777;
}
</style>