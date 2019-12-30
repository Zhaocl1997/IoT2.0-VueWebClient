<template>
  <div class="tag" v-if="showTags">
    <div class="tag_con" v-for="(item, index) in tagsList" :key="index">
      <ul>
        <li
          class="tags_con-li"
          :class="{'active': isActive(item.path)}"
          @click="onLi(item.path)"
          :title="item.title"
        >
          <!-- <img :src="item.icon" class="tags_con-li-icon" /> -->
          <router-link :to="item.path" class="tags_con-li-title">{{ item.title }}</router-link>
        </li>
      </ul>

      <div class="tags_con-li-close" v-show="item.title !=='默认页'">
        <span @click="closeTags(index)">
          <i class="el-icon-close"></i>
        </span>
      </div>
    </div>

    <div class="tag_con-close-box" v-show="this.tagsList.length !== 1">
      <el-dropdown @command="onTags">
        <el-button size="mini" type="text">
          标签选项
          <i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>

        <el-dropdown-menu size="small" slot="dropdown">
          <div v-for="(item, index) in tagsList" :key="index">
            <el-dropdown-item :command="item.path">{{ item.title }}</el-dropdown-item>
          </div>

          <el-dropdown-item command="all">关闭所有</el-dropdown-item>
          <!-- <el-dropdown-item command="other">关闭其他</el-dropdown-item> -->
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import bus from "./bus";

export default {
  name: "v-tags",
  data() {
    return {
      tagsList: []
    };
  },
  computed: {
    // 标签数大于0就返回true
    showTags() {
      return this.tagsList.length >= 0;
    }
  },
  watch: {
    $route: function(newVal) {
      this.setTags(newVal);
    }
  },
  created() {
    this.setTags(this.$route);
  },
  methods: {
    isActive(path) {
      return path === this.$route.fullPath;
    },

    // 点击li跳转
    onLi(val) {
      this.$router.push(val);
    },

    // 关闭单个标签
    closeTags(index) {
      if (index === 0) {
        this.$router.push("default");
      }

      // 要关闭的标签
      const delItem = this.tagsList.splice(index, 1)[0];

      // 当前选项卡
      const item = this.tagsList[index]
        ? this.tagsList[index]
        : this.tagsList[index - 1];

      if (item) {
        delItem.path === this.$route.fullPath;
        this.$router.push(item.path);
      } else {
        this.$router.push("default");
      }
    },

    // 设置标签
    setTags(route) {
      const isExist = this.tagsList.some(item => {
        return item.path === route.fullPath;
      });
      if (!isExist) {
        if (this.tagsList.length >= 18) {
          this.tagsList.shift();
        }

        if (route.name !== "lock-up") {
          this.tagsList.push({
            title: route.meta.title,
            path: route.fullPath,
            name: route.name,
            component: route.matched[1].components.default.name
          });
        }
      }
      // 发布tags事件
      bus.$emit("tags", this.tagsList);
    },

    // 处理dropdown
    onTags(command) {
      command === "all" ? this.closeAll() : this.$router.push(command);
    },

    // 关闭全部标签
    closeAll() {
      this.tagsList = [];
      this.$router.push("/main/default");
    },

    // 关闭其他标签
    closeOther() {
      const curItem = this.tagsList.filter(item => {
        return item.path === this.$route.fullPath;
      });
      this.tagsList = curItem;
    }
  }
};
</script>

<style scoped>
.tag {
  height: 39px;
  margin-left: 8px;
  position: relative;
  overflow: hidden;
  background: #e6e8ed;
}
.tag_con {
  margin-left: 3px;
  display: inline-block;
  position: relative;
  overflow: hidden;
  background: #e6e8ed;
}
/* .tag ul {
  height: 33px;
  overflow-x: hidden;
  overflow-y: hidden;
  white-space: nowrap;
} */
.tags_con-li {
  margin: 4px 1px 0px 1px;
  padding: 0px 10px 0px 10px;
  font-size: 13px;
  overflow: hidden;
  cursor: pointer;
  border: 1px solid #c0c5d3 !important;
  display: inline-block;
  position: relative;
  width: 140px;
  height: 36px;
  display: flex;
}
.tags_con-li:not(.active):hover {
  background: #f8f8f8;
}
.tags_con-li.active {
  height: 36px;
  background: #fbfdfe;
  /* background: red; */
}
.tags_con-li.active .tags_con-li-title {
  color: #3a81d6;
}
/* li的icon */
.tags_con-li-icon {
  width: 16px;
  height: 16px;
  margin-top: 6px;
}
/* li的标题 */
.tags_con-li-title {
  width: 100px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin: 8px 0 0 5px;
  color: #666;
}
/* × */
.tags_con-li-close {
  position: absolute;
  top: 13px;
  right: 10px;
  cursor: pointer;
}

.tag_con-close-box {
  position: absolute;
  right: 5px;
  top: 5px;
  box-sizing: border-box;
  padding-top: 1px;
  text-align: center;
  width: 100px;
  height: 30px;
  background: #e6e8ed;
}
</style>