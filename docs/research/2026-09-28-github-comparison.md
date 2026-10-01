# CIBA 排版调整：GitHub 开源项目比较与实现方案

研究日期：2026-09-28。状态：**研究提案，尚未实施；参考方向需先由用户确认。**

## 建议

保留当前 Astro 网站、内容模型和已有交互，只调整版面与色彩层次。开源项目适合提供局部组织方式，不值得为这次视觉调整更换框架。与当前目标最接近的组合是：参考 Astro Nano 的内容层级、DevPortfolio 的栏目网格，继续使用 CIBA 自己的窗口交互和 Figma 同步流程。

这些仓库是实现参考，不把它们称为严格的瑞士国际主义设计范本。设计史、真实网页视觉参考和最终方向应由另份视觉研究说明。

## 1. 当前项目依据

本报告最终以较新的工作区为依据：

`/Users/zhang/Documents/portflio-webside/portflio-website/.worktrees/ciba-clean-restart`

根目录存在较早版本，和较新工作区在交互实现、作品数量与 Figma 导出方面有明显差别。后续制作应先沿用与用户当前页面对应的版本，不能把较早版本直接覆盖过去。

| 层次 | 已核实状态 | 对本次实现的含义 |
| --- | --- | --- |
| 页面技术 | `package.json` 使用 Astro `^6.3.8`、TypeScript `^5.8.3`、Sharp；依赖表还保留 GSAP | 继续使用现有组件与静态页面结构；本轮无须迁移 React 或 Next.js |
| 实际交互 | 新版 `portfolio-motion.ts` 使用原生 Pointer Events；纯函数位于 `portfolio-interactions.ts`；课程桌面有独立脚本 | 包里存在 GSAP 不代表当前窗口依赖 GSAP。应保留实际事件和状态逻辑 |
| 窗口能力 | 拖动、标题栏点击切换预设位置、键盘移动、置顶、收起、恢复、筛选、Scatter/List、复位；移动端/粗指针/减少动态效果有回退 | 排版调整需继续保留标题栏命中区、控件及相关 `data-*` 属性 |
| 图像交互 | `ProjectMedia.astro` 支持聚焦显示原色、原生视频控制；本次源代码检索未发现独立灯箱/放大查看器 | PhotoSwipe 仅作未来能力备选，本轮不新增功能 |
| 数据 | Astro Content Collections + Zod；项目 JSON 含中、英、日文内容，公开项目有五个 | 正文、媒体、项目顺序和字号以当前源码为准 |
| 视觉 | 主色 `#090a08`、`#f4f0dd`、`#c6ff00`；`ciba-v3.css` 已有纸色 14%、42%、68%、72%、86% 透明层次 | 可以通过现有色相的比例、分隔线和留白获得更平面的结果，无须换主色 |
| Figma | 已有可编辑导入插件、tokens、真实网页 capture 记录与本地 `figma:sync` | 优先完善现有通道；不把一张整页截图作为可编辑网页交付 |

本地证据：

- [依赖和命令](/Users/zhang/Documents/portflio-webside/portflio-website/.worktrees/ciba-clean-restart/package.json)
- [交互脚本](/Users/zhang/Documents/portflio-webside/portflio-website/.worktrees/ciba-clean-restart/src/scripts/portfolio-motion.ts)、[交互纯函数](/Users/zhang/Documents/portflio-webside/portflio-website/.worktrees/ciba-clean-restart/src/lib/portfolio-interactions.ts)、[课程桌面](/Users/zhang/Documents/portflio-webside/portflio-website/.worktrees/ciba-clean-restart/src/scripts/coursework-desktop.ts)
- [视觉 tokens](/Users/zhang/Documents/portflio-webside/portflio-website/.worktrees/ciba-clean-restart/src/content/art-direction.json)、[当前样式](/Users/zhang/Documents/portflio-webside/portflio-website/.worktrees/ciba-clean-restart/src/styles/ciba-v3.css)
- [Figma 工作流](/Users/zhang/Documents/portflio-webside/portflio-website/.worktrees/ciba-clean-restart/docs/figma/README.md)、[同步映射](/Users/zhang/Documents/portflio-webside/portflio-website/.worktrees/ciba-clean-restart/docs/figma/ciba-portfolio-sync.json)

## 2. 六个开源项目对比

以下“优点、限制、采用方式”是结合仓库事实与 CIBA 当前源码作出的工程判断。仓库的性能口号未作为实测结果引用；未用星标数量替代质量判断。

