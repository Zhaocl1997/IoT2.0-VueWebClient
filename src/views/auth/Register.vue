<template>
  <div class="register">
    <div class="register-con">
      <div class="register-con-header">
        <img src="img/loginlogo.png" alt />
      </div>

      <br />

      <el-form ref="registerForm" :rules="rules" :model="registerData">
        <el-form-item prop="name">
          <el-input
            type="text"
            v-model="registerData.name"
            placeholder="请输入昵称，长度应在3-12位"
            clearable
            prefix-icon="el-icon-user-solid"
            minlength="3"
            maxlength="12"
            style="width:330px;"
          ></el-input>
        </el-form-item>

        <v-check-pass v-model="registerData.password"></v-check-pass>
        <v-phone v-model="registerData.phone"></v-phone>
        <v-code v-model="registerData.code" type="phone" :info="registerData.phone"></v-code>

        <el-button
          type="primary"
          style="width:330px;"
          class="register-con-btn"
          @keyup.enter.native="onRegister"
          @click="onRegister"
        >注&nbsp;册</el-button>

        <router-link to="/login" class="register-con-login">立即登录</router-link>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import vCheckPass from "../user/components/input/checkPass";
import vPhone from "../user/components/input/phone";
import vCode from "../user/components/input/code";

export default {
  name: "v-register",
  components: {
    vCheckPass,
    vPhone,
    vCode
  },
  data() {
    return {
      registerData: {
        name: "",
        password: "",
        phone: "",
        code: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入昵称", trigger: "blur" },
          { min: 3, max: 12, message: "昵称长度在3到12位", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    ...mapActions("userState", ["register"]),

    // 提交注册表单
    onRegister() {
      const vFour = this.$refs.registerForm.$children[3].validate();
      Promise.all([this.validate(), vFour])
        .then(() => {
          this.register(this.registerData);
        })
        .catch(e => {
          console.log(e);
        });
    },

    // 验证
    validate() {
      const vOne = this.$refs.registerForm.validate();
      const vTwo = this.$refs.registerForm.$children[1].validate();
      const vThree = this.$refs.registerForm.$children[2].validate();
      return Promise.all([vOne, vTwo, vThree]);
    }
  }
};
</script>

<style scoped>
.register {
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
.register-con {
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
.register-con-header > img {
  margin-top: 30px;
  width: 300px;
}
.register-con-login {
  position: absolute;
  bottom: 10px;
  right: 20px;
  color: #777;
}
</style>