<template>
  <div class="findpass">
    <div class="findpass-con">
      <div class="findpass-con-header">
        <img src="img/loginlogo.png" alt />
      </div>

      <div class="findpass-con-step">
        <el-steps :active="active" finish-status="success" align-center>
          <el-step title="身份认证"></el-step>
          <el-step title="获取验证码"></el-step>
          <el-step title="重置密码"></el-step>
        </el-steps>
      </div>

      <div class="findpass-stepOne" v-if="active === 0">
        <el-form :model="findpass" ref="stepOne">
          <v-email v-model="findpass.email" v-if="type === 'email'"></v-email>
          <v-phone v-model="findpass.phone" v-else></v-phone>
          <v-captcha v-model="findpass.captcha"></v-captcha>
        </el-form>

        <div class="findpass-con-step-btn">
          <el-button size="medium" @click="onBack">返回</el-button>
          <el-button size="medium" @click="onCheckExist">下一步</el-button>
        </div>
      </div>

      <div class="findpass-stepTwo" v-if="active === 1">
        <el-form :model="findpass" ref="stepTwo">
          <el-form-item>
            <p style="padding-left:30px;">
              {{ type === 'email'
              ? `您的邮箱地址为：${findpass.email}`
              : `您的手机号码为：${findpass.phone}` }}
            </p>
          </el-form-item>

          <v-code
            v-if="type === 'email'"
            v-model="findpass.code"
            type="email"
            :info="findpass.email"
          ></v-code>

          <v-code v-else v-model="findpass.code" type="phone" :info="findpass.phone"></v-code>
        </el-form>

        <div class="findpass-con-step-btn">
          <el-button size="medium" @click="onPre">上一步</el-button>
          <el-button size="medium" @click="onCheckCode">下一步</el-button>
        </div>
      </div>

      <div class="findpass-stepThree" v-if="active === 2">
        <el-form :model="findpass" ref="stepThree">
          <v-check-pass v-model="findpass.password"></v-check-pass>
        </el-form>

        <div class="findpass-con-step-btn">
          <el-button size="medium" @click="onResetPass">重置密码</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vCheckPass from "../user/components/input/checkPass";
import vEmail from "../user/components/input/email";
import vPhone from "../user/components/input/phone";
import vCode from "../user/components/input/code";
import vCaptcha from "./components/captcha";

export default {
  name: "v-findpass",
  components: {
    vCheckPass,
    vEmail,
    vPhone,
    vCode,
    vCaptcha
  },
  mounted() {
    this.type = this.$route.query.type;
  },
  data() {
    return {
      active: 0,
      type: "",

      findpass: {
        email: "",
        phone: "",
        code: "",
        password: "",
        captcha: ""
      }
    };
  },
  methods: {
    // 第一阶段
    onBack() {
      this.$router.push("/login");
    },
    onCheckExist() {
      const validateOne = this.$refs.stepOne.$children[0].validate();
      const validateTwo = this.$refs.stepOne.$children[1].validate();

      Promise.all([validateOne, validateTwo])
        .then(() => {
          const info =
            this.type === "email" ? this.findpass.email : this.findpass.phone;

          this.$api.userService
            .checkExist({
              type: this.type,
              info,
              captcha: this.findpass.captcha
            })
            .then(res => {
              if (res === true) {
                this.$info.tip.success("认证成功");
                setTimeout(() => {
                  this.active = 1;
                }, 500);
                this.findpass.captcha = "";
              }
            });
        })
        .catch(e => {
          console.log(e);
        });
    },

    // 第二阶段
    onPre() {
      if (this.active !== 0) this.active--;
    },
    onCheckCode() {
      const validateOne = this.$refs.stepTwo.$children[1].validate();

      Promise.all([validateOne])
        .then(() => {
          this.$api.userService
            .checkCode({
              type: this.type,
              info: this.findpass.code
            })
            .then(res => {
              if (res === true) {
                this.$info.tip.success("验证成功");
                setTimeout(() => {
                  this.active = 2;
                }, 500);
              }
            });
        })
        .catch(e => {
          console.log(e);
        });
    },

    // 第三阶段
    onResetPass() {
      const validateOne = this.$refs.stepThree.$children[0].validate();

      Promise.all([validateOne])
        .then(() => {
          const info =
            this.type === "email"
              ? { email: this.findpass.email, newPass: this.findpass.password }
              : { phone: this.findpass.phone, newPass: this.findpass.password };

          this.$api.userService
            .resetPass({
              type: this.type,
              info
            })
            .then(res => {
              if (res === true) {
                this.$info.tip.success("重置成功");
                setTimeout(() => {
                  this.$router.push("/login");
                }, 500);
              }
            });
        })
        .catch(e => {
          console.log(e);
        });
    }
  }
};
</script>

<style scoped>
.findpass {
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
.findpass-con {
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
.findpass-con-header > img {
  margin-top: 30px;
  width: 300px;
  margin-bottom: 30px;
}
.findpass-con-step {
  padding: 20px 0 20px;
}
.findpass-con-step-btn {
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translate(-50%, -50%);
}
</style>