<template>
  <div class="login">
    <div class="login__main">
      <div class="login__main-con">
        <div class="login__main-con-header">
          <img src="img/loginlogo.png" alt />
        </div>

        <br />
        <br />

        <div class="login__main-con-content">
          <el-form
            ref="loginForm"
            status-icon
            label-width="150px"
            :rules="rules"
            :model="loginData"
          >
            <el-form-item prop="loginField">
              <el-input
                type="text"
                v-model="loginData.loginField"
                placeholder="请输入手机号或邮箱"
                clearable
                prefix-icon="el-icon-user-solid"
              ></el-input>
            </el-form-item>

            <el-form-item prop="password">
              <el-input
                type="password"
                v-model="loginData.password"
                placeholder="请输入密码（六位至八位)"
                clearable
                show-password
                prefix-icon="el-icon-edit"
                @keyup.enter.native="onLogin"
              ></el-input>
            </el-form-item>

            <v-cap-code :imgcode="loginData.verifyCode" @change="changecode"></v-cap-code>

            <el-checkbox v-model="checked" class="login__main-con-rememberPass">记住密码</el-checkbox>

            <el-button
              type="primary"
              class="login__main-con-btn"
              @keyup.enter.native="submit"
              @click="onLogin"
            >登&nbsp;录</el-button>

            <router-link to="/register" class="login__main-con-register">免费注册</router-link>

            <router-link to="/findpass" class="login__main-con-findpass">找回密码</router-link>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vCapCode from "./components/verifycode";
import { mapActions } from "vuex";
import { getCookie, setCookie, clearCookie } from "@/helper/public";

export default {
  name: "v-login",
  components: {
    vCapCode
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
        verifyCode: ""
      },
      rules: {
        loginField: [{ validator: validateLoginField, trigger: "blur" }],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 9, max: 16, message: "密码长度在9到16位", trigger: "blur" }
        ]
      },
      checked: true
    };
  },
  mounted() {
    const result = getCookie();
    this.loginData.loginField = result.loginField;
    this.loginData.password = result.password;
  },

  methods: {
    ...mapActions("userState", ["login"]),

    // 提交登陆表单
    onLogin() {
      this.$refs["loginForm"].validate(valid => {
        if (!valid) return false;

        if (this.loginData.phone !== "") {
          if (this.checked === true) {
            // 传入手机号，密码，和保存天数3个参数
            setCookie(this.loginData.phone, this.loginData.password, 1);
          } else {
            // 清空Cookie
            clearCookie();
          }

          this.login({
            phone: this.loginData.phone,
            password: this.loginData.password,
            verifyCode: this.loginData.verifyCode
          });
        } else {
          if (this.checked === true) {
            // 传入邮箱，密码，和保存天数3个参数
            setCookie(this.loginData.email, this.loginData.password, 1);
          } else {
            // 清空Cookie
            clearCookie();
          }

          this.login({
            email: this.loginData.email,
            password: this.loginData.password,
            verifyCode: this.loginData.verifyCode
          });
        }
      });
    },

    // 改变验证码
    changecode(value) {
      this.loginData.verifyCode = value;
    }
  }
};
</script>

<style scoped>
/* 全局 */
.login {
  padding: 20px 20px 0;
}
/* 主体 */
.login__main {
  height: 95vh;
  background-image: linear-gradient(
      to right bottom,
      rgba(126, 213, 111, 0.6),
      rgba(40, 180, 133, 0.6)
    ),
    url(/img/loginbg.jpg);
  background-size: cover;
  background-position: bottom;
  position: relative;
  -webkit-clip-path: polygon(0 0, 100% 0, 100% 80vh, 0 100%);
  clip-path: polygon(0 0, 100% 0, 100% 80vh, 0 100%);
}
/* 容器 */
.login__main-con {
  height: 560px;
  width: 480px;
  background-color: rgb(255, 255, 255);
  border-radius: 80px;
  position: absolute;
  top: 96px;
  right: 96px;
  box-shadow: 5px 5px 5px black;
}
.login__main-con-header {
  text-align: center;
}
.login__main-con-header > img {
  margin-top: 64px;
  width: 300px;
}
.login__main-con-content {
  position: relative;
  top: 0;
  right: 70px;
}
.login__main-con-rememberPass {
  display: block;
  position: relative;
  left: 151px;
  top: -12px;
}
.login__main-con-btn {
  cursor: pointer;
  position: relative;
  top: 0;
  right: -150px;
  width: 330px;
}
.login__main-con-register {
  position: relative;
  top: 45px;
  right: 180px;
  color: #777;
}
.login__main-con-findpass {
  position: relative;
  top: 45px;
  right: -20px;
  color: #777;
}
</style>