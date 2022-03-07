// TODO: md预览美化
// TODO: ts代码修改以符合ESLint规格
// 本文件存储插件中的命令操作
import { isNumber } from "util";
import * as vscode from "vscode";
import { createWebView } from "./WebView";

let commandList: vscode.Disposable[] = [];

/**
 * 获取当前光标选中的行、列
 * @returns [开始行, 结束行, 开始列, 结束列]
 */
function getTextEditorPosition(): number[] {
	let stLine: number = <number>(vscode.window.activeTextEditor?.selection.start.line);
	let stCharacter: number = <number>(vscode.window.activeTextEditor?.selection.start.character);
	let edLine: number = <number>(vscode.window.activeTextEditor?.selection.end.line);
	let edCharacter: number = <number>(vscode.window.activeTextEditor?.selection.end.character);

	// console.log("添加文字-start", stLine, stCharacter);
	// console.log("添加文字-end", edLine, edCharacter);

	return [stLine, edLine, stCharacter, edCharacter];
}

// add_both_fixed
commandList.push(
	// 添加在选中文字的两边，光标位置不动
	vscode.commands.registerCommand("add_both_fixed", (label, contentL, contentR) => {
		// 快捷键匹配
		if(label==="ctrl_b"){
			contentL = contentR = "**";
		}else if(label==="ctrl_i"){
			contentL = contentR = "*";
		}
		vscode.window.activeTextEditor?.edit((editBuilder) => {
			let [stLine, edLine, stCharacter, edCharacter] = getTextEditorPosition();

			editBuilder.insert(new vscode.Position(stLine, stCharacter), contentL);
			editBuilder.insert(new vscode.Position(edLine, edCharacter), contentR);
		});
	})
);

// add_front_fixed
commandList.push(
	// 添加该行的前面，光标位置不动
	vscode.commands.registerCommand("add_front_fixed", (label, content) => {
		// 快捷键匹配
		if(label==="ctrl_1"){
			content = "# ";
		}else if(label==="ctrl_2"){
			content = "## ";
		}else if(label==="ctrl_3"){
			content = "### ";
		}
		vscode.window.activeTextEditor?.edit((editBuilder) => {
			let [stLine, ...rest] = getTextEditorPosition();

			editBuilder.insert(new vscode.Position(stLine, 0), content);
		});
	})
);

// add_cur_fixed
commandList.push(
	// 添加在当前位置，光标位置不动
	vscode.commands.registerCommand("add_cur_fixed", (label, content) => {
		vscode.window.activeTextEditor?.edit((editBuilder) => {
			let [stLine, , stCharacter,] = getTextEditorPosition();

			editBuilder.insert(new vscode.Position(stLine, stCharacter), content);
		});
	})
);

// add_nxt_fixed
commandList.push(
	// 添加下一行开头，光标位置不动
	vscode.commands.registerCommand("add_nxt_fixed", (label, content) => {
		vscode.window.activeTextEditor?.edit((editBuilder) => {
			let [stLine, ...rest] = getTextEditorPosition();

			editBuilder.insert(new vscode.Position(stLine + 1, 0), content);
		});
	})
);

// add_image
commandList.push(
	// 添加图片
	vscode.commands.registerCommand("add_image", (label, content) => {
		vscode.window.showOpenDialog({
			canSelectFiles: true,
			canSelectMany: false,
			canSelectFolders: false
		}).then(res => {
			if (res !== undefined && res.length !== 0) {
				let uri = res[0].path;
				uri = uri.substring(1, uri.length);
				vscode.window.activeTextEditor?.edit((editBuilder) => {
					let [stLine, ...rest] = getTextEditorPosition();

					editBuilder.insert(new vscode.Position(stLine + 1, 0), "![title](" + uri + ")");
				});
			}
		});
	})
);

/**
 * 制作table字符串
 * @param row 行数
 * @param col 列数
 * @param align 对齐方式 0:居中,1:居左,2:居右
 * @returns table字符串
 */
function makeTable(row: number, col: number, align: number): string {
	// 构造插入的内容,一个格子4个空
	let content: string = "";
	// 插入首行
	content += "|";
	for (let i = 0; i < col; i++) {
		content += "    |";
	}
	content += "\n";
	// 插入对齐行
	content += "|";
	let alignStr: string = align === 0 ? ":--:" : align === 1 ? ":---" : "---:";
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
			if (res === undefined) {throw new Error("no input");}
			else {
				row = isNaN(Number(res)) || res === "" ? row : Number(res);
				return vscode.window.showInputBox({
					placeHolder: '请输入表格的列数,默认为2'
				});
			}
		}).then(res => {
			if (res === undefined) {throw new Error("no input");}
			else {
				col = isNaN(Number(res)) || res === "" ? col : Number(res);
				return vscode.window.showInputBox({
					placeHolder: '请输入表格对齐方式',
					prompt: '0:居中对齐(默认),1:左对齐,2:右对齐'
				});
			}
		}).then(res => {
			align = isNaN(Number(res)) ? align : Number(res);
			// 检查行列必须大于0
			if (row <= 0 || col <= 0 || align < 0 || align > 2) {throw new Error("input error");}
			// 插入视图
			vscode.window.activeTextEditor?.edit((editBuilder) => {
				let [stLine, ...rest] = getTextEditorPosition();

				editBuilder.insert(new vscode.Position(stLine + 1, 0), makeTable(row, col, align));
			});
		});
	})
);

// add_badge
commandList.push(
	// 添加徽章
	vscode.commands.registerCommand("add_badge", (label, content) => {
		let _label: string = "label";
		let _msg: string = "message";
		let _style: string = "brightgreen";
		// 用户输入
		vscode.window.showInputBox({
			placeHolder: '请输入label信息,如"下载量","访问量"...,默认为"label"'
		}).then(res => {
			if (res === undefined) {throw new Error("no input");}
			else {
				_label = res === "" ? _label : res;
				return vscode.window.showInputBox({
					placeHolder: '请输入message信息,如"10k"...,默认为"message"'
				});
			}
		}).then(res => {
			if (res === undefined) {throw new Error("no input");}
			else {
				_msg = res === "" ? _msg : res;
				return vscode.window.showQuickPick([
					'brightgreen', 'yellow', 'orange', 'red', 'blue', 'success', 'important', 'critical', 'informational', 'blueviolet'
				], {
					canPickMany: false,
					placeHolder: '请选择颜色'
				});
			}
		}).then(res => {
			_style = res === undefined ? _style : res;
			// 构造内容
			let content: string = "![](https://img.shields.io/badge/" + _label + "-" + _msg + "-" + _style + ")";

			// 插入视图
			vscode.window.activeTextEditor?.edit((editBuilder) => {
				let [stLine, ...rest] = getTextEditorPosition();

				editBuilder.insert(new vscode.Position(stLine + 1, 0), content);
			});
		});
	})
);

// TODO: md文件导出成pdf或html格式
// markdowntools.share
commandList.push(
	// 添加徽章
	vscode.commands.registerCommand("markdowntools.share", ( ) => {
		console.log("分享");
	})
);

export { commandList };

/**
 * 网页跳转，内置浏览器
 * @param context 
 */
export function initWebViewCommand(): vscode.Disposable[] {
	let commandList: vscode.Disposable[] = [];
	commandList.push(vscode.commands.registerCommand("nav_web", (label, url) => {
		const webView = createWebView(vscode.ViewColumn.Active, label, url);
		commandList.push(webView);
	}));
	return commandList;
}
