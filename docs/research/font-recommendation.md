# CIBA 中英日统一无衬线字体

日期：2026-09-28。范围：Source Han Sans 与 Noto Sans CJK 两个同源家族的官方资料比较，以及本项目已安装 Fontsource 包的只读核对。

## 推荐

**采用 Noto Sans 家族：中文和英文使用 Noto Sans SC，日文使用 Noto Sans JP。** 网页通过 Fontsource 自托管 WOFF2，Figma 使用对应的 Noto Sans SC / JP 字体。这样可以统一字族，同时保持中文和日文各自的汉字字形。

本项目 Figma 已由主任务确认可加载 SC、JP 的 Regular、Medium、Bold、Black；推荐基于这个实际可用条件。风格判断：这组克制的无衬线字形适合当前国际主义方向，版面的共同对齐线、留白和层级继续承担主要表达。

## 两个候选的差异

| 项目 | Source Han Sans／思源黑体 | Noto Sans CJK／Noto Sans SC、JP |
| --- | --- | --- |
| 设计关系 | Adobe 品牌的 Pan-CJK 家族 | Google 品牌的对应家族；两者来自 Adobe 与 Google 的共同开发 |
| 三语 | 提供中、日区域版本及拉丁字母 | SC 包含简体中文及 Latin；JP 包含日文假名、汉字及 Latin |
| 授权 | SIL OFL 1.1 | SIL OFL 1.1 |
| 网页格式 | Adobe 官方发布包含可变 OTF/TTF/WOFF2 | Google 字体源 + Fontsource 的可变 WOFF2 分片，便于本项目构建和自托管 |
| 本项目适配 | 可采用，但需要额外统一 Figma 中的实际字体与网页资源 | Figma 已确认可用；已有 SC/JP 包可直接对应网页 |

Adobe 官方确认两个品牌共享设计来源与对应字形；分发版本和打包格式仍需分别固定，不将不同发行包直接视为完全相同的二进制文件。[Adobe 项目说明](https://blog.adobe.com/en/publish/2018/11/19/new-pan-cjk-font-source-han-sans-2-0)、[Adobe 字形关系说明](https://ccjktype.fonts.adobe.com/2017/05/shsans-vs-shserif.html)

Google 的官方字体说明分别列出 SC、JP 的中文／日文与 Latin 支持。Noto 的部署指南还区分完整 CJK 版本和区域子集，并说明语言标记与 `locl` 本地化字形的作用。因此按 `lang` 选择 SC / JP，比全站强制使用一个地区的汉字字形更合适。[SC 官方说明](https://github.com/google/fonts/blob/main/ofl/notosanssc/DESCRIPTION.en_us.html)、[JP 官方说明](https://github.com/google/fonts/blob/main/ofl/notosansjp/DESCRIPTION.en_us.html)、[Noto CJK 部署指南](https://github.com/notofonts/noto-cjk/blob/main/Sans/README.md)

## 商用与跨平台使用

两者的 OFL 允许商用设计、随软件分发和嵌入；网页可通过 `@font-face` 从自己的服务器加载。许可证不要求网站、作品图或应用本身也采用 OFL。分发字体时应保留对应版权与许可证；字体不能单独出售，修改字体时需遵守保留字体名的条件。[Adobe 原始许可](https://github.com/adobe-fonts/source-han-sans/blob/master/LICENSE.txt)、[Google SC 原始许可](https://github.com/google/fonts/blob/main/ofl/notosanssc/OFL.txt)、[OFL 官方 FAQ](https://openfontlicense.org/ofl-faq/)

网页使用随站点发布的 WOFF2，桌面设计使用对应 OTF/TTF，可形成同一家族的跨平台部署。具体平台需支持选定格式；现代浏览器可以使用可变字体，不支持时提供普通无衬线回退。不同系统的栅格化仍可能略有区别。[Fontsource 可变字体说明](https://fontsource.org/docs/getting-started/variable)

注意分发包的许可头部：Google Fonts 的 SC/JP OFL 文件保留 Adobe 版权与 `Source` 保留名；本项目 Fontsource 包的 LICENSE 头部为 Google Inc.，正文同为 OFL 1.1。交付时保留实际使用包附带的 LICENSE 与来源，并保留上游来源信息，不自行删减。

## 网页体积与加载方式

Google 官方仓库中的完整可变 TTF 文件显示：SC 约 **16.9 MB**，JP 约 **9.15 MB**。这些是桌面原始字体文件体积，不等于网页加载量。[SC 原始 TTF](https://github.com/google/fonts/blob/main/ofl/notosanssc/NotoSansSC%5Bwght%5D.ttf)、[JP 原始 TTF](https://github.com/google/fonts/blob/main/ofl/notosansjp/NotoSansJP%5Bwght%5D.ttf)

本项目实际安装的是 `@fontsource-variable/noto-sans-sc`、`@fontsource-variable/noto-sans-jp`，均为 **5.3.0**。以下为 2026-09-28 对包内 `index.css` 引用文件逐一读取文件大小所得：

| 包 | WOFF2 分片数 | CSS 引用的全部字体分片总量 | Latin 单片 |
| --- | --- | --- | --- |
| Noto Sans SC | 101 | 4,516,508 bytes，约 4.52 MB | 25,240 bytes |
| Noto Sans JP | 124 | 5,223,320 bytes，约 5.22 MB | 24,840 bytes |

这不是首屏流量测试。默认 CSS 使用 `unicode-range`，浏览器按页面实际字符选择需要的分片；分片里也可能包含页面未使用的其他字符。可变字重覆盖 `100–900`，不需要每个字重再加载一份完整 CJK 字体。[Fontsource 安装与分片说明](https://fontsource.org/docs/getting-started/install)、[Fontsource 子集说明](https://fontsource.org/docs/getting-started/subsets)

保留默认分片机制，字体资源随本网站发布；不要求访问者依赖操作系统预装字体，也不必在运行时连接 Google Fonts。实际页面下载哪些分片、总传输量多少，仍以之后的网页请求记录为准。

## 网页与 Figma 的对应

| 用途 | 网页 CSS family | Figma family |
| --- | --- | --- |
| 中文、英文 | `Noto Sans SC Variable` | `Noto Sans SC` |
| 日文 | `Noto Sans JP Variable` | `Noto Sans JP` |

`Variable` 是当前 Fontsource 包的 CSS 名称后缀，不能在网页中漏写。Figma 中使用已验证可用的家族名。换字族时维持原字号、字重数值和交互；若原网页使用 750 等中间字重，需要核对 Figma 的可变轴支持或记录对应方式，不能把静态 Bold 自动视为精确的 750。

**最终短结论：Noto Sans SC / JP 最适合本次网页与 Figma 一起交付。三语使用同一设计体系，中文和日文分别采用正确地区字形；可商用，字体可随网站自托管，原有字号和交互继续保留。**
