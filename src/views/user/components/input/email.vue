<template>
  <div class="email">
    <el-autocomplete
      prefix-icon="el-icon-message"
      v-model="email"
      :fetch-suggestions="onQuerySearch"
      placeholder="请输入邮箱地址"
      :trigger-on-focus="false"
      @select="onEmail"
      @input="onEmail"
      clearable
      :style="`width:${width}px;`"
      :debounce="100"
    ></el-autocomplete>
  </div>
</template>

<script>
export default {
  name: "v-email",
  data() {
    return {
      email: this.value,
      emailOptions: []
    };
  },
  props: {
    width: {
      type: Number,
      default: 330
    },
    value: String
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
      if (queryString.indexOf(".") !== -1) return;

      if (queryString.indexOf("@") !== -1) {
        queryString = queryString.replace("@", "");
      }

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
.email {
  margin: 0 auto;
}
</style>