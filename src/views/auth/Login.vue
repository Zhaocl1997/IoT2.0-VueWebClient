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
                @keyup.enter.native="handleLogin"
              ></el-input>
            </el-form-item>

            <vcode :imgcode="loginData.verifyCode" @change="changecode"></vcode>

            <el-checkbox v-model="checked" class="login__main-con-rememberPass">记住密码</el-checkbox>

            <el-button
              type="primary"
              class="login__main-con-btn"
              @keyup.enter.native="submit"
              @click="handleLogin"
            >登&nbsp;录</el-button>

            <router-link to="/register" class="login__main-con-register">免费注册</router-link>
            <a to="/modifypwd" class="login__main-con-findpass" :disabled="true">找回密码</a>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vcode from "./components/verifycode";
import { mapActions } from "vuex";
import { aes } from "@/helper/crypto";

export default {
  name: "login",
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
    this.getCookie();
  },
  components: {
    vcode
  },
  methods: {
    ...mapActions("userState", ["login"]),

    // 提交登陆表单
    handleLogin() {
      this.$refs["loginForm"].validate(valid => {
        if (valid) {
          if (this.loginData.phone !== "") {
            if (this.checked === true) {
              // 传入手机号，密码，和保存天数3个参数
              this.setCookie(this.loginData.phone, this.loginData.password, 1);
            } else {
              // 清空Cookie
              this.clearCookie();
            }

            this.login({
              phone: this.loginData.phone,
              password: this.loginData.password,
              verifyCode: this.loginData.verifyCode
            });
          } else {
            if (this.checked === true) {
              // 传入邮箱，密码，和保存天数3个参数
              this.setCookie(this.loginData.email, this.loginData.password, 1);
            } else {
              // 清空Cookie
              this.clearCookie();
            }

            this.login({
              email: this.loginData.email,
              password: this.loginData.password,
              verifyCode: this.loginData.verifyCode
            });
          }
        } else {
          return false;
        }
      });
    },

    changecode(value) {
      this.loginData.verifyCode = value;
    },

    // 设置cookie
    setCookie(field, password, exdays) {
      const exdate = new Date(); //获取时间

      const userField = aes.en(field);
      const userPwd = aes.en(password);

      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
      //字符串拼接cookie
      window.document.cookie =
        "userField" +
        "=" +
        userField +
        ";path=/;expires=" +
        exdate.toGMTString();
      window.document.cookie =
        "userPwd" + "=" + userPwd + ";path=/;expires=" + exdate.toGMTString();
    },

    // 读取cookie
    getCookie: function() {
      if (document.cookie.length > 0) {
        const arr = document.cookie.split("; "); // 这里显示的格式需要切割一下自己可输出看下
        for (let i = 0; i < arr.length; i++) {
          const arr2 = arr[i].split("="); // 再次切割
          // 判断查找相对应的值
          if (arr2[0] == "userField") {
            this.loginData.loginField = aes.de(arr2[1]); // 保存到保存数据的地方
          } else if (arr2[0] == "userPwd") {
            this.loginData.password = aes.de(arr2[1]);
          }
        }
      }
    },

    // 清除cookie
    clearCookie: function() {
      this.setCookie("", "", -1); // 修改2值都为空，天数为负1天就好了
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