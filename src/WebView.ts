import { ExtensionContext, ViewColumn, WebviewPanel, window } from 'vscode';

// 存储url和WebviewPanel的键值对
var webViewMap = new Map<string, WebviewPanel>([]);

/**
 * 创建一个网页面板
 * @param viewColumn 
 * @param label 标题
 * @param url 链接
 * @returns WebviewPanel
 */
export function createWebView(viewColumn: ViewColumn, label: string, url: string): WebviewPanel{
    let webViewPanel: WebviewPanel;
    // 判断是否已经存在该网页面板
    if(!webViewMap.has(url)){
        webViewPanel = window.createWebviewPanel(
            'webView',
            label,
            viewColumn,
            {
                retainContextWhenHidden: true,  // 是否保持webview面板的内容,即使面板不再可见
                enableScripts: true             // html页是否可以使用Scripts
            }
        );
        // 面板嵌入html
        webViewPanel.webview.html = getIframeHtml(url);
        // 添加进webViewMap
        webViewMap.set(url, webViewPanel);
    }else{
        // 获取该webViewPanel并显示
        webViewPanel = <WebviewPanel>webViewMap.get(url);
        webViewPanel.reveal();
    }
    // onDidDispose: 关闭该面板时
    webViewPanel.onDidDispose(() => {
        webViewMap.delete(url);
    });
    return webViewPanel;
}

// 这个方法没什么了，就是一个 最简单的嵌入 iframe 的 html 页面
function getIframeHtml(url: string): string {
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