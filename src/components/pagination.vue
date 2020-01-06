<template>
  <div class="pagination">
    <div class="pagination_con">
      <el-pagination
        background
        :page-size="pagerow"
        :pager-count="11"
        :current-page="pagenum"
        :total="total"
        layout="total, prev, pager, next, jumper"
        :hide-on-single-page="true"
        @current-change="onCurrentChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
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
    onCurrentChange(val) {
      this.$emit("paginationEvent", val);
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