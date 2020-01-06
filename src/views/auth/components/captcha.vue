<template>
  <div class="captcha">
    <el-form :model="ruleForm" :rules="rules" ref="captcha" @submit.native.prevent>
      <el-form-item prop="captcha">
        <el-input
          v-model="ruleForm.captcha"
          @input="onCaptcha"
          placeholder="请输入验证码"
          maxlength="4"
          clearable
          :style="`width:${width}px;`"
        />
      </el-form-item>
    </el-form>

    <div style="margin-left:12px;" v-html="svgcode" @click="getCaptcha"></div>
  </div>
</template>

<script>
export default {
  name: "v-captcha",
  data() {
    return {
      ruleForm: {
        captcha: this.value
      },
      svgcode: "",
      rules: {
        captcha: [{ required: true, message: "请输入验证码", trigger: "blur" }]
      }
    };
  },
  props: {
    value: String,
    width: {
      type: Number,
      default: 190
    }
  },
  model: {
    prop: "value",
    event: "captcha"
  },
  created() {
    this.getCaptcha();
  },
  methods: {
    // 获取验证码
    async getCaptcha() {
      const result = await this.$api.userService.captcha();
      this.svgcode = result.img;
    },

    // 验证
    validate() {
      return this.$refs["captcha"].validate();
    },

    // 提交
    onCaptcha(val) {
      this.$emit("captcha", val);
    }
  }
};
</script>

<style scoped>
.captcha {
  display: flex;
}
</style>