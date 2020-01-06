<template>
  <div>
    <el-upload
      ref="avatar"
      :limit="1"
      class="avatar-uploader"
      :action="postURL"
      :headers="headers"
      :auto-upload="false"
      :show-file-list="false"
      :on-change="onFirstChange"
      :on-exceed="onMoreChange"
      :before-upload="beforeAvatarUpload"
      :http-request="onAvatarUpload"
      accept=".jpg, .jpeg, .png"
    >
      <img v-if="isAvatarShow" :src="imgURL" class="avatar" />
      <i v-if="isIconShow" class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <el-button style="margin-left: 50px;" type="primary" size="small" @click="onSubmitAvatar">上传头像</el-button>
  </div>
</template>

<script>
import config from "@/helper/config";
import { avatarMixins } from "@/mixins";
import { isEmpty } from "@/helper/public";

export default {
  mixins: [avatarMixins],
  name: "userAvatar",
  data() {
    return {
      imgData: {},
      postURL: `${config.apiUrl}api/v1/user/avatar`,
      headers: {
        "Content-Type": "multipart/form-data"
      }
    };
  },
  computed: {
    hasAvatarSelected() {
      return isEmpty(this.imgData);
    },
    hasAvatarUrl() {
      return isEmpty(this.avatarURL);
    },
    isAvatarShow() {
      return (
        !this.hasAvatarUrl ||
        !this.hasAvatarSelected ||
        this.onAvatarFirstChange
      );
    },
    isIconShow() {
      return this.hasAvatarUrl && this.hasAvatarSelected;
    }
  },
  methods: {
    // 图片首次变化
    onFirstChange(file) {
      this.imgURL = URL.createObjectURL(file.raw);
      this.imgData = file.raw;
    },

    // 图片超出限制，再次变化
    onMoreChange(file) {
      this.imgURL = URL.createObjectURL(file[0]);
      this.imgData = file[0];
    },

    // 确认上传头像
    onSubmitAvatar() {
      this.$refs.avatar.submit();
    },

    // 验证图片大小和格式
    beforeAvatarUpload() {
      const fileType = ["image/jpg", "image/jpeg", "image/png"];
      const isPic = fileType.includes(this.imgData.type);
      const isLt1M = this.imgData.size / 1024 / 1024 < 1;

      if (!isPic) {
        this.$api.tip.error("上传头像图片格式只能是 JPG/JPEG/PNG 格式!");
      }
      if (!isLt1M) {
        this.$api.tip.error("上传头像图片大小不能超过 1MB!");
      }
      return isPic && isLt1M;
    },

    // 上传头像
    onAvatarUpload() {
      const formData = new FormData();
      formData.append("avatar", this.imgData);
      this.$api.userService.avatar(formData).then(res => {
        if (res === true) {
          this.$store.dispatch("dataState/setData", [
            { a: new Date().valueOf() }
          ]);
          this.$api.tip.success("上传成功");
        }
      });
    }
  }
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>