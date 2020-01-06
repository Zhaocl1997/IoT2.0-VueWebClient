<template>
  <div>
    <el-color-picker v-model="color" @change="onColorChange" size="mini" class="color"></el-color-picker>
  </div>
</template>

<script>
export default {
  name: "v-color",
  data() {
    return {
      color: ""
    };
  },
  mounted() {
    const origin = this.$ls.get("color").color;
    if (origin) {
      this.color = origin;
      const head = document.getElementById("header");
      head.style.backgroundColor = this.color;
    } else {
      this.color = "#252a2f";
    }
  },
  methods: {
    onColorChange(val) {
      const head = document.getElementById("header");
      head.style.backgroundColor = val;
      this.$ls.set("color", { color: val });
      this.$store.dispatch("dataState/setData", [{ c: val }]);
    }
  }
};
</script>

<style scoped>
.color {
  margin-right: 10px;
  margin-top: 5px;
}
</style>