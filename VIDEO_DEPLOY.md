# 项目视频上线方法

网页里临时点击上传的视频只存在于当前浏览器，不会自动同步到 GitHub 或域名网站。

要让域名网站显示视频，需要把视频文件放进项目源码：

```text
public/assets/videos/
```

建议命名：

```text
project-01.mp4
project-02.mp4
project-03.mp4
```

然后在 `src/main.jsx` 的 `initialProjects` 中给对应项目添加：

```js
videoUrl: "/assets/videos/project-01.mp4",
mediaWidth: 1280,
mediaHeight: 720,
orientation: "wide",
```

竖版示例：

```js
videoUrl: "/assets/videos/project-02.mp4",
mediaWidth: 720,
mediaHeight: 1280,
orientation: "portrait",
```

方版示例：

```js
videoUrl: "/assets/videos/project-03.mp4",
mediaWidth: 1080,
mediaHeight: 1080,
orientation: "square",
```

改完后执行：

```powershell
npm.cmd run build
git add .
git commit -m "Add project videos"
git push
```

Cloudflare Pages 会重新部署，域名网站才会更新。

注意：GitHub 单个文件不要超过 100MB。视频建议压缩为 H.264 MP4。
