<template>
  <div>
    <v-head></v-head>

    <div class="art-wrap">
      <el-col :gutter="20">
        <el-col :span="14">
          <div class="grid-content bg-purple">
            <div class="art-con">
              <h1 class="art-wrap-title">{{ title }}</h1>

              <div class="ql-container ql-snow art-outer">
                <div class="ql-editor art-inner" v-html="content"></div>
              </div>
            </div>
          </div>
        </el-col>

        <el-col :span="6">
          <div style="margin-left:20px;">
            <div class="art-card">
              <p class="art-card-author">文章作者</p>

              <hr />

              <div class="art-author">
                <img :src="url" class="art-author-avatar" />
                <div class="art-author-name">{{ author }}</div>
              </div>
            </div>

            <div class="art-card" style="margin-top:20px;">
              <p class="art-card-author" style="text-align:left;">文章信息</p>

              <hr />

              <div class="art-author">
                <div class="art-author-info">发布时间：{{ time | format }}</div>
                <div class="art-author-info">阅读量：{{ read }}</div>
                <div class="art-author-info" style="padding-bottom:10px;">点赞数：{{ like }}</div>

                <div class="art-card-tag">
                  <span v-for="(i, index) in tag" :key="index">{{ i }}</span>
                </div>
              </div>
            </div>
          </div>
        </el-col>
      </el-col>
    </div>
  </div>
</template>

<script>
import vHead from "../main/header";
import "quill/dist/quill.snow.css";

export default {
  name: "v-article",
  data() {
    return {
      title: "",
      content: "",
      author: "",
      url: "",
      time: "",
      read: "",
      tag: "",
      like: ""
    };
  },
  components: {
    vHead
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      const result = await this.$api.articleService.read({
        _id: this.$route.query.id
      });

      this.title = result.data.title;
      this.content = result.data.content;
      this.author = result.data.author.name;
      this.url = result.data.author.avatar;
      this.time = result.data.createdAt;
      this.read = result.data.read;
      this.tag = result.data.tag;
      this.like = result.data.like;
    }
  }
};
</script>

<style scoped>
.bg-purple {
  background: #d3dce6;
}
.grid-content {
  border-radius: 40px;
  min-height: 36px;
}
.art-wrap {
  margin-left: 15%;
  margin-top: 20px;
}
.art-card-author {
  padding: 10px;
}
.art-wrap-title {
  padding: 20px;
}
.art-outer {
  height: 900px;

  position: relative;
  overflow: hidden;
}
.art-inner {
  padding: 20px;

  position: absolute;
  left: 0;
  top: 0;
  right: -17px;
  bottom: 0;
  overflow-x: hidden;
  overflow-y: scroll;
}

.art-author {
  text-align: center;
}
.art-author-avatar {
  height: 100px;
  width: 100px;
  margin-top: 10px;
  margin-bottom: 20px;
}
.art-author-name {
  font-size: 16px;
  font-weight: bolder;
  padding-bottom: 10px;
}
.art-card-tag span {
  display: inline-block;
  height: 22px;
  line-height: 22px;
  margin: 2px 4px 2px 0;
  padding: 0 8px;
  border: 1px solid #e8eaec;
  border-radius: 3px;
  background: #f7f7f7;
  font-size: 12px;
  vertical-align: middle;
  opacity: 1;
  overflow: hidden;
  margin-bottom: 10px;
}
.art-card {
  width: 300px;
  background-color: rgba(214, 184, 184, 0.2);
  border-radius: 20px;
}
.art-author-info {
  font-size: 14px;
}

.art-inner::after {
  content: "";
  height: 100px;
  display: block;
}

/* .art-wrap {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  margin-top: 70px;
}



.art-author {
  position: relative;
  top: 100px;
  right: 100px;
  color: red;
} */
</style>