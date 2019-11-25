<template>
  <div class="pagination">
    <div class="pagination_con">
      <el-switch v-model="value" style="float: left; visibility: hidden;"></el-switch>
      <el-pagination
        background
        :page-size="pagerow"
        :pager-count="11"
        :current-page.sync="pagenum"
        :total="total"
        layout="total, prev, pager, next, jumper"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        :hide-on-single-page="value"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: false
    };
  },
  props: {
    pagenum: {
      type: Number,
      required: true
    },
    pagerow: {
      type: Number,
      required: true
    },
    total: {
      type: Number,
      required: true
    }
  },
  methods: {
    handleCurrentChange(val) {
      this.$emit("paginationEvent", val);
    },
    handleSizeChange(val) {
      this.$emit("paginationEvent", val);
    }
  },
  mounted() {
    if (this.pagenum === 1) {
      this.value = true;
    }
  }
};
</script>

<style scoped>
.pagination_con {
  /* margin: 20px 0; */
  margin-bottom: 10px;
  height: 35px;
  text-align: center;
}
</style>