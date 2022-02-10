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
	let st_line: number = <number>(vscode.window.activeTextEditor?.selection.start.line);
	let st_character: number = <number>(vscode.window.activeTextEditor?.selection.start.character);
	let ed_line: number = <number>(vscode.window.activeTextEditor?.selection.end.line);
	let ed_character: number = <number>(vscode.window.activeTextEditor?.selection.end.character);

	console.log("添加文字-start", st_line, st_character);
	console.log("添加文字-end", ed_line, ed_character);

	return [st_line, ed_line, st_character, ed_character];
}

// add_both_fixed
commandList.push(
	// 添加在选中文字的两边，光标位置不动
	vscode.commands.registerCommand("add_both_fixed", (label, ...content) => {
		vscode.window.activeTextEditor?.edit((editBuilder) => {
			let [st_line, ed_line, st_character, ed_character] = getTextEditorPosition();

			editBuilder.insert(new vscode.Position(st_line, st_character), content[0]);
			editBuilder.insert(new vscode.Position(ed_line, ed_character), content[1]);
		});
	})
);

// add_front_fixed
commandList.push(
	// 添加该行的前面，光标位置不动
	vscode.commands.registerCommand("add_front_fixed", (label, content) => {
		vscode.window.activeTextEditor?.edit((editBuilder) => {
			let [st_line, ...rest] = getTextEditorPosition();

			editBuilder.insert(new vscode.Position(st_line, 0), content);
		});
	})
);

// add_cur_fixed
commandList.push(
	// 添加在当前位置，光标位置不动
	vscode.commands.registerCommand("add_cur_fixed", (label, content) => {
		vscode.window.activeTextEditor?.edit((editBuilder) => {
			let [st_line, , st_character,] = getTextEditorPosition();

			editBuilder.insert(new vscode.Position(st_line, st_character), content);
		});
	})
);

// add_nxt_fixed
commandList.push(
	// 添加下一行开头，光标位置不动
	vscode.commands.registerCommand("add_nxt_fixed", (label, content) => {
		vscode.window.activeTextEditor?.edit((editBuilder) => {
			let [st_line, ...rest] = getTextEditorPosition();

			editBuilder.insert(new vscode.Position(st_line + 1, 0), content);
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
			if (res != undefined && res.length != 0) {
				let uri = res[0].path;
				uri = uri.substring(1, uri.length);
				vscode.window.activeTextEditor?.edit((editBuilder) => {
					let [st_line, ...rest] = getTextEditorPosition();

					editBuilder.insert(new vscode.Position(st_line + 1, 0), "![title](" + uri + ")");
				});
			}
		})
	})
);

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
			if (res == undefined) throw "no input";
			else {
				row = isNaN(Number(res)) || res == "" ? row : Number(res);
				return vscode.window.showInputBox({
					placeHolder: '请输入表格的列数,默认为2'
				})
			}
		}).then(res => {
			if (res == undefined) throw "no input";
			else {
				col = isNaN(Number(res)) || res == "" ? col : Number(res);
				return vscode.window.showInputBox({
					placeHolder: '请输入表格对齐方式',
					prompt: '0:居中对齐(默认),1:左对齐,2:右对齐'
				})
			}
		}).then(res => {
			align = isNaN(Number(res)) ? align : Number(res);
			// 检查行列必须大于0
			if (row <= 0 || col <= 0 || align < 0 || align > 2) throw "input error";
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
			let alignStr: string = align == 0 ? ":--:" : align == 1 ? ":---" : "---:";
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
			// 插入视图
			vscode.window.activeTextEditor?.edit((editBuilder) => {
				let [st_line, ...rest] = getTextEditorPosition();

				editBuilder.insert(new vscode.Position(st_line + 1, 0), content);
			});
		})
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
	}))
	return commandList;
}