| 项目 | 功能与架构 | 技术线 | 对 CIBA 的优点 | 限制与采用方式 |
| --- | --- | --- | --- | --- |
| [Astro Nano](https://github.com/markhorn-dev/astro-nano) | 静态作品集/博客；页面从 Content Collections 读取项目、文章和经历，组合容器与列表组件 | Astro 5、TypeScript、Tailwind 3、Markdown/MDX；MIT | 内容与布局分离，适合借鉴纵向节奏、统一边缘和克制的元信息 | 以开发者内容为主，缺少 CIBA 的空间窗口系统；只借鉴层级与间距，不移植字体或字号 |
| [DevPortfolio](https://github.com/RyanFitzgerald/devportfolio) | `config.ts` 集中配置；Astro 分区组件；项目区使用 12 列布局，标题占 4 列、内容占 8 列 | Astro 5、Tailwind 4；MIT | 栏目和正文共享网格的实现清晰，与当前 Astro 容易对应 | 默认圆角卡片、阴影与技能标签不符合本轮平面化目标；借鉴列关系，不照搬卡片视觉 |
| [interact.js](https://github.com/taye/interact.js) | 框架无关的拖动、缩放、多点手势、吸附与边界约束；事件处理由业务代码接管 | TypeScript，独立 JavaScript 库；MIT | 如果未来需要窗口缩放或网格吸附，可保持 Astro 架构 | 它不提供 CIBA 的筛选、恢复栏和键盘业务规则；当前已有拖动实现，本轮不引入 |
| [react-rnd](https://github.com/bokuweb/react-rnd) | 一个可控位置/尺寸的 React 组件，组合 `react-draggable` 与 `re-resizable` | React + TypeScript；MIT | 边界、拖动手柄、尺寸控制 API 直观，可供交互代码设计参考 | 项目当前没有 React；采用它将增加运行时及状态迁移。本轮不采用 |
| [PhotoSwipe](https://github.com/dimsemenov/PhotoSwipe) | 图片画廊/灯箱；拆为 Core、Lightbox 与 CSS，可按需加载核心 | 框架无关 JavaScript、ES modules；MIT | 未来若确有高质量放大浏览需求，可局部接入 | 需要图片宽高数据，并改变现有阅读行为；本轮不安装。官方页面仍区分 v5 与开发中的 v6，不能混用示例 |
| [BuilderIO/figma-html](https://github.com/BuilderIO/figma-html) | HTML 与设计层转换的历史开源工程；仓库包含浏览器扩展、共享转换代码和 TypeScript/Webpack 工程 | TypeScript、浏览器扩展、Figma 插件相关代码；MIT | 说明网页可以转换成可编辑设计层，可参考 DOM 到设计节点的思路 | **仓库 README 已宣布迁移到 Builder.io Chrome 扩展**；旧开发文档与当前目录也有差异。不把它作为新的核心依赖；优先现有 CIBA 导入/capture 通道 |

### 关键源码依据

- Astro Nano 的依赖与实际集合读取方式：[package.json](https://github.com/markhorn-dev/astro-nano/blob/main/package.json)、[首页源码](https://github.com/markhorn-dev/astro-nano/blob/main/src/pages/index.astro)。
- DevPortfolio 的 12 列布局及卡片样式可以直接在 [Projects.astro](https://github.com/RyanFitzgerald/devportfolio/blob/master/src/components/Projects.astro) 查到；版本依据是 [package.json](https://github.com/RyanFitzgerald/devportfolio/blob/master/package.json)。
- interact.js 官方示例要求业务方更新 `transform`，并处理 `touch-action`/选择行为：[拖动文档](https://interactjs.io/docs/draggable/)。因此它是输入能力库，不会自动带来完整窗口管理。
- react-rnd 的组成依赖及 React peer dependency 可见 [package.json](https://github.com/bokuweb/react-rnd/blob/master/package.json)；受控位置、尺寸及边界见 [README](https://github.com/bokuweb/react-rnd/blob/master/README.md)。
- PhotoSwipe 的分包、动态加载、图片宽高要求及 v6 状态见 [官方接入文档](https://photoswipe.com/getting-started/)。
- BuilderIO 的迁移声明见 [仓库首页](https://github.com/BuilderIO/figma-html)；[旧开发文档](https://github.com/BuilderIO/figma-html/blob/master/DEVELOP.md)只能说明历史架构，不能据此承诺旧接口现在可用。

## 3. 实现方案

### 阶段 A：先确认参考方向

本轮提交视觉参考、这份技术比较和几个具体改动范围，等待用户确认后开始制作。确认前不改网站、不上传新设计。

建议把“更简约、更平面”落实成三组能直观看到的变化：

1. 对齐：让导航、栏目名、正文和作品说明共享少数几条纵向轴线；以留白组织内容。
2. 色彩比例：保留黑、暖纸色、酸绿；减少酸绿大面积填充的同时保持现有选中与聚焦状态清楚。
3. 明暗层次：从现有三色派生相近明暗，用于底面、分隔线和次要文字；减少装饰网格、重复边框和强调层。

以上为待确认的设计动作，不是研究得出的唯一配色比例。不要预先规定整站每页必须达到同一个像素面积百分比。

### 阶段 B：锁定已有内容与交互

记录当前页面的文案、字体族、字号、字重、媒体、交互状态和桌面/移动布局作为制作基准。保持 `portfolio-motion.ts`、`portfolio-interactions.ts`、`coursework-desktop.ts` 的机制及相应 DOM 标识。

制作先落在 `ciba-v3.css`、`coursework-desktop.css`、必要的布局容器与语义颜色 tokens；确有需要再调整组件结构。避免新增一层大范围覆盖 CSS，使同一个元素的视觉规则分散在更多文件。

推荐继续沿用的关系：

```text
项目 JSON + art-direction.json
            ↓
      Astro 页面与组件
       ↓          ↓
版面/颜色样式   原生交互脚本
       ↓
可编辑 Figma capture / 本地导入插件
       ↓
Figma snapshot → Codex 比对调整
```

### 阶段 C：先做代表性页面，再扩展全站

先制作 Home 与 Works 的第一组草稿。它们同时覆盖大标题、图片、窗口控件、筛选、背景与高密度元信息。给用户看同尺寸前后对照，再将已确认的规则延伸到 About、作品详情和 University Coursework。

中途展示应说明本轮改动的是哪几条对齐线、哪几种底色/分隔线和哪些间距。字体、字号、文字和已有交互继续作为固定条件。无需额外写一轮泛化设计审查。

### 阶段 D：Figma 全站交付

1. **目标文件沿用用户本轮提供的链接。** 本地历史文档把 `xyINqLy60s9MELHd2HmViK` 标为 capture backup，并另记一个团队文件；这是历史记录，不足以改变用户指定目标。写入前应通过当前界面/连接确认文件权限、页面和现有修改。
2. 使用一份路由清单对照网页与 Figma，覆盖已公开页面、当前语言版本及桌面/移动尺寸。按源码推导当前三种语言各有首页、Works、About、五个公开项目页，即 24 个语言路由；Figma 可以按版型和语言组织，但不能把未导出的页面默认为已完成。
3. 输出真实文本层、真实图片、可选择的控件和分组；把窗口作为独立可移动 frame。Figma 中的静态层不等价于网页运行中的拖动/筛选逻辑，应附清楚的状态与交互注释。
4. 本地导入器会刷新已标记的生成节点。为了保留手工探索，先制作新版本 frame/页面或保存对应副本，并记录节点 ID；不直接覆盖用户已有手工排版。
5. 网页使用系统字体栈；历史 Figma 文档使用 Inter/Noto Sans JP 近似。若需要“字体也完全一致”，应核实目标机器可用字体并记录具体字体。字号沿用原值，不能声称近似字体的字宽与换行已完全相同。
6. 完成后更新 tokens、页面/节点映射和截图对照；`figma:sync` 保留作为后续手动排版回传渠道。它导出设计快照供 Codex 比对，不等于 Figma 修改已自动更新网站源码。

### 阶段 E：完成必要验证

沿用已有类型检查、构建与相关交互检查，重点确认窗口拖动/点击预设、筛选、收起恢复、List、复位、键盘与移动回退。确认图片聚焦显原色和原生视频控制仍可用。对照原页面确认文字及字号未改变，再逐项核对 Figma 路由清单。

如果新方案引入相近色，现有“三色限制”的 token/测试规则应表达为“保留三种基础色、允许明确派生色”，或直接沿用已有透明度派生方式；不能为了检查通过随意删除约束。该处属于落实用户新设计要求，不需要另开框架迁移。

## 4. 尚未确定的边界

- 本次没有对 GitHub 模板执行安装或性能实测；所有技术比较基于主仓库、官方文档与实际源码。
- 主任务已在线只读核对目标 Figma：三个页面，Cover 下有六个独立日语桌面页面和一个重复首页，详见[实时画板清单](2026-09-28-implementation-map.md)。写入权限、字体可用性及插件刷新仍未执行验证。2026-08-01 的限制记录不能直接视为当前限制。
- 本次未复制第三方项目代码、素材、文字或字体。若后续确实取用源码，应保留对应 MIT 许可声明；设计参考不要求整体引入其依赖。
- 全站导出范围须由实际路由和语言清单确认；历史六个 capture 不能直接证明目前所有公开页面均已导出。

## 5. 研究方法

使用用户指定的 `deep-research` 流程。工具发现未找到可调用的 Firecrawl/Exa 搜索或抓取工具，因此采用现有网页搜索工具，并直接打开 GitHub 主仓库、源码与项目官方文档。检索围绕三类问题展开：Astro 简约作品集、拖动窗口/媒体交互、网页到可编辑 Figma。深入比较六个项目，结合当前新版本地实现判断收益和迁移成本。没有把仓库 README 的自述成绩当成独立验证。

主要外部来源包括上述六个 GitHub 主仓库、两个模板的源码及依赖清单、react-rnd 的依赖清单、interact.js 与 PhotoSwipe 官方文档、BuilderIO 的迁移声明和旧开发文档。实际网页视觉研究由独立参考报告承接。
