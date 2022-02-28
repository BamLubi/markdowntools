/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.initTreeViewItem = void 0;
// 本文件确定侧边视图容器的显示
const vscode_1 = __webpack_require__(2);
const path_1 = __webpack_require__(3);
const ItemProvider_1 = __webpack_require__(4);
/**
 * 单项节点的TreeItem类
 */
class TreeItemNode extends vscode_1.TreeItem {
    constructor(category, item) {
        super(item[0]);
        this.children = [];
        // 共同属性
        this.label = item[0];
        this.description = item[3];
        this.iconPath = item[2] == "" ? undefined : {
            light: vscode_1.Uri.file((0, path_1.join)(__filename, '..', '..', 'dist', "assets", category, item[2] + "-light.svg")),
            dark: vscode_1.Uri.file((0, path_1.join)(__filename, '..', '..', 'dist', "assets", category, item[2] + "-dark.svg"))
        };
        // 判断是否存在子项目
        if (item[1] == ItemProvider_1.CState.None) {
            // 不存在子项目
            // demo: ["一级标题", CState.None, "1.svg", "#", "add_front_fixed", "# "]
            let args;
            [, , , , , ...args] = item;
            this.collapsibleState = vscode_1.TreeItemCollapsibleState.None;
            this.command = {
                title: this.label,
                command: item[4],
                tooltip: this.label,
                arguments: [this.label, ...args]
            };
        }
        else {
            // 存在子项目
            // demo: ["粗体", "1.svg", "**content**", CState.Collapsed]
            this.collapsibleState = item[1] == ItemProvider_1.CState.Collapsed ? vscode_1.TreeItemCollapsibleState.Collapsed : vscode_1.TreeItemCollapsibleState.Expanded;
            this.command = {
                title: this.label,
                command: '',
                tooltip: this.label
            };
            this.children = ItemProvider_1.ALL_ITEMS_2[this.label];
        }
    }
}
/**
 * 用于注册的树视图TreeDataProvider类
 */
class TreeViewProvider {
    constructor(category, ITEMS) {
        this.category = category;
        this.ITEMS = ITEMS;
    }
    // 获取树视图中的每一项 item,所以要返回 element
    getTreeItem(element) { return element; }
    // 给每一项都创建一个 TreeItemNode
    getChildren(element) {
        if (element) {
            return element.children.map(item => new TreeItemNode(this.category, item));
        }
        else {
            return this.ITEMS.map(item => new TreeItemNode(this.category, item));
        }
    }
}
/**
 * 初始化并注册树视图
 */
function initTreeViewItem() {
    // 实例化 TreeViewProvider
    ItemProvider_1.ALL_KEYS.forEach(element => {
        // registerTreeDataProvider：注册树视图
        vscode_1.window.registerTreeDataProvider(element, new TreeViewProvider(element.toString(), ItemProvider_1.ALL_ITEMS[element]));
    });
}
exports.initTreeViewItem = initTreeViewItem;


/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("vscode");

