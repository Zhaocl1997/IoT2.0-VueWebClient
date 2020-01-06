<template>
  <div class="table-con" id="table-con">
    <div class="pics_con">
      <div v-for="item in imagesData" :key="item._id" class="pic_con">
        <el-tooltip placement="right-start">
          <div slot="content">
            拍摄时间：{{ item.cA | format }}
            <br />
            图片大小：{{ item.data.size | byteToKB }}KB
          </div>
          <img :src="item.data.url | url" alt="暂无图片" class="pic_con-img" />
        </el-tooltip>
      </div>
    </div>

    <v-page
      :pagenum="reqData.pagenum"
      :pagerow="reqData.pagerow"
      :total="total"
      @paginationEvent="pageValue"
    />
  </div>
</template>

<script>
import { countPicNum } from "@/helper/public";
import vPage from "@/components/pagination";

export default {
  name: "cameraDataMore",
  data() {
    return {
      // 请求数据
      reqData: {
        pagenum: 1,
        pagerow: 1,
        macAddress: ""
      },

      // 返回数据
      total: 1,
      imagesData: []
    };
  },
  components: {
    vPage
  },
  mounted() {
    this.reqData.macAddress = this.$route.query.macAddress;
    this.reqData.pagerow = countPicNum();
    this.init(this.reqData);
    this.$api.socketService.newData({ macAddress: this.reqData.macAddress });
  },
  methods: {
    // 初始化
    async init(item) {
      const result = await this.$api.dataService.indexByMac(item);
      if (result.data.length === 0) return;

      this.imagesData = result.data;
      this.total = result.total;
    },

    // 分页参数
    pageValue(data) {
      this.reqData.pagenum = data;
      this.init(this.reqData);
    }
  }
};
</script>

<style scoped>
.pics_con {
  text-align: center;
}
.pic_con {
  margin: 5px 5px 5px;
  text-align: center;
  display: inline-flex;
}
.pic_con-img {
  width: 240px;
  height: 180px;
}
</style>