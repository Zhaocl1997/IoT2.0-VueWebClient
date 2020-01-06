<template>
  <div class="changePass">
    <h2>修改密码</h2>

    <el-divider></el-divider>

    <div class="changePass-main">
      <el-form ref="changePassForm" :model="changePass">
        <v-pass v-model="changePass.oldPass" placeholder="请输入现在使用的密码"></v-pass>
        <v-check-pass v-model="changePass.newPass"></v-check-pass>
        <el-form-item>
          <el-button type="primary" size="small" @click="onChangePass">修改密码</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import vPass from "../input/password";
import vCheckPass from "../input/checkPass";
import { mapActions } from "vuex";

export default {
  name: "v-changePass",
  data() {
    return {
      changePass: {
        oldPass: "",
        newPass: ""
      }
    };
  },
  components: {
    vPass,
    vCheckPass
  },
  methods: {
    ...mapActions("userState", ["logout"]),

    onChangePass() {
      const vOne = this.$refs.changePassForm.$children[0].validate();
      const vTwo = this.$refs.changePassForm.$children[1].validate();

      Promise.all([vOne, vTwo])
        .then(() => {
          this.$api.userService.changePass(this.changePass).then(res => {
            if (res === true) {
              this.$info.tip.success("修改密码成功");
              setTimeout(() => {
                this.logout();
              }, 500);
            }
          });
        })
        .catch(e => {
          console.log(e);
        });
    }
  }
};
</script>

<style scoped>
.changePass h2 {
  margin: 20px 0 10px 20px;
}
.changePass-main {
  margin: 20px 0 10px 20px;
}
</style>