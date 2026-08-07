@echo off
chcp 65001 >nul
cd /d "%~dp0"
title 个人网站本地编辑器

echo 正在启动个人网站本地编辑器...
echo.
echo 打开地址: http://localhost:5173/?edit=1
echo 关闭这个窗口即可停止本地服务。
echo.

start "" "http://localhost:5173/?edit=1"
npm.cmd run dev -- --host 0.0.0.0 --port 5173

pause
