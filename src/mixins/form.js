import { tip } from '../components/MessageBox';
import { isEmpty } from "../helper/public";

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
        // 窗口关闭前的回调
        onDialogClose() {
            delete this.dialogFormData.status
            if (!(isEmpty(this.dialogFormData))) {
                this.$confirm("你会失去现在已经输入的内容哦，确定要关闭吗?")
                    .then(() => {
                        this.$emit("cancel");
                    })
                    .catch(() => {
                        tip.cancel()
                    });
            } else {
                this.$emit("cancel");
            }
        },
        // 取消
        onCancel() {
            this.$refs.dialogform.clearValidate();
            this.$refs.dialogform.resetFields()
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