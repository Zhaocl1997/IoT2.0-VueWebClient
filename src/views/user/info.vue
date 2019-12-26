<template>
  <div class="info">
    <div class="info_con">
      <div class="info_avatar">
        <avatar />
      </div>

      <div class="info_form">
        <el-form ref="infoForm" :model="form" :rules="rules" label-width="80px">
          <el-form-item label="角色：" prop="role">
            <el-input :disabled="true" v-model="form.role" style="width: 300px;" />
          </el-form-item>

          <el-form-item label="昵称：" prop="name">
            <el-input v-model="form.name" style="width: 300px;" />
          </el-form-item>

          <el-form-item label="手机：" prop="phone">
            <el-input v-model="form.phone" style="width: 300px;" />
          </el-form-item>

          <el-form-item label="邮箱：" prop="email">
            <el-input v-model="form.email" style="width: 300px;" />
          </el-form-item>

          <el-form-item label="性别：" prop="gender">
            <el-radio-group v-model="form.gender" style="padding-left: 10px;">
              <el-radio label="男" />
              <el-radio label="女" />
              <el-radio label="保密" />
            </el-radio-group>
          </el-form-item>

          <el-form-item label="生日：" prop="birth">
            <birthday @birthEvent="onBirth" :birth="form.birth" v-model="form.birth" v-if="flag"></birthday>
          </el-form-item>

          <el-form-item label="地区：" prop="area">
            <el-cascader :options="areaOptions" v-model="form.area" style="width: 300px;"></el-cascader>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="onSubmitInfo">保&#32;存</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <!-- <div class="info_iframe-video-con">
      <iframe
        class="info_iframe-video"
        src="//player.bilibili.com/player.html?aid=30166715&page=1"
        scrolling="no"
        border="0"
        frameborder="no"
        framespacing="0"
        allowfullscreen="true"
      ></iframe>
    </div>

    <div class="info_iframe-music-con">
      <iframe
        frameborder="no"
        border="0"
        marginwidth="0"
        marginheight="0"
        width="330"
        height="86"
        src="//music.163.com/outchain/player?type=2&id=5270312&auto=1&height=66"
      ></iframe>
    </div> -->
  </div>
</template>

<script>
import avatar from "./components/avatar";
import birthday from "./components/birthday";
import { userService } from "@/services";
import { userRulesMixins } from "@/mixins";
import areaData from "@/helper/area";
import { tip } from "@/components/MessageBox";

export default {
  mixins: [userRulesMixins],
  name: "v-info",
  data() {
    return {
      form: {},
      flag: false,
      areaOptions: [...areaData]
    };
  },
  components: {
    avatar,
    birthday
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      const result = await userService.read();
      this.flag = true;
      this.form = result.data;
      this.form.role = result.data.role.name;
    },
    onBirth(data) {
      this.form.birth = data;
    },
    onSubmitInfo() {
      this.$refs.infoForm.validate().then(result => {
        if (result === true) {
          delete this.form.avatar;
          userService.updateInfo(this.form).then(res => {
            if (res === true) {
              this.$store.dispatch("dataState/setData", [
                { n: new Date().valueOf() }
              ]);
              tip.uS();
            }
          });
        }
      });
    }
  }
};
</script>

<style scoped>
.info {
  margin-top: 30px;
  width: 500px;
}
.info_avatar {
  position: absolute;
  top: 150px;
  left: 463px;
}
.info_form {
  margin: 0 auto;
  width: 500px;
  padding: 40px;
}
.info_iframe-video-con {
  position: absolute;
  top: 120px;
  right: 50px;
}
.info_iframe-video {
  width: 800px;
  height: 600px;
  max-width: 100%;
}
.info_iframe-music-con {
  position: absolute;
  bottom: 77px;
  left: 48px;
}
</style>