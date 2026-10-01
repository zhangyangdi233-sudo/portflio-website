# CIBA 简约排版改造：源码实施范围与 Figma 全站清单

## 本轮落实进度（2026-09-28）

- 已在接受的 clean-restart 工作区完成第二轮网页外观调整，继续使用现有 Astro＋原生 TypeScript，保留全部交互机制与原字号。
- 按用户后续提出的中英日、无衬线、商业使用要求，选用 Noto Sans SC／JP；这是实施选型，用户未逐字指定该字体。
- 新艺术家陈述、EMIDA 已完成状态、APHASIA 三语正式名称均已落地；旧 `x-wheel` slug 和资源路径保留。
- Figma 已完成 54 个原始捕获，日文 About 另有 1 个已组件化并核对的新版。其余 5 个日文桌面新版，以及原始捕获的组件整理与逐页验证，仍待 Starter MCP 调用额度恢复；原七稿保留，尚未达到整站完成状态。

完整预览、参考、字体许可和验证入口：[本轮交付索引](/Users/zhang/Documents/portflio-webside/portflio-website/.worktrees/ciba-clean-restart/docs/research/DELIVERY_2026-09-28.md)。

**以下保留批准前的研究方案与当时约束，作为历史依据；实际落实状态以上述更新及交付索引为准。**

日期：2026-09-28。状态：只读研究与待确认方案，尚未修改网站或 Figma。

本文件依据用户当前要求：保留所有交互、现有文字、字体和字号，保留黑／暖白／荧光绿配色，通过排版与色彩面积、相近明暗减少工业感。参考资料须先给用户过审；本方案中的设计建议仍待参考确认。

## 1. 实际基线

- 接受版本的代码位于 `/Users/zhang/Documents/portflio-webside/portflio-website/.worktrees/ciba-clean-restart`，本次读取时工作区干净，最新提交为 `d4379aa`（`docs: record final independent review`）。
- 上级 `/Users/zhang/Documents/portflio-webside/portflio-website` 是旧版本的比较目录；不应把本方案实施到那个旧版本上。
- 当前为 Astro 静态站点，项目记录由 JSON 驱动，TypeScript 负责浏览器交互，CSS 负责表现。`package.json` 声明 Astro `^6.3.8`、GSAP `^3.13.0`、Sharp `^0.34.5`、TypeScript `^5.8.3`。这些是源码声明范围，不代表本次查询的最新版本。
- 当前 `portfolio-motion.ts` 和 `coursework-desktop.ts` 没有 GSAP 导入。首页／Works 的主要行为使用 Pointer Events、IntersectionObserver 和 ResizeObserver，课程页使用 Pointer Events 与 requestAnimationFrame。因而无须为了视觉调整重写动效架构或替换技术栈。

依据：[BaseLayout](/Users/zhang/Documents/portflio-webside/portflio-website/.worktrees/ciba-clean-restart/src/layouts/BaseLayout.astro:1)、[项目配置](/Users/zhang/Documents/portflio-webside/portflio-website/.worktrees/ciba-clean-restart/package.json:1)、[主交互脚本](/Users/zhang/Documents/portflio-webside/portflio-website/.worktrees/ciba-clean-restart/src/scripts/portfolio-motion.ts:1)、[课程页脚本](/Users/zhang/Documents/portflio-webside/portflio-website/.worktrees/ciba-clean-restart/src/scripts/coursework-desktop.ts:1)。

## 2. CSS 应改在哪里

`BaseLayout.astro` 按顺序导入 `global.css` → `art-direction.css` → `ciba-v3.css`。页面的 `body` 带有 `ciba-v3` 类，最后一层覆盖当前主要表现。课程页另外由组件导入 `coursework-desktop.css`，具有自己的类名和从 CIBA 色值派生的变量。

本次宜在现有生效规则中局部编辑，避免新增一份大而重复的末尾覆盖文件。`global.css` 存有大量旧方案规则；除非确认某项当前表现仍由其控制，不应顺手做广泛清理。`art-direction.css` 仍承担 Wake Up 的结构和部分字号，所以也不能整份删除。

