<template>
  <div>
    <div class="avatar" @click="onAvatar">
      <el-avatar v-if="avatarShow" :src="imgURL" :key="imgURL" fit="cover"></el-avatar>

      <el-avatar v-if="iconShow" :size="45">{{ userrole }}</el-avatar>
    </div>
  </div>
</template>

<script>
import { avatarMixins } from "@/mixins";

export default {
  mixins: [avatarMixins],
  name: "v-avatar",
  computed: {
    userrole() {
      return this.$ls.get("p1").role;
    },
    avatarShow() {
      return this.avatarURL || this.onAvatarFirstChange;
    },
    iconShow() {
      return !this.avatarURL;
    }
  },
  methods: {
    onAvatar() {
      this.$router.push("/main/infomanage");
    }
  }
};
</script>

<style scoped>
.avatar {
  height: 45px;
  width: 45px;
  position: relative;
  top: 2px;
  cursor: pointer;
}
</style>