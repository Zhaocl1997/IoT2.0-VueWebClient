export const userRulesMixins = {
    data() {
        return {
            rules: {
                role: [
                    { required: true, message: "请选择角色", trigger: "blur" }
                ],
                gender: [
                    { required: true, message: "请选择性别", trigger: "blur" }
                ],
                birth: [
                    { required: true, message: "请选择生日", trigger: "blur" }
                ],
                area: [
                    { required: true, message: "请选择地区", trigger: "blur" }
                ],
                status: [
                    { required: true, message: "请选择状态", trigger: "blur" }
                ],
                name: [
                    { required: true, message: "请输入昵称", trigger: "blur" },
                    { min: 3, max: 12, message: "昵称长度在3到12位", trigger: "blur" }
                ],
                phone: [
                    { required: true, message: "请输入手机号码", trigger: "blur" },
                    {
                        pattern: /^[1][2-9][0-9]{9}$/,
                        message: "请输入正确的手机号码",
                        trigger: "blur"
                    }
                ],
                email: [
                    { required: true, message: "请输入邮箱", trigger: "blur" },
                    {
                        pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
                        message: "请输入正确的邮箱",
                        trigger: "blur"
                    }
                ],
                password: [
                    { required: true, message: "请输入密码", trigger: "blur" },
                    { min: 9, max: 16, message: "密码长度在9到16位", trigger: "blur" }
                ]
            }
        }
    }
}