| 文件（相对接受版本根目录） | 本次拟涉及的内容 | 必须保留的边界 |
| --- | --- | --- |
| `src/styles/ciba-v3.css` | 全站表面色、分隔线、按钮面积、首页留白、Works 窗框与阴影、详情页对齐 | 所有字号、字体、滚动章节点、交互类名及断点语义 |
| `src/styles/coursework-desktop.css` | 大分区及小窗口的边界层次、标题栏明暗、留白和栏目对齐 | 14 个窗口的身份、原生视频控件、空间／顺序模式、移动变量 |
| `src/content/art-direction.json` | 如确认增加同色系明暗，记录语义色值 | 三个基础色不变；字体、动效时间、键盘步长不变 |
| `src/lib/art-direction.ts` | 将新增的语义色值输出为 CSS 变量（仅在有新增色值时） | 现有变量映射与 Works 位置读取接口 |
| `src/pages/[lang]/index.astro` | 仅在 CSS 无法达成时，调整布局分组 | 原文字、5 个作品章节、字形遮罩、媒体钩子和链接 |
| `src/pages/[lang]/works/index.astro`、`src/components/WorkDesktopWindow.astro` | 仅在必要时调整视觉包装和对齐 | `data-*`、按钮、语义状态、窗口 ID、最小化／恢复链路 |
| `src/pages/[lang]/works/[slug].astro`、`src/components/WakeUpReplica.astro`、`src/pages/[lang]/about.astro` | 必要的布局容器调整 | 正文、媒体数量、链接、详情展开及联系入口 |
| `src/components/CourseworkDesktop.astro` | 必要的视觉包装 | 三分区、14 项媒体、标题栏、重置、原生播放器 |
| `figma-export/design-tokens.json`、`figma-export/figma-plugin/code.js` | 与确认后网页同步颜色和可编辑构成；补齐清单 | 不把旧七框插件当成“全站交付” |
| `docs/figma/README.md`、`docs/figma/ciba-portfolio-sync.json` | 本次目标文件、路线、状态、节点映射和字体实际情况 | 明确区分历史记录与本轮结果 |

`src/scripts/portfolio-motion.ts`、`src/scripts/coursework-desktop.ts`、`src/lib/portfolio-interactions.ts` 是本轮优先冻结的行为层。所有项目 JSON、个人资料、翻译、媒体来源和字体尺寸也是冻结输入。

## 3. 减少工业感的具体着力点

下表“现状”来自源码；“建议”是待参考过审后的设计推断，不是已经实施的结果。

| 现状 | 建议 | 不改变的行为 |
| --- | --- | --- |
| Works 窗口有 2px 暖白外框，12px 酸绿实心错位阴影；活动窗口换成 14px 暖白错位阴影 | 降为轻边线与平面色差；用清晰的活动边界／局部绿色表示焦点，去掉厚重的立体错位感 | 窗口重叠、置顶、拖拽、最小化和恢复 |
| 每个 Works 窗口标题栏整片荧光绿，底部打开按钮也整片绿 | 黑色或同色系浅一级标题栏；绿色集中到活动标识、焦点、关键动作的局部 | 标题栏仍明显可拖动，按钮仍有原大小的点击区域 |
| Works 舞台显示 56px 网格；外层还存在环境网格规则 | 版面继续按网格对齐，界面上减少可见的格子线 | 舞台边界与窗口约束不变 |
| 工具条外框、单个按钮边框、窗口外框形成多层边界 | 用栏目间距、少量横线和状态标识取代重复的容器线 | 全部筛选、布局切换、复位、显示计数与 dock 恢复 |
| 首页右侧有较大荧光绿竖条，主行动是大面积绿底 | 保留原 `01`／`05` 文本和位置关系，通过缩小色块面积、增加黑色留白降低重量 | 首页字形滚动、作品切换与链接 |
| 元数据、概念、计数、多个按钮共同使用高亮绿 | 明确视觉优先级：正文暖白、辅助信息同色明暗、绿用于重点状态 | 不删文字，也不把已有说明换成更少的信息 |
| 课程页已较平面，但大窗口、标题栏、描述、各小窗口有多层边界 | 保留三个大分区的结构，用边线浓淡和间距分层 | 每组内部窗口的移动与视频播放 |

