<template>
  <div>
    <v-head></v-head>

    <div class="article-con" id="card-con">
      <div v-for="item in arr" :key="item._id">
        <el-card shadow="hover" class="art-card">
          <div style="padding-bottom:10px;cursor:pointer;">
            <router-link
              tag="a"
              class="art-card-title"
              target="_blank"
              :to="{ path:'/article', query:{ id:item._id }}"
            >{{ item.title }}</router-link>
          </div>

          <div class="art-card-tag">
            <span v-for="(i, index) in item.tag" :key="index">{{ i }}</span>
          </div>

          <div class="art-card-intro">
            <p>{{ item.intro }}</p>
          </div>

          <div class="art-card-author">
            <img :src="item.author.avatar" alt class="art-card-author-avatar" />
            <div
              class="art-card-author-name"
            >{{ item.author.name }} 发表于 {{ item.createdAt | format }}</div>
          </div>

          <div class="art-card-like" @click="onLike(item._id, item.isLiked)">
            <div v-if="!item.isLiked">
              <svg
                t="1578123274332"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="3398"
                width="16"
                height="16"
              >
                <path
                  d="M839.72369067 433.90293333h-209.09624889c81.0231277-299.23616237-55.8245357-314.5194003-55.8245357-314.5194003-58.00057363 0-45.97714489 45.86427733-50.36320238 53.51135764 0 146.33946075-155.43440118 261.0092563-155.43440118 261.0092563v414.99579733c0 40.96485452 55.8245357 55.7177363 77.72326873 55.71773629h314.16744772c29.56765867 0 53.64485689-77.5412243 53.64485688-77.54122429 77.72448237-264.29212445 77.72448237-342.92804267 77.72448237-342.92804267 0.00121363-54.60483792-52.54166755-50.24183941-52.54166755-50.24183941v0 0zM839.72369067 433.90293333z"
                  fill="#2c2c2c"
                  p-id="3399"
                />
                <path
                  d="M283.19683318 434.04007348h-125.206528c-25.85759289 0-26.25687703 25.39762725-26.25687703 25.39762727l25.85759288 418.53716858c0 26.63917037 26.68407467 26.63917037 26.68407467 26.63917037h108.36620327c22.57593837 0 22.37568948-17.62190222 22.37568948-17.62190222v-421.21322193c0-32.14419437-31.82258252-31.73762845-31.82258253-31.73762844v0 0zM283.19683318 434.04007348z"
                  fill="#2c2c2c"
                  p-id="3400"
                />
              </svg>
            </div>

            <div v-else>
              <svg
                t="1578125548021"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="1904"
                width="16"
                height="16"
              >
                <path
                  d="M936.2508600796177 410.9003582999176h-270.6830966356982c104.88753969757875-387.37266443663384-72.26699796302074-407.1574008457891-72.26699796302074-407.1574008457891-75.0839623385957 0-59.51917367779203 59.37306230750286-65.19709294902898 69.27250041709446 0 189.4420325749172-201.21578105821823 337.88647151869765-201.21578105821823 337.88647151869765v537.2279422032066c0 53.03057196495071 72.26699796302074 72.12874204274712 100.6157459791246 72.12874204274712h406.7017847448873c38.27646574575144 0 69.44532031743647-100.38008247865825 69.44532031743647-100.38008247865825 100.61731706912775-342.1362699771083 100.61731706912775-443.9334756385711 100.61731706912775-443.9334756385711 0.0015710900031092822-70.68805250989593-68.01719950461015-65.03998394871806-68.01719950461015-65.03998394871806v0 0zM936.2508600796177 410.9003582999176z"
                  fill="#1296db"
                  p-id="1905"
                />
                <path
                  d="M215.8055438938133 411.077891470269h-162.08464235077525c-33.473643606246355 0-33.99053221726932 32.878200495067944-33.99053221726932 32.878200495067944l33.473643606246355 541.8123828322794c0 34.48542556824874 34.543555898363785 34.48542556824874 34.543555898363785 34.48542556824874h140.2841974676309c29.22541623783886 0 28.966186387325827-22.81222684514677 28.966186387325827-22.81222684514677v-545.2766362891354c0-41.61188982235244-41.19555097152849-41.08557467131084-41.19555097152849-41.08557467131084v0 0zM215.8055438938133 411.077891470269z"
                  fill="#1296db"
                  p-id="1906"
                />
              </svg>
            </div>

            <div class="art-card-like-num">{{ item.like }}</div>
          </div>
        </el-card>
      </div>

      <div class="art-nomore">
        <p v-if="noMore">没有更多了</p>
      </div>
    </div>

    <!-- <div class="back-to-top" v-show="backToTop" @click="onBackToTop">
      <i class="el-icon-caret-top"></i>
    </div>-->
    <el-backtop target="#card-con"></el-backtop>
  </div>
