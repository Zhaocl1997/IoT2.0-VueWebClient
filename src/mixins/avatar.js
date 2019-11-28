import { userService } from "../services";
import { addUrlTimeStamp } from "../helper/public";

export const avatarMixins = {
    data() {
        return {
            imgURL: "", // 带时间戳的头像地址
            avatarURL: "", // 不带时间戳的头像地址
        }
    },
    async mounted() {
        await this.init();
    },
    computed: {
        onAvatarFirstChange() {
            return this.$store.state.dataState.a ? true : false;
        },
        onAvatarMoreChange() {
            return this.$store.state.dataState.a;
        }
    },
    watch: {
        onAvatarMoreChange: async function (val, oldVal) {
            if (val != 0 && val !== oldVal) {
                await this.init();
            }
        }
    },
    methods: {
        // 获取头像URL
        async init() {
            const result = await userService.read();
            this.avatarURL = result.avatar;
            this.imgURL = addUrlTimeStamp(this.avatarURL);
        },
    }
}