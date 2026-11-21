# 北辰星 · GitHub Pages 版

本项目保留当前确认版的页面、星空动效、12 位北辰星资料、搜索筛选和预约表单。全站优先使用微软雅黑；未安装该字体的设备会使用系统中文字体。

## 最简单的上传方式（使用“直接上传版”压缩包）

1. 在 GitHub 新建一个公开仓库，例如 `beichen-star`。
2. 解压 `beichen-star-upload.zip`，把**解压后的所有文件**上传到仓库根目录。不要只上传 ZIP，也不要多套一层文件夹。根目录应直接看到 `index.html`、`assets`、`images` 和 `.nojekyll`。
3. 打开仓库 **Settings → Pages**，将 Source 设为 **Deploy from a branch**。
4. Branch 选择 **main**，文件夹选择 **/(root)**，点击 Save。
5. 等 GitHub 部署完成，Pages 页面会显示公开链接。普通项目的地址形如 `https://你的用户名.github.io/beichen-star/`。

如果仓库名为 `你的用户名.github.io`，地址则是 `https://你的用户名.github.io/`。两种路径都已经适配，无需改图片地址。GitHub 默认公开站点的仓库可公开访问，因此不要上传预约记录、学生联系方式或任何密码。

## 以后方便修改（使用“源码及自动发布版”）

1. 解压 `beichen-star-source.zip`，把所有内容放到仓库根目录，**包含 `.github/workflows/deploy-pages.yml`**。
2. 在 **Settings → Pages → Source** 选择 **GitHub Actions**。
3. 将源码推送到 `main` 分支后自动构建发布；也可以在 Actions 中手动运行 **Deploy Beichen Star to GitHub Pages**。
4. 以后修改源码并提交到 `main`，网站会自动更新。

直接上传静态文件和源码自动发布是两种任选其一的方式，不要把两包混在一起上传。若使用网页上传，请确认 `.github` 和 `.nojekyll` 没有因隐藏文件设置而漏掉。

## 预约与管理端

GitHub Pages 只托管静态网页。本版的预约表单会把申请提交到现有服务，继续进入同一个管理端与数据表。

- 预约服务：`https://beichen-star-mentors.thu-tme.chatgpt.site/api/reservations`
- 管理端：<https://beichen-star-mentors.thu-tme.chatgpt.site/admin>
- 管理端继续使用原有管理员登录和权限检查，支持查看、协调、备注、筛选与导出。
- **现有服务必须继续运行。此包不包含数据库、预约记录和管理员凭据，也不代表后台已迁移到 GitHub。**
- 后台已允许 HTTPS 的 `*.github.io` 页面跨域提交预约；没有开放预约列表、导出和管理接口的跨域读取权限。
- 如以后绑定自己的域名，需要同时在后台增加该域名的跨域授权。不能仅修改前端地址。

公开服务地址集中在 `src/config.ts`。更换后端时，需重新构建。不要在前端填写管理员密码或密钥。

## 本地预览与修改

安装 Node.js 22.13 或更高版本，在本目录运行：

```sh
npm ci
npm run dev
```

发布前检查：

```sh
npm run build
npm run check
npm run preview
```

构建结果位于 `dist/`，可按上述“最简单的上传方式”上传其内容。请通过本地预览地址查看；不要双击 `index.html` 以 `file://` 打开。

## 文件位置

- `src/App.tsx`：页面和预约表单
- `src/mentors.ts`：人物资料及照片对应关系
- `src/styles.css`：视觉样式和动效
- `public/images/`：图片
- `src/config.ts`：现有预约服务和管理端地址
- `.github/workflows/deploy-pages.yml`：GitHub 自动发布流程

GitHub 官方说明：<https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site>