具体规则位置：[Works 舞台与窗框](/Users/zhang/Documents/portflio-webside/portflio-website/.worktrees/ciba-clean-restart/src/styles/ciba-v3.css:768)、[标题栏](/Users/zhang/Documents/portflio-webside/portflio-website/.worktrees/ciba-clean-restart/src/styles/ciba-v3.css:821)、[首页信号条](/Users/zhang/Documents/portflio-webside/portflio-website/.worktrees/ciba-clean-restart/src/styles/ciba-v3.css:290)、[课程页表面](/Users/zhang/Documents/portflio-webside/portflio-website/.worktrees/ciba-clean-restart/src/styles/coursework-desktop.css:168)。

### 颜色比例建议

基础值继续为近黑 `#090a08`、暖白 `#f4f0dd`、荧光绿 `#c6ff00`。现有 `42% / 14%` 边线和 `68% / 72% / 86%` 暖白透明层已经提供了明暗层次，可优先重新分配用途。若确有必要，再增加同色系平面表面色，统一登记在语义 token 中；不要各处随手写不同灰色。

建议首轮以“黑与同色明暗承担大部分面积、暖白承担阅读、荧光绿承担小面积强调”制作样张。暂不承诺固定百分比，因为图片、窗口重叠及活动状态会改变像素面积，必须看具体首页／Works 样张后确定。也不应把旧技能文档里的 70/20/10（阅读／叙事／异常机制的设计纪律）误用为配色比例。

保留全套字体家族、字号、字重、字距与当前中英日断行规则作为第一轮约束。简约感先由留白、对齐、边线和配色面积实现。

## 4. 必须保留的交互清单

| 范围 | 当前机制 |
| --- | --- |
| 全站 | 语言切换保持当前路径；当前导航状态；联系锚点／邮件及外链；跳过导航；键盘焦点；根路径根据浏览器语言跳转，默认英文 |
| Home | CIBA 字形遮罩滚动；滚动对应 5 个作品标题与媒体组；单图拖拽；单击循环预设位置；方向键／Shift 方向键移动；Home 复位；灰度 10% 图像在 hover／focus／拖动时恢复彩色与更高不透明度；常规项目链接；作品索引 |
| Home 响应式 | `900px + fine pointer` 且非减少动态时增强；其余情形按顺序展示全部作品；隐藏章节的 `aria-hidden`／`inert` 管理 |
| Works | 全部／重点／档案筛选；窗口／顺序布局；重置；显示数量；标题栏拖拽与单击预设；方向键／Shift 步长；Home 复位；Esc／关闭按钮收起；dock 恢复并转移焦点；点击／聚焦置顶；舞台边界约束与 resize 后校正 |
| Works 响应式 | `900px + fine pointer` 条件；移动端及减少动态强制顺序模式；不可拖时标题栏退出键盘交互 |
| 标准详情 | 原始媒体／图片响应式加载；hover／focus 恢复彩色；已有试玩／档案外链；下一个作品导航 |
| Wake Up | 返回 Works；两张已确认公开图像；项目记录；可展开的图像描述索引；旧站档案外链 |
| Coursework | Blender／Maya／AE-PR 三个锚点；14 个媒体窗口；标题栏拖拽、单击预设、键盘移动、Home 复位；置顶；逐分区重置；窗口边界校正；9 张图片与 5 个原生视频控件；源顺序布局；状态播报；下一项目 |
| Coursework 响应式 | 独立的 `960px + fine pointer` 条件；减少动态和窄屏使用静态顺序模式；不能误改为 Works 的 900px 边界 |
| About | 原陈述／CV／联系信息；邮件、社交与已有下载入口的条件显示 |

