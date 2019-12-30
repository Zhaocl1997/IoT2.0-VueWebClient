<template>
  <div class="mask">
    <div @click="onClose" class="mask-close" v-if="type === 'check'">
      <i class="el-icon-close"></i>
    </div>

    <div class="mask-avatar">
      <el-avatar :size="100" :src="avatarURL"></el-avatar>
    </div>

    <div class="mask-input">
      <v-pass @unlock="onUnlock" :placeholder="placeholder" :append="true"></v-pass>
    </div>
  </div>
</template>

<script>
import vPass from "../input/password";
import { userService } from "@/services";
import { tip } from "@/components/MessageBox";

export default {
  name: "v-passMask",
  props: {
    type: {
      type: String,
      default: "unlock"
    }
  },
  mounted() {
    (function() {
      if (window.history && window.history.pushState) {
        window.onpopstate = function() {
          window.history.pushState("forward", null, "");
          window.history.forward(1);
        };
      }
      window.history.pushState("forward", null, ""); //在IE中必须得有这两行
      window.history.forward(1);
    })();
  },
  components: {
    vPass
  },
  computed: {
    avatarURL() {
      return JSON.parse(localStorage.getItem("p1")).avatar;
    },
    placeholder() {
      return this.type === "check"
        ? "请输入密码。"
        : "解锁密码与登陆密码一致。";
    }
  },
  methods: {
    async onUnlock(val) {
      const result = await userService.unlock({ pass: val });
      if (result === true) {
        if (this.type === "unlock") {
          tip.success("解锁成功");
          localStorage.removeItem("lock");
          setTimeout(() => {
            this.$router.push("/main/default");
          }, 500);
        } else if (this.type === "check") {
          this.$emit("check", true);
        }
      }
    },
    onClose() {
      this.$emit("close", false);
    }
  }
};
</script>

<style scoped>
.mask {
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 1500;

  background-color: #55c57a;
}
.mask-close {
  cursor: pointer;
  font-size: 20px;
  position: absolute;
  top: 5px;
  right: 6px;
}
.mask-avatar {
  position: absolute;
  left: 50%; /* 定位父级的50% */
  top: 40%;
  transform: translate(-50%, -50%); /* 自己的50% */
}

.mask-input {
  position: absolute;
  left: 50%; /* 定位父级的50% */
  top: 50%;
  transform: translate(-50%, -50%); /*自己的50% */
}
</style>