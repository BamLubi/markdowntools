// 本文件保存所有需要插入的组件信息

// key为视图id
// 每一项元组代表
// [label, CState, icon, description, command, args]

// 定义树视图中每一个子项是否存在子项，并定义其折叠状态
export enum CState {
    Collapsed, // 折叠状态
    Expanded, // 展开状态,注意无限展开
    None // 无子项
}

// 一级
export const ALL_ITEMS = {
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
export const ALL_ITEMS_2 = {
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
}

// export const ALL_KEYS = Object.keys(ALL_ITEMS).map(item => <keyof typeof ALL_ITEMS>item);
export const ALL_KEYS = <(keyof typeof ALL_ITEMS)[]>Object.keys(ALL_ITEMS);