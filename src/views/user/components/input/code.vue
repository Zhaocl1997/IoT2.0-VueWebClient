<template>
  <div class="code">
    <el-form :model="ruleForm" :rules="rules" ref="code" @submit.native.prevent>
      <el-form-item prop="code">
        <el-input
          v-model="ruleForm.code"
          @input="onCode"
          :placeholder="placeholder"
          clearable
          minlength="4"
          maxlength="6"
          :style="`width:${inputWidth}px;`"
          prefix-icon="el-icon-collection-tag"
        >
          <v-cd-btn slot="append" @send="onSend"></v-cd-btn>
        </el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import vCdBtn from "@/components/base/cdButton";

export default {
  name: "v-code",
  data() {
    return {
      ruleForm: { code: this.value },
      rules: {
        code: [
          {
            required: true,
            message: "请输入验证码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  components: {
    vCdBtn
  },
  props: {
    // value
    value: String,

    // 获取验证码的类型和相应的手机或邮箱
    type: { type: String, required: true },
    info: { type: String, required: true },

    // 占位符和输入框的宽度
    placeholder: { type: String, default: "请输入验证码" },
    inputWidth: { type: Number, default: 330 }
  },
  model: {
    prop: "value",
    event: "code"
  },
  methods: {
    // 提交
    onCode(val) {
      this.$emit("code", val);
    },

    // 验证
    validate() {
      return this.$refs["code"].validate();
    },

    // 发送验证码
    async onSend() {
      const type = this.type;
      const info = this.info;

      if (!type || !info) return;

      const result = await this.$api.userService.sendCode({ type, info });
      if (result === true) {
        this.$info.tip.success("获取验证码成功");
      }
    }
  }
};
</script>

<style scoped>
</style>