/***/ }),
/* 3 */
/***/ ((module) => {

module.exports = require("path");

/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, exports) => {


// 本文件保存所有需要插入的组件信息
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ALL_KEYS = exports.ALL_ITEMS_2 = exports.ALL_ITEMS = exports.CState = void 0;
// key为视图id
// 每一项元组代表
// [label, CState, icon, description, command, args]
// 定义树视图中每一个子项是否存在子项，并定义其折叠状态
var CState;
(function (CState) {
    CState[CState["Collapsed"] = 0] = "Collapsed";
    CState[CState["Expanded"] = 1] = "Expanded";
    CState[CState["None"] = 2] = "None"; // 无子项
})(CState = exports.CState || (exports.CState = {}));
// 一级
exports.ALL_ITEMS = {
    "v-common": [
        ["一级标题", CState.None, "h1", "#", "add_front_fixed", "# "],
        ["二级标题", CState.None, "h2", "##", "add_front_fixed", "## "],
        ["三级标题", CState.None, "h3", "###", "add_front_fixed", "### "],
        ["粗体", CState.None, "B", "** **", "add_both_fixed", "**", "**"],
        ["斜体", CState.None, "I", "* *", "add_both_fixed", "*", "*"],
        ["删除线", CState.None, "del", "~~ ~~", "add_both_fixed", "~~", "~~"],
        ["有序列表", CState.None, "youxu", "1. ", "add_front_fixed", "1. "],
        ["无序列表", CState.None, "wuxu", "- ", "add_front_fixed", "- "],
        ["待办", CState.None, "todo", "- [ ] ", "add_front_fixed", "- [ ] "],
        ["超链接", CState.None, "link", "[ ]( )", "add_both_fixed", "[", "](uri)"]
    ],
    "v-insert": [
        ["表格", CState.None, "table", "| |:--:| |", "add_table", "| |:--:| |"],
        ["代码", CState.None, "code", "``` ```", "add_nxt_fixed", "\n```\n\n```"],
        ["引用", CState.None, "ref", "> ", "add_front_fixed", "> "],
        ["链接引用", CState.None, "linkref", "[ ]: ", "add_both_fixed", "[", "]:uri"],
        ["脚注", CState.None, "foot", "[^ ]: ", "add_both_fixed", "[^", "]:description"],
        ["公式", CState.None, "_math", "$$ $$", "add_both_fixed", "\n$$\n\n$$\n"],
        ["内联公式", CState.None, "math", "$ $", "add_cur_fixed", "$ $"],
        ["目录", CState.None, "toc", "[TOC]", "add_front_fixed", "[TOC]\n\n"],
        ["图片", CState.None, "image", "![ ]( )", "add_image", "![title](uri)"],
        ["分割线", CState.None, "divider", "> ", "add_nxt_fixed", "\n-----\n\n"],
        ["徽章", CState.None, "badge", "", "add_badge", ""],
        ["按键", CState.None, "button", "<kbd></kbd>", "add_both_fixed", "<kbd>", "</kbd>"]
    ],
    "v-math": [
        ["在线公式设计", CState.None, "", "www.latexlive.com", "nav_web", "https://www.latexlive.com"],
        ["常用符号", CState.Collapsed, "", ""],
        ["希腊字母", CState.Collapsed, "", ""],
        ["运算符", CState.Collapsed, "", ""],
    ],
    "v-emoji": [
        ["在线表情选择", CState.None, "", "www.webfx.com/tools/emoji-cheat-sheet", "nav_web", "https://www.webfx.com/tools/emoji-cheat-sheet"],
        ["人物", CState.Collapsed, "", ""],
        ["自然", CState.Collapsed, "", ""],
        ["地点", CState.Collapsed, "", ""],
        ["符号", CState.Collapsed, "", ""]
    ],
    "v-flow": [
        ["标准流程图", CState.None, "flow", "", "add_nxt_fixed", `\`\`\`flow
st=>start: 开始框
op=>operation: 处理框
cond=>condition: 判断框(是或否?)
sub1=>subroutine: 子流程
io=>inputoutput: 输入输出框
e=>end: 结束框
st->op->cond
cond(yes)->io->e
cond(no)->sub1(right)->op
\`\`\`
`],
        ["标准横向流程图", CState.None, "flow", "", "add_nxt_fixed", `\`\`\`flow
st=>start: 开始框
op=>operation: 处理框
cond=>condition: 判断框(是或否?)
sub1=>subroutine: 子流程
io=>inputoutput: 输入输出框
e=>end: 结束框
st(right)->op(right)->cond
cond(yes)->io(bottom)->e
cond(no)->sub1(right)->op
\`\`\`
`],
        ["时序图", CState.None, "seq", "", "add_nxt_fixed", `\`\`\`sequence
Title: 标题: 时序图
对象A->对象B: 对象B你好吗?(请求)
Note right of 对象B: 对象B的描述
Note left of 对象A: 对象A的描述(提示)
对象B-->对象A: 我很好(响应)
对象B->小三: 你好吗
小三-->>对象A: 对象B找我了
对象A->对象B: 你真的好吗?
Note over 小三,对象B: 我们是朋友
participant C
Note right of C: 没人陪我玩
\`\`\`
`],
        ["甘特图", CState.None, "gantt", "", "add_nxt_fixed", `\`\`\`mermaid
gantt
dateFormat YYYY-MM-DD
title 软件开发甘特图
section 设计
需求    :done,      des1,       2022-01-06,2022-01-08
原型    :active,    des2,       2022-01-09, 3d
UI设计  :des3,      after des2, 5d

section 开发
设计框架    :crit,  done,   after des2, 2d
开发系统    :crit,  active, 3d
未来任务    :crit,  5d

section 测试
功能测试    :active,    a1, after des3, 3d
压力测试    :after a1,  20h
测试报告    :48h
\`\`\`
`]
    ]
};
// 二级
exports.ALL_ITEMS_2 = {
    "常用符号": [
        ["乘法", CState.None, "1-1", "\\times", "add_cur_fixed", "\\times "],
        ["除法", CState.None, "1-2", "\\div", "add_cur_fixed", "\\div "],
        ["正负号", CState.None, "1-3", "\\pm", "add_cur_fixed", "\\pm "],
        ["负正号", CState.None, "1-4", "\\mp", "add_cur_fixed", "\\mp "],
        ["交集", CState.None, "1-5", "\\cup", "add_cur_fixed", "\\cup "],
        ["并集", CState.None, "1-6", "\\div", "add_cur_fixed", "\\cap "],
        ["大于等于", CState.None, "1-7", "\\ge", "add_cur_fixed", "\\ge "],
        ["小于等于", CState.None, "1-8", "\\le", "add_cur_fixed", "\\le "],
        ["属于", CState.None, "1-9", "\\in", "add_cur_fixed", "\\in "],
        ["所有", CState.None, "1-10", "\\forall", "add_cur_fixed", "\\forall "],
        ["存在", CState.None, "1-11", "\\exists", "add_cur_fixed", "\\exists "]
    ],
    "希腊字母": [
        ["α", CState.None, "", "\\alpha", "add_cur_fixed", "\\alpha "],
        ["β", CState.None, "", "\\beta", "add_cur_fixed", "\\beta "],
        ["γ", CState.None, "", "\\gamma", "add_cur_fixed", "\\gamma "],
        ["δ", CState.None, "", "\\delta", "add_cur_fixed", "\\delta "],
        ["ε", CState.None, "", "\\epsilon", "add_cur_fixed", "\\epsilon "],
        ["ζ", CState.None, "", "\\zeta", "add_cur_fixed", "\\zeta "],
        ["η", CState.None, "", "\\eta", "add_cur_fixed", "\\eta "],
        ["θ", CState.None, "", "\\theta", "add_cur_fixed", "\\theta "],
        ["λ", CState.None, "", "\\lambda", "add_cur_fixed", "\\lambda "],
        ["μ", CState.None, "", "\\mu", "add_cur_fixed", "\\mu "],
        ["π", CState.None, "", "\\pi", "add_cur_fixed", "\\pi "],
        ["ρ", CState.None, "", "\\rho", "add_cur_fixed", "\\rho "],
        ["σ", CState.None, "", "\\sigma", "add_cur_fixed", "\\sigma "],
        ["τ", CState.None, "", "\\tau", "add_cur_fixed", "\\tau "],
        ["φ", CState.None, "", "\\varphi", "add_cur_fixed", "\\varphi "],
        ["ψ", CState.None, "", "\\psi", "add_cur_fixed", "\\psi "],
        ["ω", CState.None, "", "\\omega", "add_cur_fixed", "\\omega "]
    ],
    "运算符": [
        ["分数", CState.None, "2-1", "\\frac{a}{b}", "add_cur_fixed", "\\frac{}{} "],
        ["微分", CState.None, "2-2", "\\mathrm{d}t", "add_cur_fixed", "\\mathrm{d}t "],
        ["偏微分", CState.None, "2-3", "\\partial t", "add_cur_fixed", "\\partial t "],
        ["Nabla算子", CState.None, "2-4", "\\nabla \\psi", "add_cur_fixed", "\\nabla \\psi "],
        ["根号", CState.None, "2-5", "\\sqrt[]{x}", "add_cur_fixed", "\\sqrt[]{} "],
        ["积分", CState.None, "2-6", "\\int_{a}^{b}", "add_cur_fixed", "\\int_{}^{} "],
        ["二重积分", CState.None, "2-7", "\\iint_{a}^{b}", "add_cur_fixed", "\\iint_{}^{} "],
        ["求和", CState.None, "2-8", "\\sum_{a}^{b}", "add_cur_fixed", "\\sum_{}^{} "],
        ["求积", CState.None, "2-9", "\\prod_{a}^{b}", "add_cur_fixed", "\\prod_{}^{} "],
        ["矩阵", CState.None, "2-10", "\\begin{bmatrix}a&b\\\\c&d\\end{bmatrix}", "add_cur_fixed", "\n\\begin{bmatrix}\n  &  \\\\\n  &  \n\\end{bmatrix}\n"],
        ["行列式", CState.None, "2-11", "\\begin{vmatrix}a&b\\\\c&d\\end{vmatrix}", "add_cur_fixed", "\n\\begin{vmatrix}\n  &  \\\\\n  &  \n\\end{vmatrix}\n"],
        ["分段函数", CState.None, "2-12", "\\begin{cases}...\\\\...\\end{cases}", "add_cur_fixed", "\\begin{cases}\n  \\\\\n  \n\\end{cases}"]
    ],
    "人物": [
        ["😁", CState.None, "", ":smile:", "add_cur_fixed", ":smile: "],
        ["😆", CState.None, "", ":laughing:", "add_cur_fixed", ":laughing: "],
        ["😭", CState.None, "", ":sob:", "add_cur_fixed", ":sob: "],
        ["😪", CState.None, "", ":sleepy:", "add_cur_fixed", ":sleepy: "],
        ["😡", CState.None, "", ":rage:", "add_cur_fixed", ":rage: "],
        ["👍", CState.None, "", ":+1:", "add_cur_fixed", ":+1: "],
        ["👎", CState.None, "", ":-1:", "add_cur_fixed", ":-1: "],
        ["💪", CState.None, "", ":muscle:", "add_cur_fixed", ":muscle: "]
    ],
    "自然": [
        ["☀", CState.None, "", ":sunny:", "add_cur_fixed", ":sunny: "],
        ["☁", CState.None, "", ":cloud:", "add_cur_fixed", ":cloud: "],
        ["🌧", CState.None, "", ":umbrella:", "add_cur_fixed", ":umbrella: "],
        ["🌨", CState.None, "", ":snowflake:", "add_cur_fixed", ":snowflake: "],
        ["⚡", CState.None, "", ":zap:", "add_cur_fixed", ":zap: "],
        ["🐶", CState.None, "", ":dog:", "add_cur_fixed", ":dog: "],
        ["🐱", CState.None, "", ":cat:", "add_cur_fixed", ":cat: "],
        ["🐸", CState.None, "", ":frog:", "add_cur_fixed", ":frog: "],
        ["🐷", CState.None, "", ":pig:", "add_cur_fixed", ":pig: "]
    ],
    "地点": [
        ["🏘", CState.None, "", ":house:", "add_cur_fixed", ":house: "],
        ["🏥", CState.None, "", ":hospital:", "add_cur_fixed", ":hospital: "],
        ["💒", CState.None, "", ":school:", "add_cur_fixed", ":school: "],
        ["🏙", CState.None, "", ":office:", "add_cur_fixed", ":office: "],
        ["🕍", CState.None, "", ":church:", "add_cur_fixed", ":church: "]
    ],
    "符号": [
        ["✔", CState.None, "", ":heavy_check_mark:", "add_cur_fixed", ":heavy_check_mark: "],
        ["❌", CState.None, "", ":x:", "add_cur_fixed", ":x: "],
        ["⭕", CState.None, "", ":o:", "add_cur_fixed", ":o: "],
        ["™", CState.None, "", ":tm:", "add_cur_fixed", ":tm: "],
        ["❤", CState.None, "", ":heart:", "add_cur_fixed", ":heart: "]
    ]
};
// export const ALL_KEYS = Object.keys(ALL_ITEMS).map(item => <keyof typeof ALL_ITEMS>item);
exports.ALL_KEYS = Object.keys(exports.ALL_ITEMS);


/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.initWebViewCommand = exports.commandList = void 0;
const vscode = __webpack_require__(2);
const WebView_1 = __webpack_require__(6);
let commandList = [];
exports.commandList = commandList;
/**
 * 获取当前光标选中的行、列
 * @returns [开始行, 结束行, 开始列, 结束列]
 */
function getTextEditorPosition() {
    let st_line = (vscode.window.activeTextEditor?.selection.start.line);
    let st_character = (vscode.window.activeTextEditor?.selection.start.character);
    let ed_line = (vscode.window.activeTextEditor?.selection.end.line);
    let ed_character = (vscode.window.activeTextEditor?.selection.end.character);
    // console.log("添加文字-start", st_line, st_character);
    // console.log("添加文字-end", ed_line, ed_character);
    return [st_line, ed_line, st_character, ed_character];
}
// add_both_fixed
commandList.push(
// 添加在选中文字的两边，光标位置不动
vscode.commands.registerCommand("add_both_fixed", (label, content_l, content_r) => {
    // 快捷键匹配
    if (label == "ctrl_b") {
        content_l = content_r = "**";
    }
    else if (label == "ctrl_i") {
        content_l = content_r = "*";
    }
    vscode.window.activeTextEditor?.edit((editBuilder) => {
        let [st_line, ed_line, st_character, ed_character] = getTextEditorPosition();
        editBuilder.insert(new vscode.Position(st_line, st_character), content_l);
        editBuilder.insert(new vscode.Position(ed_line, ed_character), content_r);
    });
}));
// add_front_fixed
commandList.push(
// 添加该行的前面，光标位置不动
vscode.commands.registerCommand("add_front_fixed", (label, content) => {
    // 快捷键匹配
    if (label === "ctrl_1") {
        content = "# ";
    }
    else if (label === "ctrl_2") {
        content = "## ";
    }
    else if (label === "ctrl_3") {
        content = "### ";
    }
    vscode.window.activeTextEditor?.edit((editBuilder) => {
        let [st_line, ...rest] = getTextEditorPosition();
        editBuilder.insert(new vscode.Position(st_line, 0), content);
    });
}));
// add_cur_fixed
commandList.push(
// 添加在当前位置，光标位置不动
vscode.commands.registerCommand("add_cur_fixed", (label, content) => {
    vscode.window.activeTextEditor?.edit((editBuilder) => {
        let [st_line, , st_character,] = getTextEditorPosition();
        editBuilder.insert(new vscode.Position(st_line, st_character), content);
    });
}));
// add_nxt_fixed
commandList.push(
// 添加下一行开头，光标位置不动
vscode.commands.registerCommand("add_nxt_fixed", (label, content) => {
    vscode.window.activeTextEditor?.edit((editBuilder) => {
        let [st_line, ...rest] = getTextEditorPosition();
        editBuilder.insert(new vscode.Position(st_line + 1, 0), content);
    });
}));
// add_image
commandList.push(
// 添加图片
vscode.commands.registerCommand("add_image", (label, content) => {
    vscode.window.showOpenDialog({
        canSelectFiles: true,
        canSelectMany: false,
        canSelectFolders: false
    }).then(res => {
        if (res != undefined && res.length != 0) {
            let uri = res[0].path;
            uri = uri.substring(1, uri.length);
            vscode.window.activeTextEditor?.edit((editBuilder) => {
                let [st_line, ...rest] = getTextEditorPosition();
                editBuilder.insert(new vscode.Position(st_line + 1, 0), "![title](" + uri + ")");
            });
        }
    });
}));
/**
 * 制作table字符串
 * @param row 行数
 * @param col 列数
 * @param align 对齐方式 0:居中,1:居左,2:居右
 * @returns table字符串
 */
function makeTable(row, col, align) {
    // 构造插入的内容,一个格子4个空
    let content = "";
    // 插入首行
    content += "|";
    for (let i = 0; i < col; i++) {
        content += "    |";
    }
    content += "\n";
    // 插入对齐行
    content += "|";
    let alignStr = align == 0 ? ":--:" : align == 1 ? ":---" : "---:";
    for (let i = 0; i < col; i++) {
        content += alignStr + "|";
    }
    content += "\n";
    // 插入内容行
    for (let i = 0; i < row - 1; i++) {
        content += "|";
        for (let j = 0; j < col; j++) {
            content += "    |";
        }
        content += "\n";
    }
    return content;
}
// add_table
commandList.push(
// 添加表格
vscode.commands.registerCommand("add_table", (label, content) => {
    let row = 2; // 行数
    let col = 2; // 列数
    let align = 0; // 0:居中,1:居左,2:居右
    vscode.window.showInputBox({
        placeHolder: '请输入表格的行数,默认为2'
    }).then(res => {
        if (res == undefined)
            throw "no input";
        else {
            row = isNaN(Number(res)) || res == "" ? row : Number(res);
            return vscode.window.showInputBox({
                placeHolder: '请输入表格的列数,默认为2'
            });
        }
    }).then(res => {
        if (res == undefined)
            throw "no input";
        else {
            col = isNaN(Number(res)) || res == "" ? col : Number(res);
            return vscode.window.showInputBox({
                placeHolder: '请输入表格对齐方式',
                prompt: '0:居中对齐(默认),1:左对齐,2:右对齐'
            });
        }
    }).then(res => {
        align = isNaN(Number(res)) ? align : Number(res);
        // 检查行列必须大于0
        if (row <= 0 || col <= 0 || align < 0 || align > 2)
            throw "input error";
        // 插入视图
        vscode.window.activeTextEditor?.edit((editBuilder) => {
            let [st_line, ...rest] = getTextEditorPosition();
            editBuilder.insert(new vscode.Position(st_line + 1, 0), makeTable(row, col, align));
        });
    });
}));
// add_badge
commandList.push(
// 添加徽章
vscode.commands.registerCommand("add_badge", (label, content) => {
    let _label = "label";
    let _msg = "message";
    let _style = "brightgreen";
    // 用户输入
    vscode.window.showInputBox({
        placeHolder: '请输入label信息,如"下载量","访问量"...,默认为"label"'
    }).then(res => {
        if (res == undefined)
            throw "no input";
        else {
            _label = res == "" ? _label : res;
            return vscode.window.showInputBox({
                placeHolder: '请输入message信息,如"10k"...,默认为"message"'
            });
        }
    }).then(res => {
        if (res == undefined)
            throw "no input";
        else {
            _msg = res == "" ? _msg : res;
            return vscode.window.showQuickPick([
                'brightgreen', 'yellow', 'orange', 'red', 'blue', 'success', 'important', 'critical', 'informational', 'blueviolet'
            ], {
                canPickMany: false,
                placeHolder: '请选择颜色'
            });
        }
    }).then(res => {
        _style = res == undefined ? _style : res;
        // 构造内容
        let content = "![](https://img.shields.io/badge/" + _label + "-" + _msg + "-" + _style + ")";
        // 插入视图
        vscode.window.activeTextEditor?.edit((editBuilder) => {
            let [st_line, ...rest] = getTextEditorPosition();
            editBuilder.insert(new vscode.Position(st_line + 1, 0), content);
        });
    });
}));
// markdowntools.share
commandList.push(
// 添加徽章
vscode.commands.registerCommand("markdowntools.share", () => {
    console.log("分享");
}));
/**
 * 网页跳转，内置浏览器
 * @param context
 */
function initWebViewCommand() {
    let commandList = [];
    commandList.push(vscode.commands.registerCommand("nav_web", (label, url) => {
        const webView = (0, WebView_1.createWebView)(vscode.ViewColumn.Active, label, url);
        commandList.push(webView);
    }));
    return commandList;
}
exports.initWebViewCommand = initWebViewCommand;


/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createWebView = void 0;
const vscode_1 = __webpack_require__(2);
// 存储url和WebviewPanel的键值对
var webViewMap = new Map([]);
/**
 * 创建一个网页面板
 * @param viewColumn
 * @param label 标题
 * @param url 链接
 * @returns WebviewPanel
 */
function createWebView(viewColumn, label, url) {
    let webViewPanel;
    // 判断是否已经存在该网页面板
    if (!webViewMap.has(url)) {
        webViewPanel = vscode_1.window.createWebviewPanel('webView', label, viewColumn, {
            retainContextWhenHidden: true,
            enableScripts: true // html页是否可以使用Scripts
        });
        // 面板嵌入html
        webViewPanel.webview.html = getIframeHtml(url);
        // 添加进webViewMap
        webViewMap.set(url, webViewPanel);
    }
    else {
        // 获取该webViewPanel并显示
        webViewPanel = webViewMap.get(url);
        webViewPanel.reveal();
    }
    // onDidDispose: 关闭该面板时
    webViewPanel.onDidDispose(() => {
        webViewMap.delete(url);
    });
    return webViewPanel;
}
exports.createWebView = createWebView;
// 这个方法没什么了，就是一个 最简单的嵌入 iframe 的 html 页面
function getIframeHtml(url) {
    return `
    <!DOCTYPE html>
    <html lang="en">
        <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>
            html,
            body {
                margin: 0 !important;
                padding: 0 !important;
                width: 100%;
                height: 100%;
            }
            .iframeDiv {
                width: 100%;
                height: 100%;
            }
        </style>
        </head>

        <body>
        <iframe id='iframe1' class="iframeDiv" src="${url}" scrolling="auto"></iframe>
        </body>
    </html>
    `;
}


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.deactivate = exports.activate = void 0;
const TreeViewProvider_1 = __webpack_require__(1);
const CommandProvider_1 = __webpack_require__(5);
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "MarkdownTools" is now active!');
    // 注册命令列表
    context.subscriptions.push(...CommandProvider_1.commandList);
    // 初始化树视图
    (0, TreeViewProvider_1.initTreeViewItem)();
    // 初始化网页
    let webViewList = (0, CommandProvider_1.initWebViewCommand)();
    context.subscriptions.push(...webViewList);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;

})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=extension.js.map