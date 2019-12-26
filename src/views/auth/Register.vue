<template>
  <div class="register">
    <div class="register__main">
      <div class="register__main-con">
        <br />
        <br />
        <br />

        <div class="register__main-con-content">
          <el-form ref="registerForm" label-width="150px" :rules="rules" :model="registerData">
            <el-form-item prop="name">
              <el-input
                type="text"
                v-model="registerData.name"
                placeholder="请输入用户名称(3到12位)"
                clearable
                prefix-icon="el-icon-user-solid"
                minlength="3"
                maxlength="12"
              ></el-input>
            </el-form-item>

            <el-form-item prop="password">
              <el-input
                v-model="registerData.password"
                placeholder="请输入用户密码(9到16位)"
                prefix-icon="el-icon-lock"
                show-password
                clearable
                type="password"
                minlength="9"
                maxlength="16"
              ></el-input>
              <div class="register__strong">
                <span id="one"></span>
                <span id="two"></span>
                <span id="three"></span>
                <span id="four"></span>
              </div>
            </el-form-item>

            <el-form-item prop="checkPass">
              <el-input
                v-model="registerData.checkPass"
                placeholder="请再次确认密码(9到16位)"
                prefix-icon="el-icon-unlock"
                show-password
                clearable
                type="password"
                minlength="9"
                maxlength="16"
              ></el-input>
            </el-form-item>

            <el-form-item prop="email">
              <el-autocomplete
                prefix-icon="el-icon-message"
                v-model="registerData.email"
                :fetch-suggestions="onQuerySearch"
                placeholder="请输入邮箱地址"
                :trigger-on-focus="false"
                @select="onQuerySelect"
                clearable
                style="width: 100%;"
                :debounce="100"
              ></el-autocomplete>
            </el-form-item>

            <el-form-item prop="phone">
              <el-input
                v-model.number="registerData.phone"
                placeholder="请输入手机号码"
                maxlength="11"
                clearable
                prefix-icon="el-icon-phone"
              ></el-input>
            </el-form-item>

            <div class="register__main-con-input">
              <el-form-item prop="phoneVerifiCode">
                <el-input
                  v-model.number="registerData.phoneVerifiCode"
                  placeholder="请输入验证码"
                  clearable
                  prefix-icon="el-icon-paperclip"
                  :disabled="true"
                ></el-input>
              </el-form-item>
              <div class="register__main-con-codebtn">
                <el-button type="primary" :disabled="true">获取验证码</el-button>
              </div>
            </div>

            <el-button
              type="primary"
              class="register__main-con-btn"
              @keyup.enter.native="submit"
              @click="onRegister"
            >注册</el-button>

            <router-link to="/login" class="register__main-con-login">立即登录&rarr;</router-link>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { userRulesMixins } from "@/mixins";
import { checkStrong } from "@/helper/public";

export default {
  mixins: [userRulesMixins],
  name: "v-register",
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
        phoneVerifiCode: ""
      },

      emailOptions: [],
      msgText: "",

      rules: {
        checkPass: [{ validator: validateCheckPass, trigger: "blur" }]
      }
    };
  },
  mounted() {
    this.emailOptions = this.loadAll();
  },
  watch: {
    "registerData.password": {
      deep: true,
      handler: function(newV) {
        this.msgText = checkStrong(newV);
        if (this.msgText > 1 || this.msgText == 1) {
          document.getElementById("one").style.background =
            "rgba(144,238,144,.8)";
        } else {
          document.getElementById("one").style.background = "#eee";
        }
        if (this.msgText > 2 || this.msgText == 2) {
          document.getElementById("two").style.background =
            "rgba(255,255,0,.8)";
        } else {
          document.getElementById("two").style.background = "#eee";
        }
        if (this.msgText > 3 || this.msgText == 3) {
          document.getElementById("three").style.background =
            "rgba(240,128,128,.8)";
        } else {
          document.getElementById("three").style.background = "#eee";
        }
        if (this.msgText == 4) {
          document.getElementById("four").style.background = "rgba(255,0,0,.8)";
        } else {
          document.getElementById("four").style.background = "#eee";
        }
      }
    }
  },
  methods: {
    ...mapActions("userState", ["register"]),

    // 提交注册表单
    onRegister() {
      this.$refs["registerForm"].validate(valid => {
        if (valid) {
          this.register({
            name: this.registerData.name,
            email: this.registerData.email,
            password: this.registerData.password,
            phone: JSON.stringify(this.registerData.phone)
          });
        } else {
          return false;
        }
      });
    },
    loadAll() {
      return [
        { value: "@qq.com" },
        { value: "@163.com" },
        { value: "@gmail.com" },
        { value: "@126.com" },
        { value: "@yahoo.com.cn" },
        { value: "@vip.qq.com " },
        { value: "@foxmail.com" },
        { value: "@sina.com" },
        { value: "@sohu.com" },
        { value: "@sogou.com" }
      ];
    },
    
    onQuerySearch(queryString, callback) {
      let emailOptions = this.emailOptions;
      // 把数组的浅复制换成深复制
      let results = JSON.parse(JSON.stringify(emailOptions));
      for (let item in results) {
        results[item].value = queryString + "" + emailOptions[item].value;
      }
      callback(results);
    },

    onQuerySelect(val) {
      this.registerData.email = val.value;
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
.register__main {
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
.register__main-con {
  height: 560px;
  width: 480px;
  background-color: rgb(255, 255, 255);
  border-radius: 80px;
  position: absolute;
  top: 96px;
  right: 96px;
  box-shadow: 5px 5px 5px black;
}
.register__main-con-content {
  position: relative;
  top: 0;
  right: 73px;
}
.register__main-con-input {
  position: relative;
  width: 340px;
  height: 64px;
}
.register__main-con-codebtn {
  position: absolute;
  right: -128px;
  bottom: 24px;
}
.register__main-con-btn {
  cursor: pointer;
  position: relative;
  top: 0;
  right: -149px;
  width: 330px;
}
.register__main-con-login {
  position: relative;
  top: 45px;
  right: -64px;
  color: #777;
}
.register__strong {
  height: 5px;
  margin-bottom: 5px;
}
.register__strong span {
  display: inline-block;
  width: 82px;
  height: 10px;
  background: #eee;
}
</style>