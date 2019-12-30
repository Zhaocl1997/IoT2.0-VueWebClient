<template>
  <div class="findpass">
    <div class="findpass__main">
      <div class="findpass__main-con">
        <div class="findpass__main-con-wrap">
          <div class="findpass__main-con-wrap-header">
            <img src="img/loginlogo.png" alt />
          </div>

          <p>
            <i class="el-icon-message"></i> 使用邮箱重置密码
          </p>

          <el-form :model="findpass" :rules="rules" ref="findpass">
            <el-form-item prop="email">
              <v-email v-model="findpass.email" ref="vEmail"></v-email>
            </el-form-item>

            <el-form-item prop="code">
              <v-code v-model="findpass.code" :validataEmail="findpass.email"></v-code>
            </el-form-item>

            <el-form-item prop="newPass">
              <v-pass v-model="findpass.newPass" placeholder="请输入新密码"></v-pass>
            </el-form-item>

            <el-form-item prop="checkPass">
              <v-pass v-model="findpass.checkPass" placeholder="请再次输入密码"></v-pass>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="onFindPass" style="width:330px;">重置密码</el-button>
            </el-form-item>
          </el-form>

          <i class="el-icon-arrow-left"></i>
          <router-link to="/login" style="font-size:12px;color:black;">返回</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vEmail from "../user/components/input/email";
import vPass from "../user/components/input/password";
import vCode from "../user/components/input/code";
import { userService } from "@/services";
import { tip } from "@/components/MessageBox";

export default {
  name: "v-findpass",
  components: {
    vEmail,
    vPass,
    vCode
  },
  data() {
    const validateCheckPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.findpass.newPass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      findpass: {
        email: "",
        code: "",
        newPass: "",
        checkPass: ""
      },

      rules: {
        email: [
          {
            required: true,
            message: "请输入邮箱",
            trigger: "change"
          },
          {
            pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
            message: "请输入正确的邮箱",
            trigger: "change"
          }
        ],
        code: [
          {
            required: true,
            message: "请输入验证码",
            trigger: "blur"
          }
        ],
        newPass: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          },
          {
            min: 9,
            max: 16,
            message: "密码长度在9到16位",
            trigger: "blur"
          }
        ],
        checkPass: [{ validator: validateCheckPass, trigger: "blur" }]
      }
    };
  },
  methods: {
    async onFindPass() {
      const result = await userService.findpass(this.findpass);
      if (result === true) {
        tip.success("更新密码成功");
        setTimeout(() => {
          this.$router.push("/login");
        }, 500);
      }
    }
  }
};
</script>

<style scoped>
/* 全局 */
.findpass {
  padding: 20px 20px 0;
}
/* 主体 */
.findpass__main {
  height: 95vh;
  background-image: linear-gradient(
    to right bottom,
    rgba(126, 213, 111, 0.6),
    rgba(40, 180, 133, 0.6)
  );
  background-size: cover;
  background-position: bottom;
  position: relative;
  -webkit-clip-path: polygon(0 0, 100% 0, 100% 80vh, 0 100%);
  clip-path: polygon(0 0, 100% 0, 100% 80vh, 0 100%);
  margin: 0 auto;
}

/* 容器 */
.findpass__main-con {
  height: 560px;
  width: 480px;
  background-color: rgb(255, 255, 255);
  border-radius: 80px;

  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  box-shadow: 5px 5px 5px black;
}
.findpass__main-con-wrap {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.findpass__main-con-wrap-header {
  text-align: center;
}
.findpass__main-con-wrap-header > img {
  width: 300px;
}
.findpass__main-con-wrap p {
  font-size: 16px;
  padding: 20px;
  font-weight: 100;
}
</style>