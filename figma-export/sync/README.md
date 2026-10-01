# CIBA Figma 同步与交付

2026-09-29：整站导入完成。48 个主视图、12 个首页章节，原七个画板及54个浏览器参考稿保留。

- [Figma 编辑入口](https://www.figma.com/design/xyINqLy60s9MELHd2HmViK/CIBA-Portfolio-Editable-Website-System?node-id=131-18199)
- [完整交付说明](/Users/zhang/Documents/portflio-webside/portflio-website/.worktrees/ciba-clean-restart/figma-export/sync/FULL_SITE_HANDOFF.md)
- [实际验证汇总](/Users/zhang/Documents/portflio-webside/portflio-website/.worktrees/ciba-clean-restart/figma-export/sync/runtime-logs/delivery-verification.json)
- [全部节点与状态](/Users/zhang/Documents/portflio-webside/portflio-website/.worktrees/ciba-clean-restart/figma-export/sync/revision-state.json)
- [48 视图映射](/Users/zhang/Documents/portflio-webside/portflio-website/.worktrees/ciba-clean-restart/figma-export/sync/full-site-handoff-plan.json)
- [本轮交付索引](/Users/zhang/Documents/portflio-webside/portflio-website/.worktrees/ciba-clean-restart/docs/research/DELIVERY_2026-09-28.md)

`dom/` 和 `dom-states/` 保存网页布局依据；`runtime-logs/` 保存原生插件返回记录和实际 Figma 渲染。历史阻塞记录已归档，当前状态见上述汇总。

## 已有本地同步协议

`npm run figma:sync` 启动本地监听；旧 CIBA Portfolio Import 插件的 Export changes to Codex 可写入 `latest.json`、`previous.json` 和 `history/<timestamp>.json`。监听地址为127.0.0.1，载荷上限10MB，并要求本地同步请求头。新版 revision-plugin 的职责是导入与验证，未把旧协议与其混为一项功能。后续网页修改应对照 Figma 实际节点、当前源码和变更记录。
