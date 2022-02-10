(()=>{"use strict";var e={784:(e,d,i)=>{Object.defineProperty(d,"__esModule",{value:!0}),d.initWebViewCommand=d.commandList=void 0;const t=i(496),n=i(42);let o=[];function a(){let e=t.window.activeTextEditor?.selection.start.line,d=t.window.activeTextEditor?.selection.start.character,i=t.window.activeTextEditor?.selection.end.line,n=t.window.activeTextEditor?.selection.end.character;return console.log("添加文字-start",e,d),console.log("添加文字-end",i,n),[e,i,d,n]}d.commandList=o,o.push(t.commands.registerCommand("add_both_fixed",((e,...d)=>{t.window.activeTextEditor?.edit((e=>{let[i,n,o,r]=a();e.insert(new t.Position(i,o),d[0]),e.insert(new t.Position(n,r),d[1])}))}))),o.push(t.commands.registerCommand("add_front_fixed",((e,d)=>{t.window.activeTextEditor?.edit((e=>{let[i,...n]=a();e.insert(new t.Position(i,0),d)}))}))),o.push(t.commands.registerCommand("add_cur_fixed",((e,d)=>{t.window.activeTextEditor?.edit((e=>{let[i,,n]=a();e.insert(new t.Position(i,n),d)}))}))),o.push(t.commands.registerCommand("add_nxt_fixed",((e,d)=>{t.window.activeTextEditor?.edit((e=>{let[i,...n]=a();e.insert(new t.Position(i+1,0),d)}))}))),o.push(t.commands.registerCommand("add_image",((e,d)=>{t.window.showOpenDialog({canSelectFiles:!0,canSelectMany:!1,canSelectFolders:!1}).then((e=>{if(null!=e&&0!=e.length){let d=e[0].path;d=d.substring(1,d.length),t.window.activeTextEditor?.edit((e=>{let[i,...n]=a();e.insert(new t.Position(i+1,0),"![title]("+d+")")}))}}))}))),o.push(t.commands.registerCommand("add_table",((e,d)=>{let i=2,n=2,o=0;t.window.showInputBox({placeHolder:"请输入表格的行数,默认为2"}).then((e=>{if(null==e)throw"no input";return i=isNaN(Number(e))||""==e?i:Number(e),t.window.showInputBox({placeHolder:"请输入表格的列数,默认为2"})})).then((e=>{if(null==e)throw"no input";return n=isNaN(Number(e))||""==e?n:Number(e),t.window.showInputBox({placeHolder:"请输入表格对齐方式",prompt:"0:居中对齐(默认),1:左对齐,2:右对齐"})})).then((e=>{if(o=isNaN(Number(e))?o:Number(e),i<=0||n<=0||o<0||o>2)throw"input error";let d="";d+="|";for(let e=0;e<n;e++)d+="    |";d+="\n",d+="|";let r=0==o?":--:":1==o?":---":"---:";for(let e=0;e<n;e++)d+=r+"|";d+="\n";for(let e=0;e<i-1;e++){d+="|";for(let e=0;e<n;e++)d+="    |";d+="\n"}t.window.activeTextEditor?.edit((e=>{let[i,...n]=a();e.insert(new t.Position(i+1,0),d)}))}))}))),d.initWebViewCommand=function(){let e=[];return e.push(t.commands.registerCommand("nav_web",((d,i)=>{const o=(0,n.createWebView)(t.ViewColumn.Active,d,i);e.push(o)}))),e}},331:(e,d)=>{var i;Object.defineProperty(d,"__esModule",{value:!0}),d.ALL_KEYS=d.ALL_ITEMS_2=d.ALL_ITEMS=d.CState=void 0,function(e){e[e.Collapsed=0]="Collapsed",e[e.Expanded=1]="Expanded",e[e.None=2]="None"}(i=d.CState||(d.CState={})),d.ALL_ITEMS={"v-common":[["一级标题",i.None,"h1","#","add_front_fixed","# "],["二级标题",i.None,"h2","##","add_front_fixed","## "],["三级标题",i.None,"h3","###","add_front_fixed","### "],["粗体",i.None,"B","** **","add_both_fixed","**","**"],["斜体",i.None,"I","* *","add_both_fixed","*","*"],["有序列表",i.None,"youxu","1. ","add_front_fixed","1. "],["无序列表",i.None,"wuxu","- ","add_front_fixed","- "],["待办",i.None,"todo","- [ ] ","add_front_fixed","- [ ] "],["超链接",i.None,"link","[ ]( )","add_both_fixed","[","](uri)"]],"v-insert":[["表格",i.None,"table","| |:--:| |","add_table","| |:--:| |"],["代码",i.None,"code","``` ```","add_nxt_fixed","\n```\n\n```"],["引用",i.None,"ref","> ","add_front_fixed","> "],["链接引用",i.None,"linkref","[ ]: ","add_both_fixed","[","]:uri"],["脚注",i.None,"foot","[^ ]: ","add_both_fixed","[^","]:description"],["公式",i.None,"_math","$$ $$","add_both_fixed","\n$$\n\n$$\n"],["内联公式",i.None,"math","$ $","add_cur_fixed","$ $"],["目录",i.None,"toc","[TOC]","add_front_fixed","[TOC]\n\n"],["图片",i.None,"image","![ ]( )","add_image","![title](uri)"],["分割线",i.None,"divider","> ","add_nxt_fixed","\n-----\n\n"]],"v-math":[["在线公式设计",i.None,"","www.latexlive.com","nav_web","https://www.latexlive.com"],["常用符号",i.Collapsed,"",""],["希腊字母",i.Collapsed,"",""],["运算符",i.Collapsed,"",""]],"v-emoji":[["在线表情选择",i.None,"","www.webfx.com/tools/emoji-cheat-sheet","nav_web","https://www.webfx.com/tools/emoji-cheat-sheet"],["人物",i.Collapsed,"",""],["自然",i.Collapsed,"",""],["地点",i.Collapsed,"",""],["符号",i.Collapsed,"",""]]},d.ALL_ITEMS_2={常用符号:[["乘法",i.None,"1-1","\\times","add_cur_fixed","\\times "],["除法",i.None,"1-2","\\div","add_cur_fixed","\\div "],["正负号",i.None,"1-3","\\pm","add_cur_fixed","\\pm "],["负正号",i.None,"1-4","\\mp","add_cur_fixed","\\mp "],["交集",i.None,"1-5","\\cup","add_cur_fixed","\\cup "],["并集",i.None,"1-6","\\div","add_cur_fixed","\\cap "],["大于等于",i.None,"1-7","\\ge","add_cur_fixed","\\ge "],["小于等于",i.None,"1-8","\\le","add_cur_fixed","\\le "],["属于",i.None,"1-9","\\in","add_cur_fixed","\\in "],["所有",i.None,"1-10","\\forall","add_cur_fixed","\\forall "],["存在",i.None,"1-11","\\exists","add_cur_fixed","\\exists "]],希腊字母:[["α",i.None,"","\\alpha","add_cur_fixed","\\alpha "],["β",i.None,"","\\beta","add_cur_fixed","\\beta "],["γ",i.None,"","\\gamma","add_cur_fixed","\\gamma "],["δ",i.None,"","\\delta","add_cur_fixed","\\delta "],["ε",i.None,"","\\epsilon","add_cur_fixed","\\epsilon "],["ζ",i.None,"","\\zeta","add_cur_fixed","\\zeta "],["η",i.None,"","\\eta","add_cur_fixed","\\eta "],["θ",i.None,"","\\theta","add_cur_fixed","\\theta "],["λ",i.None,"","\\lambda","add_cur_fixed","\\lambda "],["μ",i.None,"","\\mu","add_cur_fixed","\\mu "],["π",i.None,"","\\pi","add_cur_fixed","\\pi "],["ρ",i.None,"","\\rho","add_cur_fixed","\\rho "],["σ",i.None,"","\\sigma","add_cur_fixed","\\sigma "],["τ",i.None,"","\\tau","add_cur_fixed","\\tau "],["φ",i.None,"","\\varphi","add_cur_fixed","\\varphi "],["ψ",i.None,"","\\psi","add_cur_fixed","\\psi "],["ω",i.None,"","\\omega","add_cur_fixed","\\omega "]],运算符:[["分数",i.None,"2-1","\\frac{a}{b}","add_cur_fixed","\\frac{}{} "],["微分",i.None,"2-2","\\mathrm{d}t","add_cur_fixed","\\mathrm{d}t "],["偏微分",i.None,"2-3","\\partial t","add_cur_fixed","\\partial t "],["Nabla算子",i.None,"2-4","\\nabla \\psi","add_cur_fixed","\\nabla \\psi "],["根号",i.None,"2-5","\\sqrt[]{x}","add_cur_fixed","\\sqrt[]{} "],["积分",i.None,"2-6","\\int_{a}^{b}","add_cur_fixed","\\int_{}^{} "],["二重积分",i.None,"2-7","\\iint_{a}^{b}","add_cur_fixed","\\iint_{}^{} "],["求和",i.None,"2-8","\\sum_{a}^{b}","add_cur_fixed","\\sum_{}^{} "],["求积",i.None,"2-9","\\prod_{a}^{b}","add_cur_fixed","\\prod_{}^{} "],["矩阵",i.None,"2-10","\\begin{bmatrix}a&b\\\\c&d\\end{bmatrix}","add_cur_fixed","\n\\begin{bmatrix}\n  &  \\\\\n  &  \n\\end{bmatrix}\n"],["行列式",i.None,"2-11","\\begin{vmatrix}a&b\\\\c&d\\end{vmatrix}","add_cur_fixed","\n\\begin{vmatrix}\n  &  \\\\\n  &  \n\\end{vmatrix}\n"],["分段函数",i.None,"2-12","\\begin{cases}...\\\\...\\end{cases}","add_cur_fixed","\\begin{cases}\n  \\\\\n  \n\\end{cases}"]],人物:[["😁",i.None,"",":smile:","add_cur_fixed",":smile: "],["😆",i.None,"",":laughing:","add_cur_fixed",":laughing: "],["😭",i.None,"",":sob:","add_cur_fixed",":sob: "],["😪",i.None,"",":sleepy:","add_cur_fixed",":sleepy: "],["😡",i.None,"",":rage:","add_cur_fixed",":rage: "],["👍",i.None,"",":+1:","add_cur_fixed",":+1: "],["👎",i.None,"",":-1:","add_cur_fixed",":-1: "],["💪",i.None,"",":muscle:","add_cur_fixed",":muscle: "]],自然:[["☀",i.None,"",":sunny:","add_cur_fixed",":sunny: "],["☁",i.None,"",":cloud:","add_cur_fixed",":cloud: "],["🌧",i.None,"",":umbrella:","add_cur_fixed",":umbrella: "],["🌨",i.None,"",":snowflake:","add_cur_fixed",":snowflake: "],["⚡",i.None,"",":zap:","add_cur_fixed",":zap: "],["🐶",i.None,"",":dog:","add_cur_fixed",":dog: "],["🐱",i.None,"",":cat:","add_cur_fixed",":cat: "],["🐸",i.None,"",":frog:","add_cur_fixed",":frog: "],["🐷",i.None,"",":pig:","add_cur_fixed",":pig: "]],地点:[["🏘",i.None,"",":house:","add_cur_fixed",":house: "],["🏥",i.None,"",":hospital:","add_cur_fixed",":hospital: "],["💒",i.None,"",":school:","add_cur_fixed",":school: "],["🏙",i.None,"",":office:","add_cur_fixed",":office: "],["🕍",i.None,"",":church:","add_cur_fixed",":church: "]],符号:[["✔",i.None,"",":heavy_check_mark:","add_cur_fixed",":heavy_check_mark: "],["❌",i.None,"",":x:","add_cur_fixed",":x: "],["⭕",i.None,"",":o:","add_cur_fixed",":o: "],["™",i.None,"",":tm:","add_cur_fixed",":tm: "],["❤",i.None,"",":heart:","add_cur_fixed",":heart: "]]},d.ALL_KEYS=Object.keys(d.ALL_ITEMS)},446:(e,d,i)=>{Object.defineProperty(d,"__esModule",{value:!0}),d.initTreeViewItem=void 0;const t=i(496),n=i(17),o=i(331);class a extends t.TreeItem{constructor(e,d){if(super(d[0]),this.children=[],this.label=d[0],this.description=d[3],this.iconPath=""==d[2]?void 0:{light:t.Uri.file((0,n.join)(__filename,"..","..","dist","assets",e,d[2]+"-light.svg")),dark:t.Uri.file((0,n.join)(__filename,"..","..","dist","assets",e,d[2]+"-dark.svg"))},d[1]==o.CState.None){let e;[,,,,,...e]=d,this.collapsibleState=t.TreeItemCollapsibleState.None,this.command={title:this.label,command:d[4],tooltip:this.label,arguments:[this.label,...e]}}else this.collapsibleState=d[1]==o.CState.Collapsed?t.TreeItemCollapsibleState.Collapsed:t.TreeItemCollapsibleState.Expanded,this.command={title:this.label,command:"",tooltip:this.label},this.children=o.ALL_ITEMS_2[this.label]}}class r{constructor(e,d){this.category=e,this.ITEMS=d}getTreeItem(e){return e}getChildren(e){return e?e.children.map((e=>new a(this.category,e))):this.ITEMS.map((e=>new a(this.category,e)))}}d.initTreeViewItem=function(){o.ALL_KEYS.forEach((e=>{t.window.registerTreeDataProvider(e,new r(e.toString(),o.ALL_ITEMS[e]))}))}},42:(e,d,i)=>{Object.defineProperty(d,"__esModule",{value:!0}),d.createWebView=void 0;const t=i(496);var n=new Map([]);d.createWebView=function(e,d,i){let o;return n.has(i)?(o=n.get(i),o.reveal()):(o=t.window.createWebviewPanel("webView",d,e,{retainContextWhenHidden:!0,enableScripts:!0}),o.webview.html=function(e){return`\n    <!DOCTYPE html>\n    <html lang="en">\n        <head>\n        <meta charset="utf-8" />\n        <meta name="viewport" content="width=device-width, initial-scale=1" />\n        <style>\n            html,\n            body {\n                margin: 0 !important;\n                padding: 0 !important;\n                width: 100%;\n                height: 100%;\n            }\n            .iframeDiv {\n                width: 100%;\n                height: 100%;\n            }\n        </style>\n        </head>\n\n        <body>\n        <iframe id='iframe1' class="iframeDiv" src="${e}" scrolling="auto"></iframe>\n        </body>\n    </html>\n    `}(i),n.set(i,o)),o.onDidDispose((()=>{n.delete(i)})),o}},496:e=>{e.exports=require("vscode")},17:e=>{e.exports=require("path")}},d={};function i(t){var n=d[t];if(void 0!==n)return n.exports;var o=d[t]={exports:{}};return e[t](o,o.exports,i),o.exports}var t={};(()=>{var e=t;Object.defineProperty(e,"__esModule",{value:!0}),e.deactivate=e.activate=void 0;const d=i(446),n=i(784);e.activate=function(e){console.log('Congratulations, your extension "MarkdownTools" is now active!'),e.subscriptions.push(...n.commandList),(0,d.initTreeViewItem)();let i=(0,n.initWebViewCommand)();e.subscriptions.push(...i)},e.deactivate=function(){}})(),module.exports=t})();