// 本文件保存所有需要插入的组件信息

// key为视图id
// 每一项元组代表
// [label, CState, icon, description, command, args]

// 定义树视图中每一个子项是否存在子项，并定义其折叠状态
export enum CState {
    collapsed, // 折叠状态
    expanded, // 展开状态,注意无限展开
    none // 无子项
}

// 一级
export const ALL_ITEMS = {
    "v-common": [
        ["一级标题", CState.none, "h1", "#", "add_front_fixed", "# "],
        ["二级标题", CState.none, "h2", "##", "add_front_fixed", "## "],
        ["三级标题", CState.none, "h3", "###", "add_front_fixed", "### "],
        ["粗体", CState.none, "B", "** **", "add_both_fixed", "**", "**"],
        ["斜体", CState.none, "I", "* *", "add_both_fixed", "*", "*"],
        ["删除线", CState.none, "del", "~~ ~~", "add_both_fixed", "~~", "~~"],
        ["有序列表", CState.none, "youxu", "1. ", "add_front_fixed", "1. "],
        ["无序列表", CState.none, "wuxu", "- ", "add_front_fixed", "- "],
        ["待办", CState.none, "todo", "- [ ] ", "add_front_fixed", "- [ ] "],
        ["超链接", CState.none, "link", "[ ]( )", "add_both_fixed", "[", "](uri)"]
    ],
    "v-insert": [
        ["表格", CState.none, "table", "| |:--:| |", "add_table", "| |:--:| |"],
        ["代码", CState.none, "code", "``` ```", "add_nxt_fixed", "\n```\n\n```"],
        ["引用", CState.none, "ref", "> ", "add_front_fixed", "> "],
        ["链接引用", CState.none, "linkref", "[ ]: ", "add_both_fixed", "[", "]:uri"],
        ["脚注", CState.none, "foot", "[^ ]: ", "add_both_fixed", "[^", "]:description"],
        ["公式", CState.none, "_math", "$$ $$", "add_both_fixed", "\n$$\n\n$$\n"],
        ["内联公式", CState.none, "math", "$ $", "add_cur_fixed", "$ $"],
        ["目录", CState.none, "toc", "[TOC]", "add_front_fixed", "[TOC]\n\n"],
        ["图片", CState.none, "image", "![ ]( )", "add_image", "![title](uri)"],
        ["分割线", CState.none, "divider", "> ", "add_nxt_fixed", "\n-----\n\n"],
        ["徽章", CState.none, "badge", "", "add_badge", ""],
        ["按键", CState.none, "button", "<kbd></kbd>", "add_both_fixed", "<kbd>", "</kbd>"]
    ],
    "v-math": [
        ["在线公式设计", CState.none, "", "www.latexlive.com", "nav_web", "https://www.latexlive.com"],
        ["常用符号", CState.collapsed, "", ""],
        ["希腊字母", CState.collapsed, "", ""],
        ["运算符", CState.collapsed, "", ""],
    ],
    "v-emoji": [
        ["在线表情选择", CState.none, "", "www.webfx.com/tools/emoji-cheat-sheet", "nav_web", "https://www.webfx.com/tools/emoji-cheat-sheet"],
        ["人物", CState.collapsed, "", ""],
        ["自然", CState.collapsed, "", ""],
        ["地点", CState.collapsed, "", ""],
        ["符号", CState.collapsed, "", ""]
    ],
    "v-flow": [
        ["标准流程图", CState.none, "flow", "", "add_nxt_fixed", `\`\`\`flow
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
        ["标准横向流程图", CState.none, "flow", "", "add_nxt_fixed", `\`\`\`flow
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
        ["时序图", CState.none, "seq", "", "add_nxt_fixed", `\`\`\`sequence
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
        ["甘特图", CState.none, "gantt", "", "add_nxt_fixed", `\`\`\`mermaid
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
export const ALL_ITEMS_2 = {
    "常用符号": [
        ["乘法", CState.none, "1-1", "\\times", "add_cur_fixed", "\\times "],
        ["除法", CState.none, "1-2", "\\div", "add_cur_fixed", "\\div "],
        ["正负号", CState.none, "1-3", "\\pm", "add_cur_fixed", "\\pm "],
        ["负正号", CState.none, "1-4", "\\mp", "add_cur_fixed", "\\mp "],
        ["交集", CState.none, "1-5", "\\cup", "add_cur_fixed", "\\cup "],
        ["并集", CState.none, "1-6", "\\div", "add_cur_fixed", "\\cap "],
        ["大于等于", CState.none, "1-7", "\\ge", "add_cur_fixed", "\\ge "],
        ["小于等于", CState.none, "1-8", "\\le", "add_cur_fixed", "\\le "],
        ["属于", CState.none, "1-9", "\\in", "add_cur_fixed", "\\in "],
        ["所有", CState.none, "1-10", "\\forall", "add_cur_fixed", "\\forall "],
        ["存在", CState.none, "1-11", "\\exists", "add_cur_fixed", "\\exists "]
    ],
    "希腊字母": [
        ["α", CState.none, "", "\\alpha", "add_cur_fixed", "\\alpha "],
        ["β", CState.none, "", "\\beta", "add_cur_fixed", "\\beta "],
        ["γ", CState.none, "", "\\gamma", "add_cur_fixed", "\\gamma "],
        ["δ", CState.none, "", "\\delta", "add_cur_fixed", "\\delta "],
        ["ε", CState.none, "", "\\epsilon", "add_cur_fixed", "\\epsilon "],
        ["ζ", CState.none, "", "\\zeta", "add_cur_fixed", "\\zeta "],
        ["η", CState.none, "", "\\eta", "add_cur_fixed", "\\eta "],
        ["θ", CState.none, "", "\\theta", "add_cur_fixed", "\\theta "],
        ["λ", CState.none, "", "\\lambda", "add_cur_fixed", "\\lambda "],
        ["μ", CState.none, "", "\\mu", "add_cur_fixed", "\\mu "],
        ["π", CState.none, "", "\\pi", "add_cur_fixed", "\\pi "],
        ["ρ", CState.none, "", "\\rho", "add_cur_fixed", "\\rho "],
        ["σ", CState.none, "", "\\sigma", "add_cur_fixed", "\\sigma "],
        ["τ", CState.none, "", "\\tau", "add_cur_fixed", "\\tau "],
        ["φ", CState.none, "", "\\varphi", "add_cur_fixed", "\\varphi "],
        ["ψ", CState.none, "", "\\psi", "add_cur_fixed", "\\psi "],
        ["ω", CState.none, "", "\\omega", "add_cur_fixed", "\\omega "]
    ],
    "运算符": [
        ["分数", CState.none, "2-1", "\\frac{a}{b}", "add_cur_fixed", "\\frac{}{} "],
        ["微分", CState.none, "2-2", "\\mathrm{d}t", "add_cur_fixed", "\\mathrm{d}t "],
        ["偏微分", CState.none, "2-3", "\\partial t", "add_cur_fixed", "\\partial t "],
        ["Nabla算子", CState.none, "2-4", "\\nabla \\psi", "add_cur_fixed", "\\nabla \\psi "],
        ["根号", CState.none, "2-5", "\\sqrt[]{x}", "add_cur_fixed", "\\sqrt[]{} "],
        ["积分", CState.none, "2-6", "\\int_{a}^{b}", "add_cur_fixed", "\\int_{}^{} "],
        ["二重积分", CState.none, "2-7", "\\iint_{a}^{b}", "add_cur_fixed", "\\iint_{}^{} "],
        ["求和", CState.none, "2-8", "\\sum_{a}^{b}", "add_cur_fixed", "\\sum_{}^{} "],
        ["求积", CState.none, "2-9", "\\prod_{a}^{b}", "add_cur_fixed", "\\prod_{}^{} "],
        ["矩阵", CState.none, "2-10", "\\begin{bmatrix}a&b\\\\c&d\\end{bmatrix}", "add_cur_fixed", "\n\\begin{bmatrix}\n  &  \\\\\n  &  \n\\end{bmatrix}\n"],
        ["行列式", CState.none, "2-11", "\\begin{vmatrix}a&b\\\\c&d\\end{vmatrix}", "add_cur_fixed", "\n\\begin{vmatrix}\n  &  \\\\\n  &  \n\\end{vmatrix}\n"],
        ["分段函数", CState.none, "2-12", "\\begin{cases}...\\\\...\\end{cases}", "add_cur_fixed", "\\begin{cases}\n  \\\\\n  \n\\end{cases}"]
    ],
    "人物": [
        ["😁", CState.none, "", ":smile:", "add_cur_fixed", ":smile: "],
        ["😆", CState.none, "", ":laughing:", "add_cur_fixed", ":laughing: "],
        ["😭", CState.none, "", ":sob:", "add_cur_fixed", ":sob: "],
        ["😪", CState.none, "", ":sleepy:", "add_cur_fixed", ":sleepy: "],
        ["😡", CState.none, "", ":rage:", "add_cur_fixed", ":rage: "],
        ["👍", CState.none, "", ":+1:", "add_cur_fixed", ":+1: "],
        ["👎", CState.none, "", ":-1:", "add_cur_fixed", ":-1: "],
        ["💪", CState.none, "", ":muscle:", "add_cur_fixed", ":muscle: "]
    ],
    "自然": [
        ["☀", CState.none, "", ":sunny:", "add_cur_fixed", ":sunny: "],
        ["☁", CState.none, "", ":cloud:", "add_cur_fixed", ":cloud: "],
        ["🌧", CState.none, "", ":umbrella:", "add_cur_fixed", ":umbrella: "],
        ["🌨", CState.none, "", ":snowflake:", "add_cur_fixed", ":snowflake: "],
        ["⚡", CState.none, "", ":zap:", "add_cur_fixed", ":zap: "],
        ["🐶", CState.none, "", ":dog:", "add_cur_fixed", ":dog: "],
        ["🐱", CState.none, "", ":cat:", "add_cur_fixed", ":cat: "],
        ["🐸", CState.none, "", ":frog:", "add_cur_fixed", ":frog: "],
        ["🐷", CState.none, "", ":pig:", "add_cur_fixed", ":pig: "]
    ],
    "地点": [
        ["🏘", CState.none, "", ":house:", "add_cur_fixed", ":house: "],
        ["🏥", CState.none, "", ":hospital:", "add_cur_fixed", ":hospital: "],
        ["💒", CState.none, "", ":school:", "add_cur_fixed", ":school: "],
        ["🏙", CState.none, "", ":office:", "add_cur_fixed", ":office: "],
        ["🕍", CState.none, "", ":church:", "add_cur_fixed", ":church: "]
    ],
    "符号": [
        ["✔", CState.none, "", ":heavy_check_mark:", "add_cur_fixed", ":heavy_check_mark: "],
        ["❌", CState.none, "", ":x:", "add_cur_fixed", ":x: "],
        ["⭕", CState.none, "", ":o:", "add_cur_fixed", ":o: "],
        ["™", CState.none, "", ":tm:", "add_cur_fixed", ":tm: "],
        ["❤", CState.none, "", ":heart:", "add_cur_fixed", ":heart: "]
    ]
};

// export const ALL_KEYS = Object.keys(ALL_ITEMS).map(item => <keyof typeof ALL_ITEMS>item);
export const ALL_KEYS = <(keyof typeof ALL_ITEMS)[]>Object.keys(ALL_ITEMS);