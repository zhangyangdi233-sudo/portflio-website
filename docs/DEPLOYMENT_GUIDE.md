# CIBA 作品集上线与持续更新指南

更新：2026-10-02。

## 推荐方案

使用腾讯云中国站的 **EdgeOne Makers**（原 EdgeOne Pages）：

- 当前提供免费版，支持 GitHub 自动构建与发布、免费 SSL 和自定义域名。
- 腾讯云域名注册支持微信支付；官方当前列出的支付方式没有支付宝。
- 本项目是 Astro 静态站，不需要数据库、服务器进程或环境变量。

官方资料：

- [导入 Git 仓库](https://pages.edgeone.ai/zh/document/importing-a-git-repository)
- [构建设置](https://pages.edgeone.ai/zh/document/build-guide)
- [免费版限额](https://pages.edgeone.ai/document/limits-and-quotas)
- [域名与加速区域](https://pages.edgeone.ai/zh/document/domain-overview)
- [添加自定义域名](https://pages.edgeone.ai/zh/document/custom-domain)
- [申请免费证书](https://pages.edgeone.ai/zh/document/apply-for-free-certificate)
- [腾讯云注册域名及微信支付](https://cloud.tencent.com/document/product/242/9595)
- [触发部署](https://cloud.tencent.com/document/product/1552/127395)
- [构建与环境管理](https://cloud.tencent.com/document/product/1552/127392)
- [重新部署](https://cloud.tencent.com/document/product/1552/119338)
- [25 MiB 单文件限制排障](https://edgeone.cloud.tencent.com/pages/document/176994654809202688)

## 第一次发布

1. 登录[腾讯云中国站](https://cloud.tencent.com/)，进入 EdgeOne Makers，首次使用时选择“立即开通”。
2. 选择“创建项目” → “导入 Git 仓库” → GitHub。
3. 只授权并选择仓库 `zhangyangdi233-sudo/portflio-website`。
4. 加速区域按访问对象选择：
   - 想立即上线、主要面向日本或国际访客：选择“全球可用区（不含中国大陆）”，绑定自定义域名时不要求 ICP 备案。
   - 需要中国大陆节点：选择“中国大陆可用区”或“全球可用区”，但自定义域名必须先完成 ICP 备案。
5. 填写构建配置：

   | 设置 | 值 |
   | --- | --- |
   | 生产分支 | `main` |
   | 根目录 | `./` |
   | 框架 | Astro；若自动配置要求服务端适配器，改用 Other / 自定义静态构建 |
   | 安装命令 | `npm install` |
   | 构建命令 | `npm run build` |
   | 输出目录 | `dist` |
   | Node.js | `22.21.1` |
   | 环境变量 | 无 |

6. 选择“开始部署”。构建成功后，非中国大陆网络可先通过项目域名检查网站。
7. 中国大陆网络访问平台项目域名时，官方预览链接只有 3 小时有效；长期公开访问应绑定自定义域名。

## 购买和绑定域名

域名注册本身不是免费的，但 EdgeOne 免费版允许免费绑定自定义域名并提供免费 SSL。

1. 在腾讯云“域名注册”中搜索想要的名称。
2. 创建或选择已经实名认证的信息模板，选择购买年限并提交订单。
3. 在支付页面选择微信支付。官方当前还列出腾讯云余额、QQ 钱包和网银，没有列出支付宝。
4. 回到 EdgeOne Makers 项目 → “域名管理” → “添加自定义域名”。
5. 输入根域名（如 `example.com`）或子域名（如 `www.example.com`），关联到 Production 环境。
6. 按控制台提示完成域名所有权验证，并在 DNSPod 或域名注册商处添加平台给出的 CNAME。
7. 在域名的 HTTPS 配置中选择“申请免费证书” → “自动验证”。CNAME 生效后平台会申请并部署证书；证书 90 天有效，官方说明会在到期前 15 天自动续期。
8. 确认 HTTPS 正常后开启强制 HTTPS（建议使用 301）。

## 更换域名

1. 先在 EdgeOne 添加新域名并关联 Production。
2. 完成新域名的所有权验证、CNAME 和 SSL。
3. 确认新域名能正常打开全部页面后，再停止旧域名解析。

免费版支持多个自定义域名，并允许在项目中修改域名所关联的 Production 或 Preview 环境，因此更换域名不需要改网站源码。

## 以后如何更新网站

1. 在本地或 Codex 中修改项目文字、图片或布局。
2. 运行：

   ```bash
   npm run check:design
   npm run check
   npm test
   npm run build
   npm run check:built
   ```

3. 修改中的版本先推送到独立分支，EdgeOne 会生成 Preview 部署。
4. 检查无误后合并到 `main`。
5. EdgeOne 侦测到 `main` 的新提交后会自动重新构建并更新正式网址，无须重新上传文件。

## 修复后如何重新部署

本项目的生产分支是 `main`。只要生产环境的“自动部署”已开启，新的 GitHub 提交会自动创建一条新的生产部署；不需要重复导入仓库。

1. 等待已修复的提交推送到 GitHub `main`。
2. 打开腾讯云控制台 → EdgeOne → Makers → `portflio-website` →“构建部署”。
3. 找到刚出现的新部署记录，核对：
   - 环境为“生产”；
   - 分支为 `main`；
   - 提交信息和提交哈希对应最新修复。
4. 等待“安装依赖 → 构建 → 检查输出 → 部署”依次完成，最终状态应为“成功”。
5. 点击新记录的“预览”，检查中文、英文、日文首页和大学课题中的两个视频。
6. 生产部署成功后，平台项目域名及已绑定的自定义域名会自动指向新版本。

如果推送后 1–2 分钟仍没有新记录：

1. 进入“项目设置” →“环境管理” →“生产” →“编辑”。
2. 确认生产分支为 `main`，并开启“自动部署”。
3. 保存后再推送一个新提交以触发部署。

不要直接在旧的失败记录上点“重新部署”：旧记录可能继续使用包含超限视频的旧提交。若必须手动重试，应先确认界面显示的是压缩视频后的最新 Git 提交。

EdgeOne 要求每个输出文件严格小于 25 MiB。本项目的 `npm run build` 已包含同一限制的本地检查，后续加入过大的图片、视频或下载文件时会在推送前直接失败并给出文件路径。

## 当前项目的边界

- 页面为静态输出，正式构建目录是 `dist/`。
- Figma 是可编辑设计交付；网站源码和 `src/content/` 才是可运行内容的来源。
- 当前 EdgeOne 免费版限额包括每月 500 次构建、单项目 20,000 个文件、单文件 25 MB、5 GB 总存储、200 个自定义域名和免费 SSL。平台以后可能调整免费额度，应以控制台和官方文档为准。
