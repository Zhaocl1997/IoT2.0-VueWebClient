<template>
  <div class="phone">
    <el-form :model="ruleForm" :rules="rules" ref="phone" @submit.native.prevent>
      <el-form-item prop="phone">
        <el-input
          v-model="ruleForm.phone"
          @input="onPhone"
          placeholder="请输入手机号码"
          maxlength="11"
          clearable
          :style="`width:${width}px;`"
        >
          <el-select v-model="select" slot="prepend" style="width:80px;">
            <el-option label="+86" value="+86" />
          </el-select>
        </el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "v-phone",
  data() {
    return {
      ruleForm: { phone: this.value },
      select: "+86",
      rules: {
        phone: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          {
            pattern: /^[1][2-9][0-9]{9}$/,
            message: "请输入正确的手机号码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  props: {
    value: String,
    width: { type: Number, default: 330 }
  },
  model: {
    prop: "value",
    event: "phone"
  },
  methods: {
    // 提交
    onPhone(val) {
      // 只能输入正整数
      const single = val.split("");

      single.forEach(i => {
        if (!/\d/.test(i)) {
          this.ruleForm.phone = single.slice(0, single.length - 1).join("");
        }
      });

      this.$emit("phone", val);
    },

    // 验证
    validate() {
      return this.$refs["phone"].validate();
    }
  }
};
</script>

<style scoped>
</style>