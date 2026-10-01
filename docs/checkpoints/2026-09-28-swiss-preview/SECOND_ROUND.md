# CIBA：第二轮外观与三语字体更新

日期：2026-09-28。状态：**按用户“再平面、安静一些”的反馈继续调整；网页预览已更新，Figma 全站交付仍在制作中。**

本记录接续 [第一轮记录](/Users/zhang/Documents/portflio-webside/portflio-website/.worktrees/ciba-clean-restart/docs/checkpoints/2026-09-28-swiss-preview/FIRST_ROUND.md)，以正确工作区当前源码差异和主任务已报告的验证结果为依据。

## 本轮用户要求

- 进一步降低框线、倾斜与界面外壳的存在感，让页面更平面、安静。
- 保留全部原有交互，特别是**照片拖拽与悬停恢复彩色**。
- 寻找可商用、可跨平台部署、适合中英日统一使用的无衬线字体。
- 原有字号保持不变；在新的明确要求下更新字体家族。
- 使用新的艺术家陈述，并将 EMIDA 状态更新为已完成。

## 当前外观变化

对照 [ciba-v3.css](/Users/zhang/Documents/portflio-webside/portflio-website/.worktrees/ciba-clean-restart/src/styles/ciba-v3.css) 和 [coursework-desktop.css](/Users/zhang/Documents/portflio-webside/portflio-website/.worktrees/ciba-clean-restart/src/styles/coursework-desktop.css)：

- 底面从第一轮混入暖纸色 4% / 7%，继续收为 **3% / 4%**，缩小底面之间的明暗差。
- 普通暖纸色分隔线透明度由 42% 降为 **26%**；课程媒体窗口边线为 **22%**。淡线继续用于必要的信息分组。
- 首页照片与 Works 窗口取消装饰性 `rotate()`；拖动使用的 `translate3d()` 继续保留。
- Works 画布外框改为透明；窗口标题栏与正文使用更接近的底面，控制区竖向隔线进一步淡化。
- 活动窗口边缘使用降低强度的酸绿：Works 为 60% 透明度，课程窗口为 58% 混合比例。现有选中、聚焦、悬停提示继续保留。
- 主要文字链接以底线和局部酸绿表达状态；课程分区以顶部、底部细线组织内容，减少完整包围框。
- 第一轮移除的背景装饰网格与偏移硬阴影继续保持。

现有照片悬停/聚焦从灰度恢复彩色的 CSS 规则仍在，拖动位移仍使用原有状态变量。首页照片的浏览器实测结果见下表。

### 字体更新后的排版修正

- Wake Up 在手机上因原先整行不换行而出现裁切。现在中英日均按空格拆为 `Wake` / `Up` 两个词，保留原字号；窄屏顶部留白改为 `4.5rem`，避开返回按钮。
- 中文、日文普通项目标题的行高由 `0.82` 调为 `1`，字号保持不变，让 APHASIA 双语两行标题有足够行间空间。
- `ProjectImage` 仅在开发环境统一提前加载图像，方便 Figma 采集；发布版本继续按原 `eager` 属性选择提前或延迟加载。

## 中英日字体决定

采用 **Noto Sans SC / JP** 同一设计体系：

| 语言 | 网页字体家族 | Figma 对应家族 |
| --- | --- | --- |
| 中文、英文 | Noto Sans SC Variable | Noto Sans SC |
| 日文 | Noto Sans JP Variable | Noto Sans JP |

网页通过 Fontsource 自托管可变 WOFF2，按 `unicode-range` 加载所需分片。正文、标题和原先使用等宽字体的界面文字统一进入这套无衬线字体体系；原字号与字重数值保留。

Fontsource 包与上游均有 OFL 授权依据，协作任务已核对许可证交付。对应许可文件纳入构建产物检查。Figma 的 SC / JP 字体已确认可加载；家族名称中的 `Variable` 是网页包的命名差异。

完整官方来源、许可和体积说明见 [字体建议](/Users/zhang/Documents/portflio-webside/portflio-website/.worktrees/ciba-clean-restart/docs/research/font-recommendation.md)。第一轮“字体家族不变”是当时的执行范围，本轮按用户后续明确要求更新。

## 已完成的内容更新

