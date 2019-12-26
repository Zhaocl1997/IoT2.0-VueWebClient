'use strict'

// 信息提示
export const titleConfig = {
    "ql-bold": "加粗",
    "ql-color": "颜色",
    "ql-font": "字体",
    "ql-code": "插入代码",
    "ql-italic": "斜体",
    "ql-link": "添加链接",
    "ql-background": "颜色",
    "ql-size": "字体大小",
    "ql-strike": "删除线",
    "ql-script": "上标/下标",
    "ql-underline": "下划线",
    "ql-blockquote": "引用",
    "ql-header": "标题",
    "ql-indent": "缩进",
    "ql-list": "列表",
    "ql-align": "文本对齐",
    "ql-direction": "文本方向",
    "ql-code-block": "代码块",
    "ql-formula": "公式",
    "ql-image": "图片",
    "ql-video": "视频",
    "ql-clean": "清除字体样式"
}

// 配置
export const editorOptions = {
    modules: {
        toolbar: [
            ["bold", "italic", "underline", "strike"], // 加粗，斜体，下划线，删除线
            ["blockquote", "code-block"], // 引用，代码块

            [{ header: 1 }, { header: 2 }], // 标题，键值对的形式；1、2表示字体大小
            [{ list: "ordered" }, { list: "bullet" }], // 列表
            [{ script: "sub" }, { script: "super" }], // 上下标
            [{ indent: "-1" }, { indent: "+1" }], // 缩进
            [{ direction: "rtl" }], // 文本方向

            [{ size: ["small", false, "large", "huge"] }], // 字体大小
            [{ header: [1, 2, 3, 4, 5, 6, false] }], // 几级标题

            [{ color: [] }, { background: [] }], // 字体颜色，字体背景颜色
            [{ font: [] }], // 字体
            [{ align: [] }], // 对齐方式

            ["clean"], // 清除字体样式
            ["image", "video"] // 上传图片、上传视频
        ]
    },
    theme: "snow"
}

export function addQuillTitle(val) {
    setTimeout(() => {
        const oToolBar = document.getElementById("myQuillEditor");
        const aButton = oToolBar.querySelectorAll("button");
        const aSelect = oToolBar.querySelectorAll("select");

        aButton.forEach(item => {
            if (item.className === "ql-script") {
                item.value === "sub"
                    ? (item.title = "下标")
                    : (item.title = "上标");
            } else if (item.className === "ql-indent") {
                item.value === "+1"
                    ? (item.title = "向右缩进")
                    : (item.title = "向左缩进");
            } else {
                item.title = val[item.classList[0]];
            }
        });

        aSelect.forEach(item => {
            item.parentNode.title = val[item.classList[0]];
        });
    }, 100)
}