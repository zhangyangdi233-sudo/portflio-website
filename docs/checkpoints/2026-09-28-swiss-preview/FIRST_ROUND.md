# CIBA：瑞士国际主义方向第一轮预览

日期：2026-09-28。状态：**用户已批准参考，第一轮外观调整已制作，供中途确认方向。**

工作区：`/Users/zhang/Documents/portflio-webside/portflio-website/.worktrees/ciba-clean-restart`。本记录依据当前 `git diff` 与本轮已执行的检查，不包含新的设计审查或未经验证的浏览器结论。

## 用户确认的范围

用户已回复“可以”，批准此前提交的参考组合：Korel Studio 的留白与对齐、Zoé Bilgeri / Korel 的轻量窗口外观、Studio Marcus Kraft 的图文列关系。用户再次强调：**全部交互机制保留，只调整外观与氛围；原有字体和字号保留。**

作品正式更名已纳入本轮：

| 语言 | 页面标题 |
| --- | --- |
| 中文 | APHASIA / 失语症 |
| 英文 | APHASIA |
| 日文 | APHASIA / 失語症 |

正文、图片说明、履历和试玩按钮中对应的项目名同步更新。旧 slug `x-wheel`、图片路径和现有 GitHub 外链继续保留，以维持现有链接。除更名所需替换外，作品文案不作改写。

参考与批准记录见 [参考确认文档](/Users/zhang/Documents/portflio-webside/portflio-website/docs/research/2026-09-28-reference-approval.md)。

## 本轮已发生的外观变化

以下逐项对应 [ciba-v3.css](/Users/zhang/Documents/portflio-webside/portflio-website/.worktrees/ciba-clean-restart/src/styles/ciba-v3.css) 与 [coursework-desktop.css](/Users/zhang/Documents/portflio-webside/portflio-website/.worktrees/ciba-clean-restart/src/styles/coursework-desktop.css) 的实际差异。

### 整站与首页

- 保留近黑 `#090a08`、暖纸色 `#f4f0dd`、酸绿 `#c6ff00`。新增两个同色系底面：在近黑中混入 4% 与 7% 暖纸色。
- 关闭整站装饰方格背景；Works 画布也去掉方格背景，保留低对比分隔边缘。
- 导航和语言选中状态改用酸绿底线；保留原有链接、按钮及其状态属性。
- 首页身份说明、分区小标题、概念标签等次要文字由酸绿改为暖纸色层次。
- 主要链接由整块酸绿填充改为近黑衍生底面、暖纸色文字和细线；悬停时通过酸绿文字/边线提示，箭头继续使用酸绿。
- 首页侧边标记改为透明底面与细线；作品索引悬停改为较浅底面，项目标题以酸绿突出。

### Works 窗口与工具条

- 工具条去掉完整外框，保留淡底线；下方间距从 `1rem` 增至 `1.5rem`，水平内边距收为零。
- 筛选和恢复栏按钮以酸绿底线、文字和较浅底面表示选中/悬停，减少整块酸绿。
- 窗口外边框从 2px 暖纸色变为 1px 低对比暖纸色；移除默认、活动态及手机布局中的偏移硬阴影。
- 标题栏从酸绿底改为 7% 暖纸色混合底面；窗口正文使用 4% 混合底面。标题栏与控制区分隔线从 2px 强边线改为 1px 淡线。
- 活动窗口仍保留酸绿边框，窗口标记也用酸绿提示当前状态。
- 窗口记录字段和概念小标签改用暖纸色层次；窗口位置、旋转、拖动位移和尺寸配置继续沿用。

### 详情、About 与课程窗口

- 标准详情页和 About 的标签、按钮、正文边线采用同一组低对比底面与细线规则。
- Wake Up 的记录标题和元信息标签降低酸绿使用比例；本轮没有修改其内容或行为。
- 课程区和媒体窗口引入相同的 4%/7% 底面；标题栏、说明和图注之间使用淡线。
- 课程窗口外框、编号、代码与图注标记改为暖纸色层次；下一作品链接的悬停改为较浅底面和酸绿文字。

## 保留项与源码核对

本轮对照 `HEAD` 核实：

- 两份 CSS 的字号、字体族、字重、字距和行高相关声明保持一致；比对覆盖 `ciba-v3.css` 的 135 条、`coursework-desktop.css` 的 53 条排版声明。
- `portfolio-motion.ts`、`coursework-desktop.ts`、`portfolio-interactions.ts`、`WorkDesktopWindow.astro` 和 `CourseworkDesktop.astro` 与基线逐字一致。
- 因此本轮未改写窗口拖动、标题栏点击预设、键盘移动、置顶、收起恢复、筛选、Scatter/List、复位和移动端回退的现有实现。源码比对本身不替代浏览器行为验证。
- 三个更名文件将 APHASIA 新名反向替换后与基线逐字一致；JSON 可以解析，路径、外链及其他文案均保持原值。
- 本轮未新增前端依赖。

## 已记录的验证结果

以下结果由主任务及负责 Figma 同步的协作任务在本轮执行并报告：

| 检查 | 结果 |
| --- | --- |
| `npm run check` | 通过，检查 46 个文件 |
| `npm test` | 通过，12 个测试文件、46 个测试 |
| `npm run build` | 通过，生成 25 个路由 |
| `npm run check:built` | 通过 |
| `npm run check:design` | 负责 Figma 同步的协作任务已运行并确认通过 |
| 本文记录的字体/交互源码比对 | 通过 |
| 名称修改的 JSON 与差异检查 | 通过 |

本记录没有新增浏览器运行结论。下列文件是第一轮已保存的预览画面，用于向用户展示当前版本。

## 第一轮预览文件

- [首页／中文桌面](/Users/zhang/Documents/portflio-webside/portflio-website/.worktrees/ciba-clean-restart/docs/checkpoints/2026-09-28-swiss-preview/home-desktop-zh.png)
- [APHASIA 首页作品区域](/Users/zhang/Documents/portflio-webside/portflio-website/.worktrees/ciba-clean-restart/docs/checkpoints/2026-09-28-swiss-preview/aphasia-home-zh.png)
- [Works／中文桌面视口](/Users/zhang/Documents/portflio-webside/portflio-website/.worktrees/ciba-clean-restart/docs/checkpoints/2026-09-28-swiss-preview/works-desktop-zh-viewport.png)
- [Works／中文桌面](/Users/zhang/Documents/portflio-webside/portflio-website/.worktrees/ciba-clean-restart/docs/checkpoints/2026-09-28-swiss-preview/works-desktop-zh.png)
- [Works／中文手机](/Users/zhang/Documents/portflio-webside/portflio-website/.worktrees/ciba-clean-restart/docs/checkpoints/2026-09-28-swiss-preview/works-mobile-zh.png)

## 本轮文件范围与后续

外观修改集中在上述两份 CSS；作品更名集中在项目 JSON、profile JSON 与 i18n 文案。Figma tokens、导入插件和全站交付准备由独立协作任务同步。

这是制作中的第一轮记录。完整 Figma 写入与逐页交付仍由主任务继续推进，本记录不将本地导出准备等同于已经上传完成。
