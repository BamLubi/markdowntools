import * as vscode from 'vscode';
import { initTreeViewItem } from './TreeViewProvider';
import { commandList, initWebViewCommand} from './CommandProvider';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "MarkdownTools" is now active!');

	// 注册命令列表
	context.subscriptions.push(...commandList);

	// 初始化树视图
	initTreeViewItem();

	// 初始化网页
	let webViewList = initWebViewCommand();
	context.subscriptions.push(...webViewList);
}

// this method is called when your extension is deactivated
export function deactivate() {}
