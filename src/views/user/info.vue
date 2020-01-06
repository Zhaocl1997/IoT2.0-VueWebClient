<template>
  <div class="info">
    <v-lock v-show="check" type="check" @close="onMaskClose" @check="onCheck"></v-lock>

    <el-tabs :tab-position="'left'" style="height: 800px;">
      <el-tab-pane label="基本信息">
        <div class="info_base">
          <h2>基本信息</h2>

          <el-form ref="infoForm" :model="form" :rules="rules" label-width="100px">
            <el-form-item label="头像：">
              <v-avatar />
            </el-form-item>

            <el-form-item label="昵称：" prop="name">
              <el-input v-model="form.name" style="width: 300px;" />
            </el-form-item>

            <el-form-item label="性别：" prop="gender">
              <el-radio-group v-model="form.gender" style="padding-left: 10px;">
                <el-radio label="男" />
                <el-radio label="女" />
                <el-radio label="保密" />
              </el-radio-group>
            </el-form-item>

            <el-form-item label="生日：" prop="birth">
              <v-birth v-model="form.birth" v-if="flag"></v-birth>
            </el-form-item>

            <el-form-item label="地区：" prop="area">
              <el-cascader :options="areaOptions" v-model="form.area" style="width: 300px;"></el-cascader>
            </el-form-item>

            <el-form-item label="角色：">
              <span>{{ form.role }}</span>
            </el-form-item>

            <el-form-item label="创建时间：">
              <span>{{ form.createdAt }}</span>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="onSubmitInfo">保&#32;存</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-tab-pane>
      <el-tab-pane label="安全设置">
        <div class="info_safe">
          <h2>安全设置</h2>

          <div class="info_safe-part">
            <span class="info_safe-span">账户密码</span>
            <div class="info_safe-btn-no">
              <el-button size="medium" type="text" @click="onChangePass">修改</el-button>
            </div>
          </div>

          <el-divider></el-divider>

          <div class="info_safe-part">
            <span class="info_safe-span">绑定手机</span>
            <div class="info_safe-btn">
              <el-button size="medium" type="text" @click="onMaskShow">修改</el-button>
            </div>
            <span class="info_safe-detail" v-if="form.phone">已绑定手机：{{ form.phone }}</span>
            <span class="info_safe-detail" v-else>未绑定手机</span>
          </div>

          <el-divider></el-divider>

          <div class="info_safe-part">
            <span class="info_safe-span">绑定邮箱</span>
            <div class="info_safe-btn">
              <el-button size="medium" type="text" @click="onMaskShow">修改</el-button>
            </div>
            <span class="info_safe-detail" v-if="form.email">已绑定邮箱：{{ form.email }}</span>
            <span class="info_safe-detail" v-else>未绑定邮箱</span>
          </div>

          <el-divider></el-divider>

          <div class="info_safe-part">
            <span class="info_safe-span">密保问题</span>
            <div class="info_safe-btn-no">
              <el-button size="medium" type="text">暂不支持</el-button>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="角色管理">角色管理</el-tab-pane>
      <el-tab-pane label="系统设置">系统设置</el-tab-pane>
    </el-tabs>

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
    </div>-->
  </div>
</template>

<script>
import vAvatar from "./components/base/avatar";
import vBirth from "./components/base/birthday";
import vLock from "./components/base/lockup";
import { userRulesMixins } from "@/mixins";
import areaData from "@/helper/area";

export default {
  mixins: [userRulesMixins],
  name: "v-info",
  data() {
    return {
      form: {},
      flag: false,
      check: false,
      areaOptions: [...areaData]
    };
  },
  components: {
    vAvatar,
    vBirth,
    vLock
  },
  mounted() {
    this.init();
  },
  methods: {
    // 获取用户基本信息
    async init() {
      const result = await this.$api.userService.read();
      this.form = result.data;
      this.form.role = result.data.role.name;
      this.form.createdAt = this.$time.format(result.data.createdAt);
      this.flag = true;
    },

    // 修改密码
    onChangePass() {
      this.$router.push("/main/change-pass");
    },

    // 显示
    onMaskShow() {
      this.check = true;
    },

    // 关闭
    onMaskClose() {
      this.check = false;
    },

    // 验证
    onCheck(val) {
      if (val === true) {
        this.$info.tip.success("认证成功");
        setTimeout(() => {
          this.check = false;
        }, 500);
      }
    },

    // 提交
    onSubmitInfo() {
      this.$refs.infoForm.validate().then(result => {
        if (result === true) {
          delete this.form.avatar;
          delete this.form.status;
          delete this.form.role;
          delete this.form.createdAt;
          delete this.form.updatedAt;
          this.$api.userService.updateInfo(this.form).then(res => {
            if (res === true) {
              this.$store.dispatch("dataState/setData", [
                { n: new Date().valueOf() }
              ]);
              this.$info.tip.uS();
              this.init();
            }
          });
        }
      });
    }
  }
};
</script>

<style scoped>
.info_base {
  margin: 30px 50px;
}
.info_base h2 {
  padding-bottom: 20px;
}
.info_safe {
  margin: 30px 50px;
}
.info_safe h2 {
  padding-bottom: 20px;
}
.info_safe-part {
  position: relative;
}
.info_safe-span {
  font-size: 16px;
  padding-left: 20px;
}
.info_safe-detail {
  word-break: normal;
  padding-top: 5px;
  padding-left: 20px;
  display: block;
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow: hidden;
  font-size: 12px;
  color: grey;
}
.info_safe-btn {
  position: absolute;
  top: 5px;
  right: 20px;
}
.info_safe-btn-no {
  position: absolute;
  top: -8px;
  right: 20px;
}
</style>