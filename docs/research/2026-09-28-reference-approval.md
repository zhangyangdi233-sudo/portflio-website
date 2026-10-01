# CIBA：参考过审与实现提案

日期：2026-09-28。状态：**用户已回复“可以”批准参考方向，网站第一轮外观调整已开始。完整 Figma 同步继续按交付计划推进。**

## 先看这里

- [图文过审页](reference-review-2026-09-28/index.html)：三组原站截图、当前 Figma 对照、开源对比和制作顺序。
- 本机预览：[打开参考过审页](http://127.0.0.1:8768/reference-review-2026-09-28/)。

## 已批准的参考组合

| 编号 | 参考 | 本次建议采用的部分 |
| --- | --- | --- |
| R1 | [Korel Studio](https://korel.studio/) | 整站留白、共同对齐线、黑底页面的主次关系 |
| R2 | [Zoé Bilgeri / Korel](https://archive.korel.studio/zoebilgeri/) | 保留自由拖拽，降低界面外壳的视觉厚度 |
| R3 | [Studio Marcus Kraft](https://www.marcuskraft.com/) | 作品图与说明的列关系、组内和组间间距 |

以上参考方向已获用户确认。保留 CIBA 的近黑 `#090a08`、暖纸色 `#f4f0dd`、酸绿 `#c6ff00`；字体、字号、作品素材与全部交互机制保持原有设置。首轮把变化集中在留白、对齐、色彩面积、相近明暗、线条和阴影。用户同时正式将 X.WHEEL 更名为《APHASIA》失语症，公开文案仅作对应名称更新。

## 技术结论

六个 GitHub 项目已按功能、架构、技术线和优缺点比较。推荐参考 Astro Nano 的内容层级、DevPortfolio 的列关系，继续使用当前 Astro＋原生 TypeScript 实现。interact.js、react-rnd、PhotoSwipe 和 BuilderIO/figma-html 用于能力与成本对比，本轮没有新增依赖的必要。

详见：[GitHub 项目比较与实现方案](2026-09-28-github-comparison.md)。

## 制作顺序

1. 用户已确认参考及借鉴范围。
2. 制作 Home＋Works 的第一组桌面／手机预览，展示实际颜色与窗口变化。
3. 将确认后的规则应用到 About、详情和课程窗口，再展示一组预览。
4. 同步整个网站至用户指定的 Figma：8 类页面 × 中／英／日 3 语言 × 桌面／手机 2 尺寸，共 48 个基础页面视图，另附关键交互状态。

Figma 交付保留真实文字、图片、独立窗口及可编辑布局，现有稿作为对照保存。Figma 表达页面与状态；网页负责真实拖拽、筛选、滚动和视频运行。字体实际可用性、换行与节点映射在制作时核对。

详见：[逐文件实施范围与完整页面清单](2026-09-28-implementation-map.md)。

## 研究阶段已核实（批准前记录）

- 实际网站基线是 `.worktrees/ciba-clean-restart`，提交 `d4379aa`；上级目录为较早版本。
- 本轮 Figma 目标为用户给定的 `xyINqLy60s9MELHd2HmViK`。已只读核对页面、画板、可编辑文字节点，并读取 Works 截图。
- 当前 Figma 包含六个独立日语桌面页面及一个重复首页；EMIDA、Escape 与完整手机／三语交付尚需补齐。
- 提交参考供用户确认时，尚未改动已接受版本的网站代码、文案、字号、交互或 Figma 画稿。这是批准前的历史状态。

## 研究依据

[完整视觉研究与来源](2026-09-28-swiss-references.md)采用博物馆原始图录、设计工作室原站、出版社和官方代码文档。当前 Firecrawl／Exa 不可用，使用网页搜索、页面全文和浏览器现场查看；没有把模板性能宣传当作实测。

## 用户批准与后续约束

用户此前要求先确认参考，原文保留：

> 到时候将你搜到的参考给我过审一遍

随后用户回复 **“可以”**，并再次明确：全部交互机制保留，只调整外观与氛围；正式作品名更新为《APHASIA》失语症。由此开始第一轮制作，继续按用户要求在制作中展示预览以确认方向。

当前第一轮修改与验证记录：[FIRST_ROUND.md](/Users/zhang/Documents/portflio-webside/portflio-website/.worktrees/ciba-clean-restart/docs/checkpoints/2026-09-28-swiss-preview/FIRST_ROUND.md)。原参考来源、截图与研究报告继续保留，作为本轮设计依据。
