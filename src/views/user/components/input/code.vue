<template>
  <div class="code">
    <el-input
      v-model="code"
      :placeholder="placeholder"
      prefix-icon="el-icon-collection-tag"
      clearable
      minlength="4"
      maxlength="6"
      @input="onCode"
      slot="reference"
      :style="`width:${inputWidth}px;`"
    >
      <!-- <el-button slot="append" @click="onGetCode" :style="`width:${btnWidth}px;`">获取验证码</el-button> -->

      <v-cd-btn slot="append" :delay="60" type="info" @sendEmail="onsendEmail"></v-cd-btn>
    </el-input>
  </div>
</template>

<script>
import vCdBtn from "@/components/base/cdButton";
import { userService } from "@/services";
import { tip } from "@/components/MessageBox";

export default {
  name: "v-code",
  data() {
    return {
      code: this.value,
      email: this.validataEmail
    };
  },
  components: {
    vCdBtn
  },
  props: {
    value: String,
    placeholder: {
      type: String,
      default: "请输入验证码"
    },
    inputWidth: {
      type: Number,
      default: 330
    },
    btnWidth: {
      type: Number,
      default: 120
    },
    append: {
      type: Boolean,
      default: false
    },
    validataEmail: String
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

    // 发送验证码
    async onsendEmail() {
      const valEmail = this.$parent.$parent.$parent.$refs.vEmail.value;
      if (valEmail === "") return;

      const result = await userService.gencode({ email: valEmail });
      if (result === true) {
        tip.success("发送成功");
      }
    }
  }
};
</script>

<style scoped>
.code {
  margin: 0 auto;
}
</style>