这意味着减去“工业外观”不能顺手改成纯静态作品网格。当前空间交互是用户明确要求保留的部分。

## 5. 全站路线与 Figma 基础交付矩阵

公开内容为五个项目：X.WHEEL、EMIDA、Wake Up、Escape Project、University Coursework。其他四个 JSON 条目为 `published: false`，本轮不发布。每种语言拥有首页、Works、About 和五个详情页，共 **8 路径 × 3 语言 = 24 个内容页面**；另有 `/` 语言跳转页，合计 25 个静态路由。

以下每一行均包含 `zh`、`en`、`ja` 三种语言，每种语言分别交付桌面宽 1440px、移动宽 390px 的完整可编辑页面，页面高度按内容自适应：

| 路线（`{lang}` = zh / en / ja） | 页面／特殊内容 | 桌面＋移动框数 |
| --- | --- | --- |
| `/{lang}/` | 首页、作品章节、完整索引、页脚 | 6 |
| `/{lang}/works/` | 五个独立作品窗口、工具条、dock | 6 |
| `/{lang}/about/` | 陈述、CV、联系 | 6 |
| `/{lang}/works/x-wheel/` | 项目正文、11 项媒体与说明、已有外链 | 6 |
| `/{lang}/works/emida/` | 项目正文、1 项媒体、已有档案链接 | 6 |
| `/{lang}/works/wake-up/` | 两图记录与描述索引 | 6 |
| `/{lang}/works/escape-project/` | 项目正文、3 项媒体、已有档案链接 | 6 |
| `/{lang}/works/university-coursework/` | 三分区、14 媒体窗口、记录说明 | 6 |
| 合计 | 完整公开内容 | **48 个基础框** |

桌面 1440×900 和移动 390×844 是查看视口，不把整页裁成这个高度。根路径只需在导航说明中记录语言跳转及无脚本英文入口，无须伪造一张新的艺术页面。

### 必须补充的状态页／组件状态

单张长页面不能完整表达隐藏章节与交互，因此 48 个基础框之外，还需要按组件或状态组记录：

- 首页：五个作品的桌面活动章节；hover／focus 彩色图状态；完整顺序／减少动态排版。不要只导出第一项 X.WHEEL。
- Works：默认全窗口、重点筛选、档案筛选、顺序模式、活动／非活动、最小化与 dock 恢复、键盘焦点。可复用组件变体表达，不必把所有组合复制成独立长页面。
- Coursework：三组的空间与顺序模式；活动窗口、移动后、重置后；视频与图片是不同类型。三组包含 Blender 8 图＋2 视频、Maya 1 图＋1 视频、AE/PR 2 视频。
- Wake Up：图像描述索引展开／收起。
- 全站：导航当前页、语言当前项、链接 hover、focus 和按钮状态；字体／颜色／间距基础页；交互说明与网页路线。

Figma 中应保留真实可编辑文字、独立图片填充、分组／自动布局及组件变体；作品媒体可以是正常图片图层。整页截图不能作为可编辑网页的替代交付。真实拖拽边界、滚动章节、播放器由网页执行；Figma 表达布局和相关状态，不把静态设计声称为完整运行时复现。

## 6. 本轮 Figma 目标与既有交付缺口

