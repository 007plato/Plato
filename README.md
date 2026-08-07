# Plato 个人作品集网站

这是一个面向视频设计师、游戏广告设计师和视觉创作者的个人作品集网站。网站以作品展示为核心，支持项目视频播放、视频首帧封面、个人经历、个人优势、联系方式，以及本地编辑和保存项目内容。

线上站点：<https://plato-72i.pages.dev/>

本地开发地址：<http://localhost:5173/>

## 功能概览

- 高端视频设计师作品集式首页和首屏 opening animation
- 个人经历、个人简介、技能、数据和联系方式展示
- 游戏项目视频卡片切换
- 支持横版、竖版和方形视频适配到固定的 `1280 x 720` 项目窗口
- 竖版、方形视频使用上传视频生成的模糊背景填充，主体画面保持完整
- 视频播放按钮位于画面中央，鼠标移出按钮区域后自动隐藏
- 视频首帧自动生成项目卡片封面
- 滚动到模块时使用 GSAP + ScrollTrigger 完成标题、卡片和图片动效
- 桌面端和手机端适配
- 图片懒加载、视频按需加载和移动端动画降级
- 本地编辑模式：可修改网站文字、项目资料、项目视频和封面

## 技术栈

- React 19
- Vite 7
- GSAP 3 + ScrollTrigger
- lucide-react
- 原生 HTML5 Video API
- CSS responsive layout

## 项目结构

```text
.
├─ public/
│  └─ assets/
│     ├─ fonts/              # 网站字体
│     ├─ videos/             # 项目视频
│     ├─ video-posters/      # 项目视频封面
│     ├─ hero.webp           # 首屏压缩图片
│     └─ contact-bottom.webp # 联系区压缩背景图
├─ src/
│  ├─ main.jsx               # 页面组件、项目数据和本地编辑逻辑
│  ├─ styles.css             # 页面样式、响应式布局和动效样式
│  └─ content-overrides.json # 可编辑文字的保存内容
├─ index.html
├─ vite.config.js             # Vite 配置和本地编辑接口
├─ package.json
├─ 启动本地编辑器.cmd
├─ 启动本地编辑器.ps1
├─ DEPLOY.md                  # 部署与域名说明
└─ VIDEO_DEPLOY.md            # 视频上传和发布说明
```

## 本地启动

先安装 Node.js，建议使用 Node.js 20 或更高版本。

```powershell
npm install
npm run dev
```

启动后打开：

```text
http://localhost:5173/
```

也可以直接双击 `启动本地编辑器.cmd`，它会自动启动 Vite 并打开：

```text
http://localhost:5173/?edit=1
```

## 本地编辑网站内容

编辑模式地址：

```text
http://localhost:5173/?edit=1
```

在编辑模式下可以：

1. 直接点击并修改页面文字。
2. 在游戏项目区域上传或替换视频。
3. 系统自动读取视频首帧并生成封面。
4. 点击“保存到本地”。

保存后，文件会写入：

- 视频：`public/assets/videos/`
- 首帧封面：`public/assets/video-posters/`
- 项目资料：`src/main.jsx`
- 网站文字：`src/content-overrides.json`

注意：本地编辑接口由 `vite.config.js` 提供，只在本地开发服务器中工作。它不会直接把文件上传到 GitHub。

## 更新线上网站

本地编辑保存完成后，需要提交并推送 GitHub：

```powershell
npm run build
git add .
git commit -m "Update portfolio content"
git push
```

如果使用 GitHub Desktop：

1. 打开 GitHub Desktop，并添加或打开当前项目目录。
2. 检查变更文件和视频是否出现在 Changes 列表。
3. 填写提交说明并点击 `Commit to main`。
4. 点击 `Push origin`。
5. 等待 Cloudflare Pages 自动构建完成。

Cloudflare Pages 配置：

| 配置项 | 内容 |
| --- | --- |
| Framework preset | `Vite` |
| Build command | `npm run build` |
| Output directory | `dist` |
| Node.js | 20 或更高版本 |

构建成功后，Cloudflare 会把 `dist/` 发布到线上域名。线上访问者默认不会看到编辑按钮；编辑模式仅适合本地使用，不应当把 `?edit=1` 当作真正的权限系统。

## 添加或替换项目视频

推荐使用 H.264 编码的 MP4 视频，并控制文件体积。单个 GitHub 文件不要超过 `100 MB`。

项目数据位于 `src/main.jsx` 的 `initialProjects` 数组中：

```js
{
  title: "项目名称",
  type: "项目类型",
  poster: "/assets/video-posters/project-16.jpg",
  videoUrl: "/assets/videos/project-16.mp4",
  mediaWidth: 1280,
  mediaHeight: 720,
  orientation: "wide",
  tag: "MOTION / AD",
  desc: "项目说明",
}
```

支持的方向值：

| 视频比例 | `orientation` | 示例尺寸 |
| --- | --- | --- |
| 横版 | `wide` | `1280 x 720` |
| 竖版 | `portrait` | `720 x 1280` |
| 方形 | `square` | `1080 x 1080` |

项目展示窗口固定为 `1280 x 720`。竖版和方形视频不会被拉伸或平铺，主体画面会按比例缩放，并使用同一视频的模糊画面作为背景填充。

## 图片和视频性能策略

- 首屏图片使用 WebP 压缩版本，减少首屏下载体积。
- 首屏以外的图片使用 `loading="lazy"` 和 `decoding="async"`。
- 项目视频使用 `preload="none"`，切换到项目并点击播放后再加载。
- 卡片封面优先使用静态首帧，避免页面初始阶段请求全部视频。
- 移动端关闭高成本模糊动画，降低 GPU 和内存占用。
- 移除长期占用的 `will-change`，避免大量卡片持续占用 GPU 图层。
- GSAP 动画集中在模块进入视口和项目切换时执行。

## 构建与预览

本地构建生产文件：

```powershell
npm run build
```

构建输出目录为 `dist/`。本地预览生产版本：

```powershell
npm run preview
```

如果部署平台提示 `dist` 不存在，请确认使用的是 `npm run build`。不要使用 `npx vitepress build`，因为本项目不是 VitePress 文档项目。

## 常见问题

### 本地上传的视频为什么线上没有更新？

本地上传只会先保存到当前项目目录。必须执行 `git add`、`git commit`、`git push`，然后等待 Cloudflare Pages 完成重新部署，线上域名才会更新。

### 为什么线上没有上传按钮？

普通访问地址不带 `?edit=1`，不会显示编辑控件。线上编辑模式并不是安全后台；如果需要真正的多人后台和权限管理，需要额外接入认证、数据库和对象存储服务。

### 视频一直加载或不能播放怎么办？

1. 检查视频是否为 H.264 MP4。
2. 检查文件是否超过 GitHub 的 `100 MB` 限制。
3. 检查 `videoUrl` 是否与 `public/assets/videos/` 中的实际文件名完全一致。
4. 确认 GitHub 和 Cloudflare 已完成最新一次部署。
5. 手机上通常需要用户手动点击播放，不能依赖自动播放。

## 维护建议

- 新增视频时同时确认视频尺寸、封面和项目数据。
- 不要删除仍被 `src/main.jsx` 引用的旧图片或视频。
- 大视频先压缩，再提交到 GitHub。
- 每次发布前运行 `npm run build`。
- 修改文字后检查普通访问地址和 `?edit=1` 编辑地址。

