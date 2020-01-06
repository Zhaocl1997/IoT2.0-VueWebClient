<template>
  <div class="command">
    <el-dropdown @command="onCommand">
      <span style="color:#fff;cursor:pointer;">
        {{ username }}
        <i class="el-icon-caret-bottom"></i>
      </span>

      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="person">个人中心</el-dropdown-item>

        <el-dropdown-item command="changepass">修改密码</el-dropdown-item>

        <el-divider></el-divider>

        <el-dropdown-item command="logout">退出系统</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "v-command",
  data() {
    return {
      username: this.$ls.get("p1").name
    };
  },
  computed: {
    onNameChange() {
      return this.$store.getters["dataState/getData"].n;
    }
  },
  watch: {
    onNameChange: function(val, oldVal) {
      if (val !== "" && val !== oldVal) {
        this.getName();
      }
    }
  },
  mounted() {
    this.getName();
  },
  methods: {
    ...mapActions("userState", ["logout"]),

    // 获取昵称
    async getName() {
      const result = await this.$api.userService.read();
      this.username = result.data.name;
    },

    onCommand(val) {
      switch (val) {
        case "person":
          this.$router.push("/main/infomanage");
          break;

        case "changepass":
          this.$router.push("/main/change-pass");
          break;

        case "logout":
          this.$info.checkBox("您真的要退出吗?").then(action => {
            if (action === true) {
              this.logout();
            }
          });
          break;

        default:
          break;
      }
    }
  }
};
</script>

<style scoped>
.command {
  margin-bottom: 5px;
  margin-right: 5px;
}
.el-divider--horizontal {
  margin: 2px 0;
}
</style>