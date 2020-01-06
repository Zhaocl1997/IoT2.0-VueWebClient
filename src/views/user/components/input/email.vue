<template>
  <div class="email">
    <el-form :model="ruleForm" :rules="rules" ref="email" @submit.native.prevent>
      <el-form-item prop="email">
        <el-autocomplete
          v-model="ruleForm.email"
          @input="onEmail"
          placeholder="请输入邮箱地址"
          @select="onEmail"
          clearable
          :style="`width:${width}px;`"
          :debounce="100"
          :fetch-suggestions="onQuerySearch"
          prefix-icon="el-icon-message"
        ></el-autocomplete>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "v-email",
  data() {
    return {
      ruleForm: {
        email: this.value
      },
      emailOptions: [],
      rules: {
        email: [
          {
            required: true,
            message: "请输入邮箱",
            trigger: ["change", "blur"]
          },
          {
            pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
            message: "请输入正确的邮箱",
            trigger: ["change", "blur"]
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
    event: "email"
  },
  mounted() {
    this.emailOptions = this.loadAll();
  },
  methods: {
    // 提交
    onEmail(val) {
      if (val.value === undefined) return;
      this.$emit("email", val.value);
    },

    // 验证
    validate() {
      return this.$refs["email"].validate();
    },

    // 备选
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

    // 输入时的回显
    onQuerySearch(queryString, callback) {
      this.emailOptions.forEach(item => {
        if (queryString.indexOf(item.value) !== -1) {
          queryString = queryString.replace(item.value, "");
        }
      });

      let emailOptions = this.emailOptions;
      // 把数组的浅复制换成深复制
      let results = JSON.parse(JSON.stringify(emailOptions));
      for (let item in results) {
        results[item].value = queryString + emailOptions[item].value;
      }
      callback(results);
    }
  }
};
</script>

<style scoped>
</style>