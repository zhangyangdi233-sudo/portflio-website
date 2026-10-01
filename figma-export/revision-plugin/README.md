# CIBA · Swiss Revision Import

2026-09-29 已在 Figma Desktop 实际运行，完成48主视图和12首页章节。用户可直接在 [Figma 文件](https://www.figma.com/design/xyINqLy60s9MELHd2HmViK/CIBA-Portfolio-Editable-Website-System?node-id=131-18199) 编辑，无须重新导入。

## 已注册的位置

Figma 分配的插件 ID：`1686577908111522667`。当前客户端注册目录为 `registration/CIBA Swiss Revision Import/`。主程序 `code.js` 与本地资源界面 `ui.html` 随包提供，插件不请求外部网络。

Figma 菜单 **Plugins → Development → CIBA · Swiss Revision Import** 可打开本工具。导入模式包括6个既有日文桌面、全部48主视图、12个首页章节。稳定名称对应的完整画板会跳过；失败画板不会自动删除。原文件00 Cover的7个画板保留。

在另一账号安装时，通过 Figma New plugin 创建自己的真实插件 ID，再用 `prepare-local-manifest.py --figma-manifest /真实路径/manifest.json` 绑定。本包的 ID 属于此次注册，不用于冒充其他账号的开发插件。

## 编辑能力与范围

页面为原生文字、图片填充、框架与共享组件。规则列表使用 Auto Layout，重叠窗口保留网页空间关系。字体为 Noto Sans SC/JP，字号保留源网页值。单行文字按内容定宽，多行文字自动增高。英文手机首页长标题在Figma静态稿中使用原作品名大小写 University / Coursework，分两行并调整字距；字号仍为70.2，原动画字层隐藏保留。

网站的交互、游戏和视频仍在网站执行。视频在 Figma 中使用实际源视频帧，五张封面已内嵌；AE/PR第二段选5秒帧，其余选1秒帧。来源见 `video-posters/provenance.json`。原素材没有更改。

## 维护和验证

源码为 `controller.js`、`finalization.js`、`ui.template.html`、`build-plugin.py` 与 `../sync/dom-to-figma.js`；输入为48个DOM记录及12个章节记录。执行 `python3 build-plugin.py` 构建。原生适配使用异步字体/样式API，组件文字属性只在所属主组件中暴露。

“整理整站与章节、补全视频封面”和“修正文字换行与手机列表间距”是本次已执行的收尾操作，按当前交付节点映射工作。用户开始自行修改后，不应再次运行这些修正按钮，以免重置对应布局属性。

“导出所选范围校对包”只读取当前图层，输出实际Figma PNG、字体、尺寸和图层统计；长边上限4000像素用于检查。最终运行记录及渲染汇总见 [交付说明](../sync/FULL_SITE_HANDOFF.md)。
