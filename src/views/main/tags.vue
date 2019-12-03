<template>
  <div class="tag">
    <div class="tag_con" v-if="showTags">
      <ul>
        <li
          class="tags_con-li"
          v-for="(item, index) in tagsList"
          :class="{'active': isActive(item.path)}"
          :key="index"
        >
          <router-link :to="item.path" class="tags_con-li-title">{{ item.title }}</router-link>
          <span class="tags_con-li-icon" @click="closeTags(index)">
            <i class="el-icon-close" v-if="item.title !== '默认页'"></i>
          </span>
        </li>
      </ul>

      <div class="tag_con-close-box">
        <el-dropdown @command="onTags">
          <el-button size="mini" type="text">
            标签选项
            <i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu size="small" slot="dropdown">
            <el-dropdown-item command="other">关闭其他</el-dropdown-item>
            <el-dropdown-item command="all">关闭所有</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
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
      return this.tagsList.length > 0;
    }
  },
  watch: {
    $route(newValue) {
      this.setTags(newValue);
    }
  },
  created() {
    this.setTags(this.$route);
  },
  methods: {
    isActive(path) {
      return path === this.$route.fullPath;
    },

    // 关闭单个标签
    closeTags(index) {
      if (index === 0) {
        this.$router.push("default");
      }
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

        this.tagsList.push({
          title: route.meta.title,
          path: route.fullPath,
          name: route.name,
          component: route.matched[1].components.default.name
        });
      }
      // 发布tags事件
      bus.$emit("tags", this.tagsList);
    },

    // 处理dropdown
    onTags(command) {
      command === "other" ? this.closeOther() : this.closeAll();
    },

    // 关闭全部标签
    closeAll() {
      this.tagsList = [];
      this.$router.push("default");
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
.tags_con-li {
  margin: 1px;
  padding: 0 15px 0;
  font-size: 13px;
  cursor: pointer;
  line-height: 30px;
  display: inline-block;
}
.tags_con-li:not(.active):hover {
  background: #f8f8f8;
  line-height: 30px;
}
.tags_con-li.active {
  background: #fbfdfe;
  line-height: 30px;
  margin: 3px;
}
.tags_con-li-title {
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-right: 16px;
  color: #666;
}
.tags_con-li.active .tags_con-li-title {
  color: #3a81d6;
}
.tag_con-close-box {
  position: absolute;
  right: 0;
  top: 3px;
  box-sizing: border-box;
  padding-top: 1px;
  text-align: center;
  width: 110px;
  height: 30px;
  z-index: 10;
}
</style>