- **艺术家陈述**已同步中英日：当前以游戏为中心创作媒体艺术，未来希望探索多种媒介结合的实验性作品；目前在大学学习，关注媒体艺术中的音乐、影像、动画与游戏。
- **EMIDA** 的主状态、三语状态、摘要和对应正文已更新为完成状态；履历也去掉“开发中”及表示仍在持续的年份尾线。三语状态分别为“已完成”、`Completed`、`完成済み`。
- **APHASIA** 继续使用已确认名称：中文 `APHASIA / 失语症`、英文 `APHASIA`、日文 `APHASIA / 失語症`。旧 slug `x-wheel` 与资源路径保留。

内容依据：[profile.json](/Users/zhang/Documents/portflio-webside/portflio-website/.worktrees/ciba-clean-restart/src/content/site/profile.json)、[emida.json](/Users/zhang/Documents/portflio-webside/portflio-website/.worktrees/ciba-clean-restart/src/content/projects/emida.json)。

## 本轮网页验证记录

以下由主任务实际执行并报告；许可证与设计同步检查由相应协作任务核对：

| 检查 | 已记录结果 |
| --- | --- |
| `npm run check` | 56 个文件，0 errors / warnings / hints（含本地 Figma 交付文件） |
| `npm test` | 12 个测试文件、46 项测试通过 |
| `npm run build` | 通过，25 个路由 |
| `npm run check:built` | 通过，包含 Noto SC / JP 许可产物检查 |
| `npm run check:design` | 通过 |
| Works 筛选 | 重点 2、档案 3、全部 5 |
| Works 键盘移动 | 向右移动 16px；Home 返回初始位置 |
| Works 收起与恢复 | 收起后 4/5 可见；恢复栏还原后 5/5 可见 |
| Works 顺序模式 | 已完成浏览器操作验证 |
| Works 拖动与复位 | 记录位移 `(87, 70)`；复位后为 `(0, 0)` |
| 首页照片拖拽与彩色悬停 | 中文首页 1440 × 900，首章第三张照片由 `(1130, 325)` 拖至 `(1190, 365)`，计算位移为 `(60, 40)`；悬停时 `grayscale(0) contrast(1)`、透明度 `0.88`，其他照片保持 `grayscale(1)`、透明度 `0.1` |
| 首页照片复位 | Home 键后全部照片位移归零 |

### DOM 与手机记录的范围

已采集 **48 份 DOM 快照**。其中 **24 个手机视图的 document 宽度记录为 390px**。已核对页面的 Noto 字体状态为 `loaded`。

日文 Wake Up 手机视图的字体加载过渡已解决：主任务实际浏览器核对 `document.fonts.status` 为 `loaded`，900 字重标题与 400 字重日文正文的 `fonts.check()` 均为 `true`，没有 error / warn 日志。

重新采集的 **24 份项目详情快照**中，图像布局框没有零高度。这里的布局记录不等同于逐张图像的解码或完整页面视觉检查。

Wake Up 的验证已从旧源码条件断言改为检查三语构建产物：标题必须包含 `Wake`、`Up` 两个词级元素。此修正后的 46 项测试、25 路由构建与 `check:built` 均已通过。

## 第二轮截图

- [About／中文／Noto 字体](/Users/zhang/Documents/portflio-webside/portflio-website/.worktrees/ciba-clean-restart/docs/checkpoints/2026-09-28-swiss-preview/about-zh-noto.png)
- [APHASIA／手机／Noto 字体](/Users/zhang/Documents/portflio-webside/portflio-website/.worktrees/ciba-clean-restart/docs/checkpoints/2026-09-28-swiss-preview/aphasia-mobile-noto.png)
- [Works／中文桌面／第二轮](/Users/zhang/Documents/portflio-webside/portflio-website/.worktrees/ciba-clean-restart/docs/checkpoints/2026-09-28-swiss-preview/works-desktop-zh-round2.png)
- [首页照片交互／中文桌面／第二轮](/Users/zhang/Documents/portflio-webside/portflio-website/.worktrees/ciba-clean-restart/docs/checkpoints/2026-09-28-swiss-preview/home-interaction-zh-round2.png)

## 继续处理

继续完成 Figma 的全站可编辑页面、字体和状态交付，包括桌面首页滚动后出现的其余章节。**Figma 仍在制作中，尚未记录为全站完成。**