用户本次提供的目标是 [xyINqLy60s9MELHd2HmViK](https://www.figma.com/design/xyINqLy60s9MELHd2HmViK)。旧文档将该文件记录为可编辑捕获备份，并将 [KWJfKNS3PKBhRGCad4V3Ey](https://www.figma.com/design/KWJfKNS3PKBhRGCad4V3Ey) 记录为此前团队项目交付文件。**本轮优先按用户新提供的 xy 文件交付，不能因旧文档而擅自改投 KWJ 文件。**

旧文档列出的实际捕获只有日语 Home、Works、X.WHEEL、Wake Up、About、Coursework 六个独立桌面路线。`34:2` 是废弃的宽版首页重复，文档明确说不是移动版。当前本地插件虽然可以生成七个概念框（含 Home mobile），仍缺少完整三语言、其他移动页及 EMIDA／Escape 详情。因此本轮不能只刷新旧七框后称为“整个网页”。

主任务于 2026-09-28 对用户提供的 xy 文件完成了只读查询，确认当前有 `0:1 / 00 Cover`、`6:4 / Foundations`、`6:6 / Components` 三页。Cover 中实际存在以下框，进一步验证了移动端和两个详情页的缺口：

| 节点 | 页面 | 当前框尺寸 | 可编辑文字节点数 |
| --- | --- | --- | --- |
| `28:2` | Home | 1440×6105 | 81 |
| `29:2` | About | 1280×1074 | 27 |
| `30:2` | Wake Up | 1280×2530 | 42 |
| `31:2` | Works | 1280×1318 | 102 |
| `32:2` | X.WHEEL | 1280×7127 | 45 |
| `33:2` | Coursework | 1280×4736 | 118 |
| `34:2` | Home 重复框 | 1280×5008 | 81 |

Works 的实时截图也确认了宽荧光绿标题栏／行动区和错位实心阴影，与上述源码定位一致。截图保存于 [当前 Works](/Users/zhang/Documents/portflio-webside/portflio-website/docs/research/reference-review-2026-09-28/assets/ciba-current-works.png)。这次查询没有修改 Figma。

旧导入器会替换带 generated 标记的框内部修改；本轮先读取实际文件并保留原有页面／框，在另一个明确命名的改版区域交付，避免覆盖用户后续调整。是否复用旧插件或直接用当前 Figma 能力写入，应在参考过审且读到最新 Figma 状态后决定。

字体方面，旧 Figma 文档记录使用 Inter／Noto Sans JP 代替网页系统字体。这是历史交付情况，不满足“无条件逐字形一致”的保证。本轮应核实实际可用字体，尽可能沿用网页的实际字体；有替代情况需单独列明，不能把旧的 Inter 近似当成用户新授权改字。

依据：[Figma 历史说明](/Users/zhang/Documents/portflio-webside/portflio-website/.worktrees/ciba-clean-restart/docs/figma/README.md:1)、[同步映射](/Users/zhang/Documents/portflio-webside/portflio-website/.worktrees/ciba-clean-restart/docs/figma/ciba-portfolio-sync.json:1)、[旧插件范围](/Users/zhang/Documents/portflio-webside/portflio-website/.worktrees/ciba-clean-restart/figma-export/README.md:1)。旧记录中的套餐和 MCP 额度只反映 2026-08-01，本次没有据此推定当前额度。

## 7. 推荐实施顺序与用户检查点

1. **现在：参考过审。** 提供少量真正相关的瑞士／国际主义网页参考、各自可借鉴之处、GitHub 项目比较，以及本方案。待用户确认参考后再开始视觉改动。
2. **第一轮：Home＋Works。** 保留全部文字、字号与行为，仅调整阴影、边线、绿面积、同色明暗和网格留白。约两轮内部打磨后交给用户查看一组桌面／移动前后图与预览。
3. **第二轮：完整内容页。** 将确认后的规则应用到三种标准详情、Wake Up、Coursework、About；重点展示课程窗口和长文本页。再次交给用户看，防止统一样式抹掉各页的内容结构。
4. **第三轮：三语言与 Figma 全站。** 依据 48 个基础框及状态清单同步可编辑内容，记录路线／语言／宽度／状态／Figma 节点映射，确认文字、图像、框可独立调整。

用户不要求额外审查报告，本轮没有运行测试或开展审计。实际实施时应围绕本次改动做必要的功能确认，并使用用户查看节点控制方向；不能因不做审查而省略用户明确要的参考审批。

## 8. 研究边界

本文件是基于源码、既有交付记录和主任务提供的 Figma 只读查询结果的实施映射，没有测量当前浏览器计算样式。路线数量、媒体数量、选择器和交互机制均从当前接受版本源码读取；Figma 节点与尺寸来自本轮只读查询；视觉改造内容为待确认建议。网站源码、字体、内容记录、交互脚本、媒体和 Figma 均未改动。
