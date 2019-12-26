'use strict'

import { userService } from "../services";
import { addUrlTimeStamp } from "../helper/public";

export const avatarMixins = {
    data() {
        return {
            imgURL: "", // 带时间戳的头像地址
            avatarURL: "", // 不带时间戳的头像地址
        }
    },
    mounted() {
        this.init();
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
            const result = await userService.read();
            this.avatarURL = result.data.avatar;
            this.imgURL = addUrlTimeStamp(this.avatarURL);
        },
    }
}