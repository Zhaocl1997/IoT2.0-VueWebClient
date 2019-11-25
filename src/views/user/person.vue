<template>
  <div>
    <h1>personal center</h1>
    <div class="person_avatar">
      <avatar />
    </div>

    <div class="person_form">
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
          <birthday @birthEvent="onBirth" :birth="form.birth" v-model="form.birth"></birthday>
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
  name: "person",
  data() {
    return {
      form: {},
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
      this.form = result;
    },
    onBirth(data) {
      this.form.birth = data;
    },
    onSubmitInfo() {
      this.$refs["infoForm"].validate().then(result => {
        if (result === true) {
          userService.update(this.form).then(res => {
            if (res === true) {
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
.person_avatar {
  position: fixed;
  right: 100px;
}
.person_form {
  width: 500px;
  padding: 40px;
}
</style>