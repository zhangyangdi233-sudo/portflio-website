# CIBA 全站可编辑 Figma 交付

更新：2026-09-29。**整站导入完成。**

[打开编辑说明](https://www.figma.com/design/xyINqLy60s9MELHd2HmViK/CIBA-Portfolio-Editable-Website-System?node-id=131-18199) · [打开中文桌面首页](https://www.figma.com/design/xyINqLy60s9MELHd2HmViK/CIBA-Portfolio-Editable-Website-System?node-id=131-6261)

## 文件内的位置

进入原文件的 **02 Components** 页。`START HERE · CIBA Swiss Website` 是说明入口。画板按 ZH、EN、JA 分行，桌面在左侧、手机在右侧；各语言下方为首页章节状态。`00 Cover` 的七个原画板保持原样。

| 内容 | 已交付 |
| --- | --- |
| 整站主视图 | 48：8 类页面 × 3 语言 × 2 尺寸 |
| 首页第 2–5 章 | 12 个独立的可编辑章节 |
| 桌面完整首页 | 三种语言均展开五个作品章节 |
| 原始浏览器参考稿 | 54 个，收纳于右侧 Reference captures 区域 |
| 视频封面 | 5 段原视频的实际帧，更新 30 处 |

8 类页面为 Home、Works、About、APHASIA、EMIDA、Wake Up、Escape Project、University Coursework。桌面宽 1440，手机宽 390，保留源页面完整高度。根路径仅作语言跳转，无独立画板。

## 编辑方式

文字、图片填充、框架及共享组件均为 Figma 原生图层。双击文字即可修改；图片可替换 Fill；Header、Footer、按钮等重复元素使用组件实例。导航、履历和规则列表使用 Auto Layout，重叠作品窗口保留源页面位置关系。

字号使用源网页值；中文和英文采用 Noto Sans SC，日文采用 Noto Sans JP。Noto 为可商用的 OFL 字体。APHASIA／失语症名称、艺术家陈述和 EMIDA 已完成状态已同步三语。`x-wheel` 只保留于内部路由和资源路径。

Figma 用于排版编辑。网页原有拖拽、悬停变彩色、筛选、窗口状态、动画、视频与游戏仍在网站中运行；静态画板不会执行网页 JavaScript。视频以原视频帧显示，MP4 保留在网站中。

## 实际验证

2026-09-29T02:19:12.784Z 导出的 48 个主视图与 12 个章节均有实际 Figma PNG：60 个根节点唯一、尺寸与源记录一致、字体缺失 0、渲染失败 0。核对覆盖三种语言与两种尺寸，并查看首页、About、Works 及各项目的代表画板。英文手机长标题在最后一轮调整后重新渲染核对。

修正了单行文字被 Figma 意外换行、手机作品列表因层级顺序多出顶部间距的问题。桌面首页的滚动空白已展开为五个真实章节。

英文手机首页的长标题已在 Figma 静态稿中改为原作品名大小写“University / Coursework”，按现有两行排列并调整字距。两行仍为70.2字号，宽度分别354和358，均在358宽的字框内；没有更改作品名。新文字层133:18205、133:18206可直接编辑，原动画字层隐藏保留。此处理是 Figma 排版适配，网站交互未改动。

实际导入、最终整理、排版修正和渲染数据保存在 `runtime-logs/`；汇总为 [delivery-verification.json](runtime-logs/delivery-verification.json)，全部节点为 [revision-state.json](revision-state.json)。先前受限状态保留在本地历史记录中，不再代表当前进度。

## 本地文件

源网站为本仓库。开发插件已用 Figma 实际分配 ID `1686577908111522667` 注册并运行；使用方法见 [插件说明](../revision-plugin/README.md)。研究、许可和网页验证见 [交付索引](../../docs/research/DELIVERY_2026-09-28.md)。
