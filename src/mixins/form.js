'use strict'

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
        // 取消
        onCancel() {            
            if (isEmpty(this.dialogFormData)) {
                this.$refs.dialogform.clearValidate();
                this.$emit("cancel");
            } else {
                this.$info.checkBox('当前表单还有内容,确认要关闭窗口吗?').then(action => {
                    if (action === true) {
                        this.$refs.dialogform.clearValidate();
                        this.$emit("cancel");
                    }
                })
            }
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