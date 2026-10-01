# 本轮 Figma 发现记录（2026-09-28）

目标文件：`xyINqLy60s9MELHd2HmViK`。原页 `0:1` 与七个原画板保留不变。

## 来源与发现

- 网页事实来源：`sync/dom/*-ja-desktop.json`；布局、文本、字体、颜色、图片 alt 和地址均来自 DOM。
- Code Connect：在接受的 clean-restart 工作树中未发现本次 Header / Button 的映射文件。
- 既有页面：Cover 七个原生画板，零组件实例；组件页 `6:6` 为空。
- 库：已发现 Material 3、Simple Design System 与 Apple 各平台套件；没有本产品的 Header 或 Button。
- 搜索：批量请求被服务端限制到一项，因此顺序补完原请求。`CIBA Header`、`CIBA Button`、`CIBA color background` 无结果；`CIBA Body Default` 返回团队库一个通用 Body，缺乏与本次实际字号和字体匹配的依据，不直接替代网页文字。
- 本地定义：37 个变量、4 个集合、10 个文字样式、2 个偏移阴影样式。基础色为 #090a08 / #f4f0dd / #c6ff00。
- 既有字体 Helvetica Neue / Menlo 远程不可用；用户已改用商业可用 Noto Sans SC / JP，新版网页与 Figma 使用相同字族；字号依据 DOM 原值。

## 差异处理

- 旧 border/default 为纸色 42%，新版为26%；旧变量不修改，新增本轮定义。
- 新版表面色为纸色混入黑色3% / 4%；单独添加，旧原稿不受影响。
- 旧偏移阴影不用于新稿，不删除旧样式。
- 旧文字字体无法远程加载，因此副本以 DOM 原文建立新的可编辑 Noto 文字层，并复用旧原稿图片 hash。不会把整页转成截图。
- 图像 alt 更名 APHASIA 与旧 X.WHEEL 规范化匹配；图片本身、slug 与资源地址不变。
- Home / Coursework 初始状态外的隐藏面板，需单独状态画板补充，不能误计为已交付。

## 新稿范围

Starter 套餐明确拒绝创建第4页；该调用未产生变更。使用空组件页 `6:6` 创建三处独立区域：

| 区域 | ID | 用途 |
|---|---|---|
| Swiss Revision · JA Desktop | 67:2 | 六个既有日文桌面视图的本轮可编辑稿 |
| First Captures · All Languages | 67:3 | 根任务处理其余42个首次捕获 |
| Components · Revision | 67:4 | 本轮共享组件 |

所有创建 ID 记入 `revision-state.json`；不在画布节点存储插件状态。

## 本轮实际完成

- 日文 About：`77:38`，1440 × 1085，26 个可编辑文字层；字号、字重、行高来自 DOM，字体 read-back 全为 Noto Sans JP，无不匹配。
- Footer 主组件 `77:77`，Header 主组件 `77:91`；页面内为实例。线性履历和导航子组使用 Auto Layout。
- 新建12个实际文字样式、2个变量集合、22个颜色变量（11 primitive + 11 alias），各1 mode。完整名称和 ID 见 `about-ja-desktop-result.json` / `revision-state.json`。
- 活动导航底线另做定点修复：`77:100`、`77:109`。CSS其余三边透明，不应使用第一条透明边颜色覆盖底线。
- About 完整截图已检查；原七框仍未写入。
- 第一批9个首次捕获的宽度均正确，桌面1440、手机390；实际父节点为页 `6:6`，capture 的 nodeId 仅选中目标页，没有放入 Section `67:3`。最终整理时需单独移动至相应区域。

## 当前阻塞与恢复方式

执行 Works 导入时服务端返回：`You've reached the Figma MCP tool call limit on the Starter plan`。该次调用没有创建 Works，不能把其余五个视图标记为已上传。

待执行程序：`prepare-dom-view.py` 从 DOM + 图片库存生成 `use_figma` 所需代码，模板 `dom-to-figma.js`；输出采用 LZW 编码数据以适应工具50,000字符限制。五份 generated.js 仅本地准备，已通过 JavaScript 语法解析，尚未在 Figma 验证。若 DOM 更新，先重新生成，不能沿用旧 generated 文件。

恢复后按顺序完成 Works / Home / Coursework / APHASIA / Wake Up，并各做一次完整截图比较。需要人工关注的范围：Home 动画/隐藏章节、Coursework 视频与窗口层级、CSS transform 与伪元素。本工具先保留实际边界及原生层；隐藏状态和交互须另有状态画板及说明。不要把这一步骤当作全部48视图和交互状态的完成证明。


## 2026-09-29 原生插件完成

已在原目标文件完成48主视图和12章节；历史限额与桌面连接阻塞已解除。原7框保留，54参考稿归位。最终证据见 [交付说明](FULL_SITE_HANDOFF.md) 与 [渲染汇总](runtime-logs/delivery-verification.json)。
