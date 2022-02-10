// 本文件确定侧边视图容器的显示
import { TreeItem, TreeItemCollapsibleState, TreeDataProvider, Uri, window, Event, ProviderResult } from 'vscode';
import { join } from 'path';
import { CState, ALL_ITEMS, ALL_KEYS, ALL_ITEMS_2 } from './ItemProvider';

/**
 * 单项节点的TreeItem类
 */
class TreeItemNode extends TreeItem {

    public children: (string | CState)[][] = [];

    constructor(category: string, item: (string | CState)[]) {
        super(<string>item[0]);

        // 共同属性
        this.label = <string>item[0];
        this.description = <string>item[3];
        this.iconPath = <string>item[2] == "" ? undefined :{
            light: Uri.file(join(__filename, '..', '..', 'dist', "assets", category, <string>item[2] + "-light.svg")),
            dark: Uri.file(join(__filename, '..', '..', 'dist', "assets", category, <string>item[2] + "-dark.svg"))
        };

        // 判断是否存在子项目
        if (<CState>item[1] == CState.None) {
            // 不存在子项目
            // demo: ["一级标题", CState.None, "1.svg", "#", "add_front_fixed", "# "]
            let args: (string | CState)[];
            [, , , , , ...args] = item;
            this.collapsibleState = TreeItemCollapsibleState.None;
            this.command = {
                title: this.label,
                command: <string>item[4],
                tooltip: this.label, // 鼠标覆盖时的提示框
                arguments: [this.label, ...args as string[]]
            };
        } else {
            // 存在子项目
            // demo: ["粗体", "1.svg", "**content**", CState.Collapsed]
            this.collapsibleState = <CState>item[1] == CState.Collapsed ? TreeItemCollapsibleState.Collapsed : TreeItemCollapsibleState.Expanded;
            this.command = {
                title: this.label,
                command: '',
                tooltip: this.label
            };
            this.children = ALL_ITEMS_2[this.label as keyof typeof ALL_ITEMS_2];
        }
    }
}

/**
 * 用于注册的树视图TreeDataProvider类
 */
class TreeViewProvider implements TreeDataProvider<TreeItemNode>{

    constructor(public readonly category: string, public readonly ITEMS: (string | CState)[][]) { }

    onDidChangeTreeData?: Event<TreeItemNode | null | undefined> | undefined;

    // 获取树视图中的每一项 item,所以要返回 element
    getTreeItem(element: TreeItemNode): TreeItem | Thenable<TreeItem> { return element; }

    // 给每一项都创建一个 TreeItemNode
    getChildren(element?: TreeItemNode | undefined): ProviderResult<TreeItemNode[]> {
        if (element) {
            return element.children.map(item => new TreeItemNode(this.category, item as (string | CState)[]))
        } else {
            return this.ITEMS.map(item => new TreeItemNode(this.category, item as (string | CState)[]));
        }
    }
}

/**
 * 初始化并注册树视图
 */
export function initTreeViewItem(): void {
    // 实例化 TreeViewProvider
    ALL_KEYS.forEach(element => {
        // registerTreeDataProvider：注册树视图
        window.registerTreeDataProvider(element, new TreeViewProvider(element.toString(), ALL_ITEMS[element]));
    });
}