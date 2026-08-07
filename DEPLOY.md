# 部署与绑定域名

这是一个 Vite + React 静态网站。`http://localhost:5173/` 只是本机开发地址，真正让别人访问需要先部署到公网托管平台，再绑定你购买的域名。

## 推荐方式：Cloudflare Pages / Vercel

部署时填写：

- Framework preset: `Vite`
- Build command: `npm run build`
- Output directory: `dist`

本地打包命令：

```powershell
npm.cmd run build
```

打包成功后，生产文件会生成到：

```text
dist/
```

## 绑定自己的域名

1. 先购买域名，例如 `example.com`。
2. 在托管平台添加 Custom Domain。
3. 根据平台提示，到域名 DNS 管理后台添加记录。
4. 常见记录如下：

```text
www    CNAME    平台给你的目标地址
@      CNAME/A  按平台提示填写
```

5. 等待 DNS 生效后，平台会自动签发 HTTPS 证书。

## 只在本机使用假域名

如果只是想让自己的电脑用类似 `http://mingtu.local:5173/` 访问，可以用管理员权限编辑 Windows hosts 文件，添加：

```text
127.0.0.1 mingtu.local
```

然后继续运行开发服务，再访问：

```text
http://mingtu.local:5173/
```

这个地址只能在你的电脑上访问，不是公网域名。
