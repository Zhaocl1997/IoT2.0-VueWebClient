<template>
  <div class="phone">
    <el-input
      @input="onPhone"
      v-model="phone"
      placeholder="请输入手机号码"
      maxlength="11"
      clearable
      class="input-with-select"
    >
      <el-select v-model="select" slot="prepend" style="width:80px;">
        <el-option label="+86" value="+86"></el-option>
      </el-select>
    </el-input>
  </div>
</template>

<script>
export default {
  data() {
    return {
      phone: this.value,
      select: "+86"
    };
  },
  props: {
    value: String
  },
  model: {
    prop: "value",
    event: "phone"
  },
  methods: {
    // 提交
    onPhone(val) {
      this.$emit("phone", val);
    }
  }
};
</script>

<style scoped>
.phone {
  margin: 0 auto;
}
</style>