</template>

<script>
import vHead from "../main/header";
import { isLoginMixins } from "@/mixins";

export default {
  mixins: [isLoginMixins],
  name: "v-articles",
  data() {
    return {
      arr: [],
      noMore: false,
      backToTop: false,
      total: 0,
      reqData: {
        pagenum: 1,
        pagerow: 10,
        filters: "",
        sortField: "createdAt",
        sortOrder: "descending"
      }
    };
  },
  components: {
    vHead
  },
  mounted() {
    this.init();
    this.addInfiniteScroll();
  },
  methods: {
    // 获取文章
    async init() {
      const result = await this.$api.articleService.index(this.reqData);
      this.total = result.total;

      // 处理数据
      if (this.reqData.pagenum === 1) {
        this.arr = result.data;
      } else {
        this.arr = this.arr.concat(result.data);
      }
    },

    // 添加无限滚动事件
    addInfiniteScroll() {
      setTimeout(() => {
        const card = document.getElementById("card-con");

        card.addEventListener("scroll", () => {
          const scrollDistance =
            card.scrollHeight - card.scrollTop - card.clientHeight;

          // 离底部200px开始加载
          if (scrollDistance <= 200) {
            this.backToTop = true;
            // 当前页数小于总的页数
            if (
              this.reqData.pagenum <
              Math.floor(this.total / this.reqData.pagerow)
            ) {
              this.reqData.pagenum++;
              this.init();
            } else {
              this.noMore = true;
            }
          }
        });
      }, 1000);
    },

    // 点赞
    async onLike(id, isLiked) {
      if (!this.isLogin) {
        this.$router.push("/login");
        return false;
      }
      if (isLiked) {
        const result = await this.$api.userLikeArticleService.unlike({
          articleId: id
        });
        if (result === true) this.init();
      } else {
        const result = await this.$api.userLikeArticleService.like({
          articleId: id
        });
        if (result === true) this.init();
      }
    },

    // 分页参数
    onPage(data) {
      this.reqData.pagenum = data;
      this.init();
    }
  }
};
</script>

<style scoped>
.article-con {
  height: 900px;
  width: 500px;
  margin-left: 35%;
  overflow-y: scroll;
}
.article-con::-webkit-scrollbar {
  width: 0 !important;
}
.article-con::after {
  content: "";
  height: 100px;
  display: block;
}
.art-card {
  margin: 20px;
  border-radius: 30px;
  background-color: rgba(231, 171, 171, 0.6);
}
.art-card-title {
  background: transparent;
  text-decoration: none;
  outline: none;
  font-weight: 800;
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
.art-card-intro {
  margin-bottom: 10px;
}
.art-card-author {
  display: flex;
  margin-bottom: 10px;
}
.art-card-author-avatar {
  width: 24px;
  height: 24px;
  line-height: 24px;
  border-radius: 50%;
  margin-top: 5px;
}
.art-card-author-name {
  font-size: 14px;
  padding-top: 7px;
  padding-left: 3px;
}
.art-card-like {
  cursor: pointer;
  display: flex;
}
.art-card-like-num {
  font-size: 14px;
  margin-left: 2px;
}
.art-nomore {
  text-align: center;
}
</style>