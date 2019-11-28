<template>
  <div class="verifyCode">
    <el-form-item prop="verifyCode">
      <el-input
        v-model="verifyCode"
        class="verifyCode__input"
        placeholder="请输入验证码"
        clearable
        @blur="onChangecode"
      ></el-input>
    </el-form-item>

    <div class="verifyCode__pic" v-html="svgcode" @click="captcha"></div>
  </div>
</template>

<script>
import { userService } from "@/services";

export default {
  name: "verifycode",
  data() {
    return {
      verifyCode: "",
      svgcode: "",
      rules: {
        verifyCode: [
          { required: true, message: "验证码不能为空", trigger: "blur" }
        ]
      }
    };
  },
  props: {
    imgcode: {
      type: String,
      required: true,
      default: ""
    }
  },
  beforeMount() {
    this.verifyCode = this.imgcode;
  },
  created() {
    this.captcha();
  },
  methods: {
    async captcha() {
      const result = await userService.captcha();
      this.svgcode = result.img;
    },
    onChangecode() {
      this.$emit("change", this.verifyCode);
    }
  }
};
</script>

<style scoped>
.verifyCode {
  height: 64px;
  display: flex;
}
.verifyCode__input {
  width: 180px;
}
.verifyCode__pic {
  margin-left: 16px;
}
</style>