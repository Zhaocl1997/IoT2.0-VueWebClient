'use strict'

import { format, debounce } from "../helper/public";

export const tableMixins = {
    data() {
        return {
            tableData: [], // 数据
            total: 1, // 数量

            dialogTitle: "", // 窗口标题
            dialogVisible: false, // 窗口是否显示
            dialogData: {}, // 窗口参数

            multipleSelection: [], // 多选框

            // 请求数据
            reqData: {
                pagenum: 1, // 页号
                pagerow: 1, // 每页记录数
                filters: "", // 搜索框内容
                sortField: "status", // 排序字段
                sortOrder: "descending" // 排序顺序
            }
        };
    },
    mounted() {
        this.init();
        this.debouncedInit = debounce(this.init, 600) // 防抖
    },
    methods: {
        // 分页参数
        onPage(data) {
            this.reqData.pagenum = data;
            this.init();
        },
        // 查询参数
        onFilter(data) {
            this.reqData.filters = data;
            this.debouncedInit()
        },
        // 排序参数
        onSort(e) {
            this.reqData.sortField = e.prop;
            this.reqData.sortOrder = e.order;
            this.debouncedInit()
        },
        // 刷新
        onFresh() {
            this.$refs.multipleTable.clearSort()
            this.reqData.sortField = "status";
            this.reqData.sortOrder = "descending";
            this.init();
        },
        // 启用显示浅绿色,关闭显示浅米色
        tableRowClassName({ row }) {
            if (row.status === true) {
                return "on-row";
            } else if (row.status === false) {
                return "off-row";
            }
        },
        // 处理多选变化
        onSelectionChange(val) {
            this.multipleSelection = val;
        },
        // 触发多选取消
        onToggleSelection(rows) {
            if (rows) {
                rows.forEach(row => {
                    this.$refs.multipleTable.toggleRowSelection(row);
                });
            } else {
                this.$refs.multipleTable.clearSelection();
            }
        },
        // 处理窗体保存
        onSave() {
            this.dialogData = {}
            this.dialogVisible = false
            this.init();
            this.$store.dispatch("dataState/clearData", ["m1"]);
        },
        // 处理窗体取消
        onCancel() {
            this.dialogData = {}
            this.dialogVisible = false
            this.$store.dispatch("dataState/clearData", ["m1"]);
        },
        // 处理格式化显示
        onTimeFormat(row, column) {
            switch (column.label) {
                case "创建时间":
                    return format(row.createdAt, "YYYY/MM/DD HH:mm:ss");

                case "更新时间":
                    return format(row.updatedAt, "YYYY/MM/DD HH:mm:ss");
            }
        }
    }
}