export const formMixins = {
    data() {
        return {
            labelPosition: "left"
        }
    },
    props: {
        dialogVisible: {
            type: Boolean,
            required: true
        },
        dialogFormData: {
            type: Object,
            required: true
        },
        dialogTitle: {
            type: String,
            required: true
        }
    },
    methods: {
        // 取消
        onCancel() {
            this.$refs.dialogform.clearValidate();
            this.$emit("cancel");
        },
        // 确定
        onConfirm() {
            this.$refs.dialogform.validate().then(valid => {
                if (valid === true) {
                    this.onAction().then(res => {
                        if (res === true) {
                            this.$emit("save");
                        }
                    })
                }
            })
        }
    }
}