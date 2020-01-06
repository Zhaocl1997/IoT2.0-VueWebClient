'use strict'

import { addUrlTimeStamp } from "../helper/public";
import { isLoginMixins } from './isLogin'

export const avatarMixins = {
    mixins: [isLoginMixins],
    data() {
        return {
            imgURL: "", // 带时间戳的头像地址
            avatarURL: "", // 不带时间戳的头像地址
        }
    },
    mounted() {
        if (this.isLogin) {
            this.init();
        }
    },
    computed: {
        onAvatarFirstChange() {
            return this.$store.getters["dataState/getData"].a ? true : false;
        },
        onAvatarMoreChange() {
            return this.$store.getters["dataState/getData"].a;
        }
    },
    watch: {
        onAvatarMoreChange: function (val, oldVal) {
            if (val !== "" && val !== oldVal) {
                this.init();
            }
        }
    },
    methods: {
        // 获取头像URL
        async init() {
            const result = await this.$api.userService.read();
            this.avatarURL = result.data.avatar;
            this.imgURL = addUrlTimeStamp(this.avatarURL);
        }
    }
}