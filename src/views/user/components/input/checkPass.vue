<template>
  <div class="checkPass">
    <el-form :model="ruleForm" :rules="rules" ref="checkPass" @submit.native.prevent>
      <el-form-item prop="password">
        <v-pass v-model="ruleForm.password" placeholder="请输入密码，长度应在9-16位"></v-pass>
      </el-form-item>

      <el-form-item prop="checkPass">
        <v-pass v-model="ruleForm.checkPass" placeholder="请再次输入密码"></v-pass>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import vPass from "./password";

export default {
  name: "v-check-pass",
  data() {
    const validateCheckPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        password: "",
        checkPass: ""
      },
      rules: {
        password: [
          {
            min: 9,
            max: 16,
            required: true,
            message: "密码长度在9到16位",
            trigger: "blur"
          }
        ],
        checkPass: [{ validator: validateCheckPass, trigger: "blur" }]
      }
    };
  },
  components: {
    vPass
  },
  props: {
    value: String
  },
  model: {
    prop: "value",
    event: "checkPass"
  },
  watch: {
    "ruleForm.checkPass": {
      deep: true,
      handler: function(val) {
        this.$refs.checkPass.validateField("checkPass");
        this.$emit("checkPass", val);
      }
    }
  },
  methods: {
    // 验证
    validate() {
      return this.$refs["checkPass"].validate();
    }
  }
};
</script>

<style scoped>
</style>