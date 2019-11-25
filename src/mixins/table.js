import { countLineNum } from '../helper/public'

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
        this.reqData.pagerow = countLineNum();
        this.init(this.reqData);
    },
    methods: {
        // 分页参数
        async onPage(data) {
            this.reqData.pagenum = data;
            await this.init(this.reqData);
        },
        // 查询参数
        async onFilter(data) {
            this.reqData.filters = data;
            await this.init(this.reqData);
        },
        // 排序参数
        async onSort(e) {
            this.reqData.sortField = e.prop;
            this.reqData.sortOrder = e.order;
            await this.init(this.reqData);
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
        async onSave() {
            this.dialogVisible = false
            this.dialogTitle = ''
            this.dialogData = {}
            await this.init(this.reqData);
        },
        // 处理窗体取消
        onCancel() {
            this.dialogVisible = false
            this.dialogTitle = ''
            this.dialogData = {}
        }
    }
}